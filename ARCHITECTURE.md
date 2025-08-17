# Application Architecture Documentation

## Overview
This document describes the refactored architecture implemented to address the architectural issues identified during the audit.

## New Architecture Components

### 1. Service Layer (`src/services/`)

#### Environment Configuration (`src/services/config/environment.ts`)
- **Purpose**: Centralized environment variable management with validation
- **Features**: Runtime validation, type-safe configuration, default values
- **Usage**: `const env = new EnvironmentService();`

#### Storage Repository Pattern (`src/services/storage/BaseStorageRepository.ts`)
- **Purpose**: Generic storage abstraction with localStorage implementation
- **Features**: JSON serialization, error handling, prefix-based isolation
- **Usage**: `const repo = new BaseStorageRepository('prefix');`

#### API Service (`src/services/api/GeminiApiService.ts`)
- **Purpose**: Encapsulated Gemini API integration
- **Features**: Environment configuration, error handling, retry logic
- **Usage**: `const response = await geminiApiService.sendMessage(text, image);`

#### RAG Service (`src/services/rag/RagService.ts`)
- **Purpose**: Vector-based retrieval with storage abstraction
- **Features**: TF-IDF similarity, document management, interaction recording
- **Usage**: `const context = await ragService.retrieveContext(query);`

### 2. Repository Layer (`src/repositories/`)

#### ConversationRepository (`src/repositories/ConversationRepository.ts`)
- **Purpose**: Conversation message persistence
- **Features**: CRUD operations, localStorage integration

#### RAGRepository (`src/repositories/RAGRepository.ts`)
- **Purpose**: RAG document and interaction persistence
- **Features**: Document lifecycle management, interaction history

### 3. State Management (`src/store/`)

#### Conversation Store (`src/store/conversationStore.ts`)
- **Purpose**: Centralized conversation state management
- **Features**: Zustand integration, async operations, loading states
- **Usage**: `const { messages, sendUserMessage } = useConversationStore();`

#### Marketplace Store (`src/store/marketplaceStore.ts`)
- **Purpose**: Centralized marketplace state management
- **Features**: Filter management, product state, loading states
- **Usage**: `const { filters, updateFilter } = useMarketplaceStore();`

### 4. Type Definitions (`src/types/index.ts`)
- **Purpose**: Comprehensive TypeScript interfaces
- **Features**: Type safety, shared interfaces, API contracts

## Migration Guide

### From Old Hooks to New Architecture

#### Conversation State
**Before:**
```typescript
import useConversationState from './features/conversation/useConversationState';
const { messages, addMessage, clearConversation } = useConversationState();
```

**After:**
```typescript
import { useConversationStore } from './store/conversationStore';
const { messages, sendUserMessage, clearConversation } = useConversationStore();
```

#### Marketplace Filters
**Before:**
```typescript
import { useMarketplaceFilters } from './features/marketplace/hooks/useMarketplaceFilters';
const { filters, updateFilter } = useMarketplaceFilters();
```

**After:**
```typescript
import { useMarketplaceStore } from './store/marketplaceStore';
const { filters, updateFilter } = useMarketplaceStore();
```

#### RAG Functions
**Before:**
```typescript
import { upsertDocuments, retrieveContext } from './features/conversation/rag';
```

**After:**
```typescript
import { ragService } from './services/rag/RagService';
await ragService.upsertDocuments(docs);
const context = await ragService.retrieveContext(query);
```

## Testing

### Unit Tests
Located in `src/services/__tests__/`:
- `environment.test.ts` - Environment service tests
- `storage.test.ts` - Storage repository tests
- `rag.test.ts` - RAG service tests
- `integration.test.ts` - End-to-end flow tests

### Running Tests
```bash
npm test
```

## Configuration

### Environment Variables
```bash
VITE_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
NODE_ENV=development|production
API_TIMEOUT=30000
MAX_RETRIES=3
```

## Benefits of New Architecture

1. **Separation of Concerns**: Clear boundaries between storage, business logic, and presentation
2. **Testability**: Each layer can be tested independently with mocked dependencies
3. **Maintainability**: Centralized configuration and type definitions
4. **Scalability**: Easy to add new features without affecting existing code
5. **Reusability**: Services and repositories can be used across different features
6. **Type Safety**: Comprehensive TypeScript coverage prevents runtime errors

## Future Enhancements

### High Priority
- [ ] Add error boundary components for graceful error handling
- [ ] Implement optimistic updates in stores
- [ ] Add loading skeletons for better UX

### Medium Priority
- [ ] Add caching layer for API responses
- [ ] Implement offline support with service workers
- [ ] Add analytics and error reporting

### Low Priority
- [ ] Add internationalization support
- [ ] Implement advanced search with fuzzy matching
- [ ] Add real-time collaboration features

## Quick Start

1. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

## Troubleshooting

### Common Issues

1. **API Key Not Found**: Ensure `VITE_GOOGLE_GENERATIVE_AI_API_KEY` is set in your environment
2. **TypeScript Errors**: Check that all imports use the new type definitions from `src/types`
3. **LocalStorage Issues**: Clear browser localStorage if experiencing data migration issues

### Debug Mode
Enable debug logging by setting:
```typescript
// In development
localStorage.setItem('debug', 'true');
```

## Support
For questions or issues with the new architecture, please refer to the test files or create an issue in the project repository.