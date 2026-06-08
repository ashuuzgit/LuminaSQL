# LuminaSQL

**Ask your data a question. Get an answer. No SQL required.**

---

## Why this exists

During my internship at InterviewKit.ai, I kept running into the same bottleneck. Someone on the business side needed a quick data cut — *how many users dropped off at step 3 this week, broken down by source?* — and the answer was sitting right there in a database. But getting to it meant writing SQL, or waiting for an analyst who had twelve other things queued up.

The insight that prompted this wasn't technical. It was the realisation that the gap between a business question and its answer isn't a data problem — it's a literacy problem. The data is there. The question is formed. The only thing in between is SQL syntax, and that's a solvable problem.

LuminaSQL is my attempt to solve it.

---

## What it does

Upload a CSV. Type your question in plain English. Get your answer, the SQL that produced it, and a downloadable result — in under 10 seconds.

That's the whole pitch.

The product is deliberately narrow. It doesn't try to be a full BI tool or replace an analyst permanently. It's for the moment when you have a question and you need an answer now, not in two days.

---

## Core features

**Natural language querying**
Type questions the way you'd ask a colleague. *Show me all orders above ₹50,000 in October* becomes a valid SQL query automatically. The AI generates the query; the query runs against your data; you see the result.

**Query transparency**
Every query shows the SQL it generated. This was a deliberate product decision — not just a debug feature. Non-technical users are more willing to trust a result when they can see the logic behind it, even if they can't read SQL fluently. The generated query is shown in a syntax-highlighted panel beneath every result.

**Privacy-first architecture**
This one matters more than it looks. LuminaSQL never sends your actual data to the AI. When a query is run, only the column names and three redacted sample rows are passed to the model — enough context for it to understand the schema and write accurate SQL, but none of your real records. The query then executes locally against your uploaded file. Your data doesn't leave your session.

**CSV download**
Any result set can be exported as a CSV with one click. Filename is timestamped automatically.

**Query and upload history**
Every query is logged with its prompt, generated SQL, result count, and timestamp. Previous uploads are stored so you don't have to re-upload the same file across sessions.

**Responsive across devices**
The full query workflow works on mobile. Built this after noticing that a lot of quick data checks happen away from a desk — in a meeting, on the way to a call. The layout adapts cleanly to narrow screens without losing functionality.

---

## How the privacy layer works

This is worth explaining clearly because it's the feature most people ask about.

When you run a query, LuminaSQL sends the AI model:
- The column names from your CSV
- The data types it inferred for each column
- Three rows of sample data, with any values that look like emails, phone numbers, or IDs replaced with placeholder text

What it does **not** send:
- Your full dataset
- Any actual records beyond the three samples
- File contents in raw form

The SQL query is then generated from that schema context alone and executed client-side against your file. The model never sees row 4 through row 40,000. This approach was chosen specifically because the primary users are business teams working with financial records, customer data, and internal ops data — the kind of data that absolutely cannot go into a third-party API call.

The tradeoff is a small reduction in accuracy on edge cases where the data has unusual formatting that the sample rows don't represent. In practice, this matters less than 10% of the time for the query types the product is designed for.

---

## Tech decisions and why

**Groq over OpenAI**
Speed. Groq's inference on open-weight models runs significantly faster than GPT-4o at a fraction of the cost. For this use case — generating SELECT queries against a known schema — the accuracy gap is negligible. The target user isn't writing twelve-table JOINs; they're asking for filtered lists and aggregations.

**Clerk for authentication**
Shipped in a day instead of a week. Custom JWT flows are interesting engineering but they're not the product. Auth is infrastructure. Clerk handles Google OAuth, session management, and user persistence without me having to think about it.

**CSV-first, not database-first**
The initial scope is CSV files rather than live database connections. This was a deliberate scope decision, not a technical limitation. CSV covers 80% of the actual use cases — people sharing data exports from Salesforce, Shopify, internal dashboards — without requiring users to hand over database credentials. Direct database connections are on the roadmap.

---

## Product decisions I'd revisit

**No chart output in v1**
Charts scored medium on the RICE prioritisation and got cut. In retrospect, a simple bar chart auto-rendered for the right result shapes would have made the product feel significantly more complete. It's the one feature users consistently ask about that isn't there.

**The column selector UI**
The optional column filtering before running a query is useful for large datasets but the UI is clunky. It works; it doesn't feel good. Needs a redesign pass.

**History is append-only**
Currently there's no way to pin, tag, or organise past queries. Fine for a solo user running occasional queries, less fine for a team using it regularly. Folders or saved query collections would make repeat workflows much smoother.

---

## What's next

- Direct PostgreSQL and MySQL connection (schema introspection replaces the CSV upload step)
- Team workspaces with shared query history
- Auto-chart rendering for common result shapes
- API access for embedding into internal dashboards and tools

---

## Running locally

```bash
# Clone the repo
git clone https://github.com/yourusername/lumina-sql
cd lumina-sql

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in: GROQ_API_KEY, CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY

#Run the backend server 
node server.js | node start
# Run the development server
npm run dev
```

Open `http://localhost:3000`. Upload a CSV. Ask something.

---

## Environment variables

```
GROQ_API_KEY=                    # Groq API key for LLM inference
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=  # Clerk publishable key
CLERK_SECRET_KEY=                # Clerk secret key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | Clerk |
| AI / LLM | Groq API (LLaMA 3 70B) |
| CSV parsing | PapaParse |
| Deployment | Vercel |

---

## Live

[lumina-sql.vercel.app](https://lumina-sql.vercel.app)

---

Built by **Ashutosh Thakur**
