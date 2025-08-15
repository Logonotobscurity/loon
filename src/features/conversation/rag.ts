// Simple local adaptive RAG utility using localStorage.
// This is a lightweight scaffold: it stores text snippets and retrieves top-k matches
// based on a cosine similarity over term-frequency vectors.

export type RAGDocument = { id: string; text: string };

const KB_KEY = 'bi_gpt_rag_kb_v1';
const INTERACTIONS_KEY = 'bi_gpt_rag_interactions_v1';

function loadDocs(): RAGDocument[] {
  try {
    const raw = localStorage.getItem(KB_KEY);
    return raw ? (JSON.parse(raw) as RAGDocument[]) : [];
  } catch {
    return [];
  }
}

function saveDocs(docs: RAGDocument[]) {
  try {
    localStorage.setItem(KB_KEY, JSON.stringify(docs));
  } catch {}
}

// Basic tokenizer
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function termFreq(tokens: string[]): Record<string, number> {
  const tf: Record<string, number> = {};
  for (const t of tokens) tf[t] = (tf[t] || 0) + 1;
  return tf;
}

function cosineSim(a: Record<string, number>, b: Record<string, number>): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (const k in a) {
    normA += a[k] * a[k];
    if (b[k]) dot += a[k] * b[k];
  }
  for (const k in b) normB += b[k] * b[k];
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function upsertDocuments(docs: RAGDocument[]) {
  const existing = loadDocs();
  const map = new Map<string, RAGDocument>(existing.map((d) => [d.id, d]));
  for (const d of docs) map.set(d.id, d);
  saveDocs(Array.from(map.values()).slice(-500)); // cap to last 500 docs
}

export function retrieveContext(query: string, k = 3): string[] {
  const docs = loadDocs();
  if (!query.trim() || docs.length === 0) return [];
  const qtf = termFreq(tokenize(query));
  const scored = docs.map((d) => ({
    id: d.id,
    score: cosineSim(qtf, termFreq(tokenize(d.text))),
    text: d.text,
  }));
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .filter((s) => s.score > 0)
    .map((s) => s.text);
}

export function recordInteraction(utterance: string) {
  try {
    const now = Date.now();
    const raw = localStorage.getItem(INTERACTIONS_KEY);
    const list = raw ? (JSON.parse(raw) as { t: number; u: string }[]) : [];
    list.push({ t: now, u: utterance.slice(0, 2000) });
    localStorage.setItem(INTERACTIONS_KEY, JSON.stringify(list.slice(-200)));
  } catch {}
}

