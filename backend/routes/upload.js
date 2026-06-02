const express = require('express');
const multer = require('multer');
const { parse } = require('csv-parse/sync');
const fs = require('fs');
const path = require('path');
const { getDb } = require('../config/db.js');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' ||
        file.mimetype === 'application/vnd.ms-excel' ||
        file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  }
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileContent = fs.readFileSync(req.file.path, 'utf8');

    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true
    });

    if (records.length === 0) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Empty CSV file' });
    }

    const columns = Object.keys(records[0]);
    const db = await getDb();

    // Drop old table and create fresh
    db.run(`DROP TABLE IF EXISTS dataset`);

    const colDefs = columns.map(c => `"${c}" TEXT`).join(', ');
    db.run(`CREATE TABLE dataset (${colDefs})`);

    // Insert all rows
    const placeholders = columns.map(() => '?').join(', ');
    const colNames = columns.map(c => `"${c}"`).join(', ');
    const stmt = db.prepare(`INSERT INTO dataset (${colNames}) VALUES (${placeholders})`);

    for (const row of records) {
      stmt.run(Object.values(row));
    }
    stmt.free();

    fs.unlinkSync(req.file.path);

    // Redact sensitive columns in preview
    const SENSITIVE_PATTERNS = /email|phone|ssn|salary|password|national|dob|birth/i;
    const safePreview = records.slice(0, 3).map(row => {
      const safeRow = {};
      for (const col of columns) {
        safeRow[col] = SENSITIVE_PATTERNS.test(col) ? '** redacted **' : row[col];
      }
      return safeRow;
    });

    res.json({
      message: 'CSV loaded successfully',
      columns,
      rowCount: records.length,
      preview: safePreview
    });

  } catch (err) {
    if (req.file?.path) {
      try { fs.unlinkSync(req.file.path); } catch {}
    }
    res.status(500).json({ error: err.message });
  }
});

// Error handling for multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB' });
    }
    return res.status(400).json({ error: err.message });
  }
  if (err) return res.status(400).json({ error: err.message });
  next();
});

module.exports = router;