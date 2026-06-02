const express = require('express');
const Groq = require('groq-sdk');
const { getDb } = require('../config/db.js');

const router = express.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

  let sql = '';

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
    });

    sql = completion.choices[0].message.content.trim()
  .replace(/```sql/gi, '')
  .replace(/```/g, '')
  .replace(/`([^`]*)`/g, '"$1"')   // backtick-wrapped → double quoted
  .replace(/;$/, '')
  .trim();

// Wrap any unquoted multi-word column names that exist in the dataset
for (const col of columns) {
  if (col.includes(' ')) {
    // replace unquoted occurrences of the column name
    const escaped = col.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?<!["\`])\\b${escaped}\\b(?!["\`])`, 'g');
    sql = sql.replace(regex, `"${col}"`);
  }
}
    const forbiddenKeywords = /^\s*(DROP|DELETE|UPDATE|INSERT|ALTER|TRUNCATE)\b/i;
    if (forbiddenKeywords.test(sql)) {
      return res.status(400).json({ error: 'Query not permitted', sql });
    }

    const db = await getDb();

    // sql.js returns results differently — convert to array of objects
    const stmt = db.prepare(sql);
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();

    res.json({ sql, results, rowCount: results.length });

  } catch (err) {
    console.error('=== QUERY ERROR ===');
    console.error('SQL attempted:', sql);
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message, sql });
  }
});

// Endpoint to get table info
router.get('/table-info', async (req, res) => {
  try {
    const db = await getDb();

    const tableCheck = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='dataset'");
    if (!tableCheck.length || !tableCheck[0].values.length) {
      return res.json({ hasData: false, columns: [], rowCount: 0 });
    }

    const colResult = db.exec("PRAGMA table_info(dataset)");
    const columns = colResult[0].values.map(row => row[1]);

    const countResult = db.exec("SELECT COUNT(*) FROM dataset");
    const rowCount = countResult[0].values[0][0];

    res.json({ hasData: true, columns, rowCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;