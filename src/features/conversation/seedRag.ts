// Seeds the local RAG KB with marketplace agent info and a couple of SOP snippets.
// Safe to call on app load; it only appends new docs and caps total size.

import { upsertDocuments, RAGDocument } from './rag';
import { marketplaceProducts } from '../marketplace/data/marketplaceData';

function productToDoc(p: { id: string; name: string; description: string; category: string; tags: string[]; industry?: string }) {
  const body = [
    `Name: ${p.name}`,
    `Category: ${p.category}${p.industry ? ` (${p.industry})` : ''}`,
    `Description: ${p.description}`,
    `Tags: ${p.tags.join(', ')}`,
  ].join('\n');
  const text = `LOG_ON Agent\n${body}`;
  const id = `mp_${p.id}`;
  return { id, text } as RAGDocument;
}

const SOP_SNIPPETS: RAGDocument[] = [
  {
    id: 'sop_report_automation',
    text: `SOP: Monthly Report Automation\nProcess: ETL e Transform e Schedule e Deliver\nTools: Airflow (free) or LOG_ON ReportBot Agent\nSteps: 1) Define data sources, 2) Build extract jobs, 3) Schedule DAG, 4) Publish dashboard, 5) Send alerts.`
  },
  {
    id: 'sop_invoice_processing',
    text: `SOP: Invoice Processing\nProcess: Capture e Validate e Post e Reconcile\nTools: OpenRefine (free) or LOG_ON SAP Integration Connector\nChecks: Duplicate detection, Vendor match, Tax/GL coding.`
  }
];

export function seedRagKnowledgeBase() {
  try {
    const docs: RAGDocument[] = [...SOP_SNIPPETS, ...marketplaceProducts.slice(0, 40).map(productToDoc)];
    upsertDocuments(docs);
  } catch (e) {
    console.warn('RAG seeding failed:', e);
  }
}

