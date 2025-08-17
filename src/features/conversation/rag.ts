// RAG utility exports - re-export from service layer

// Re-export types and functions from the service layer
export type { RAGDocument } from '../../types';
export { ragService } from '../../services/rag/RagService';

/**
 * @deprecated Import directly from the service layer:
 * - import { ragService } from '../../services/rag/RagService'
 * - import type { RAGDocument } from '../../types'
 */
export const {
  upsertDocuments,
  retrieveContext,
  recordInteraction,
} = {
  upsertDocuments: (docs: any[]) => ragService.upsertDocuments(docs),
  retrieveContext: (query: string, k = 3) => ragService.retrieveContext(query, k),
  recordInteraction: (utterance: string) => ragService.recordInteraction(utterance),
};

