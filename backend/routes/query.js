const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const db = require('../config/db');

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

router.post('/query', async (req, res) => {
  const { question, columns, sampleRows } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  if (!columns || columns.length === 0) {
    return res.status(400).json({ error: 'No CSV data uploaded. Please upload a CSV file first.' });
  }

  const prompt = `You are a SQL expert helping a non-technical business user analyze data.

Database schema:
Table name: dataset
Columns: ${columns.join(', ')}
Sample data (first 3 rows):
${JSON.stringify(sampleRows?.slice(0, 3), null, 2)}

Rules:
- The table is ALWAYS called 'dataset'
- Return ONLY the SQL query, no explanation, no markdown
- For text columns, use LIKE for filtering (case insensitive)
- Use CAST(column AS REAL) when doing math on numeric-looking columns
- Only use SELECT — never DELETE, DROP, UPDATE, or INSERT

User's question: "${question}"

SQL:`;

  try {
    // Call Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Extract and clean the SQL
    let sql = response.text().trim()
      .replace(/```sql/gi, '')
      .replace(/```/g, '')
      .trim();

    // Safety guard - prevent destructive SQL
    const forbiddenKeywords = /\b(DROP|DELETE|UPDATE|INSERT|ALTER|TRUNCATE)\b/i;
    if (forbiddenKeywords.test(sql)) {
      return res.status(400).json({ error: 'Query not permitted', sql });
    }

    // Execute on SQLite
    const results = db.prepare(sql).all();

    res.json({ 
      sql, 
      results,
      rowCount: results.length
    });

  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to get table info
router.get('/table-info', (req, res) => {
  try {
    const tableInfo = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='dataset'").get();
    
    if (!tableInfo) {
      return res.json({ 
        hasData: false, 
        columns: [], 
        rowCount: 0 
      });
    }

    const columnsInfo = db.prepare("PRAGMA table_info(dataset)").all();
    const columns = columnsInfo.map(col => col.name);
    const countResult = db.prepare("SELECT COUNT(*) as count FROM dataset").get();
    
    res.json({ 
      hasData: true, 
      columns, 
      rowCount: countResult.count 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;