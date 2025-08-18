import { RAGDocument } from '../../types';
import { RAGRepository } from '../../repositories/RAGRepository';

export interface RAGSearchResult {
  text: string;
  score: number;
}

export interface VectorCalculationResult {
  tokens: string[];
  termFrequency: Record<string, number>;
}

export class RagService {
  private repository: RAGRepository;
  private interactionThrottleTimer: NodeJS.Timeout | null = null;
  private lastInteractionTime = 0;
  private readonly INTERACTION_THROTTLE_DELAY = 5000; // 5 seconds

  constructor(repository: RAGRepository = new RAGRepository()) {
    this.repository = repository;
  }

  // Pure algorithmic functions - no storage concerns
  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean);
  }

  private calculateTermFrequency(tokens: string[]): Record<string, number> {
    const tf: Record<string, number> = {};
    for (const token of tokens) {
      tf[token] = (tf[token] || 0) + 1;
    }
    return tf;
  }

  private calculateCosineSimilarity(
    vecA: Record<string, number>,
    vecB: Record<string, number>
  ): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    // Calculate dot product and norms
    for (const key in vecA) {
      normA += vecA[key] * vecA[key];
      if (vecB[key]) {
        dotProduct += vecA[key] * vecB[key];
      }
    }

    for (const key in vecB) {
      normB += vecB[key] * vecB[key];
    }

    if (normA === 0 || normB === 0) return 0;

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  // Public API methods
  async upsertDocuments(documents: RAGDocument[]): Promise<void> {
    await this.repository.upsertDocuments(documents);
  }

  async addDocument(document: RAGDocument): Promise<void> {
    await this.repository.addDocument(document);
  }

  async removeDocument(documentId: string): Promise<void> {
    await this.repository.removeDocument(documentId);
  }

  async retrieveContext(query: string, k: number = 3): Promise<string[]> {
    if (!query.trim()) return [];

    const documents = await this.repository.getDocuments();
    if (documents.length === 0) return [];

    const queryTokens = this.tokenize(query);
    const queryTF = this.calculateTermFrequency(queryTokens);

    const scored = documents.map((doc) => {
      const docTokens = this.tokenize(doc.text);
      const docTF = this.calculateTermFrequency(docTokens);
      const score = this.calculateCosineSimilarity(queryTF, docTF);

      return {
        text: doc.text,
        score,
      };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .filter((item) => item.score > 0)
      .map((item) => item.text);
  }

  async searchDocuments(query: string, k: number = 3): Promise<RAGSearchResult[]> {
    if (!query.trim()) return [];

    const documents = await this.repository.getDocuments();
    if (documents.length === 0) return [];

    const queryTokens = this.tokenize(query);
    const queryTF = this.calculateTermFrequency(queryTokens);

    const scored = documents.map((doc) => {
      const docTokens = this.tokenize(doc.text);
      const docTF = this.calculateTermFrequency(docTokens);
      const score = this.calculateCosineSimilarity(queryTF, docTF);

      return {
        text: doc.text,
        score,
      };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .filter((item) => item.score > 0);
  }

  async recordInteraction(utterance: string): Promise<void> {
    await this.repository.recordInteraction(utterance);
  }

  async getDocuments(): Promise<RAGDocument[]> {
    return this.repository.getDocuments();
  }

  async getDocumentCount(): Promise<number> {
    return this.repository.getDocumentCount();
  }

  async getInteractionCount(): Promise<number> {
    return this.repository.getInteractionCount();
  }

  async clearKnowledgeBase(): Promise<void> {
    await this.repository.clearKnowledgeBase();
  }

  async clearInteractions(): Promise<void> {
    await this.repository.clearInteractions();
  }

  // Utility methods for vector calculations
  calculateVector(text: string): VectorCalculationResult {
    const tokens = this.tokenize(text);
    const termFrequency = this.calculateTermFrequency(tokens);
    
    return {
      tokens,
      termFrequency,
    };
  }

  compareTexts(textA: string, textB: string): number {
    const vecA = this.calculateVector(textA);
    const vecB = this.calculateVector(textB);
    
    return this.calculateCosineSimilarity(vecA.termFrequency, vecB.termFrequency);
  }
}