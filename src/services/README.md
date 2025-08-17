# Services Layer Documentation

This directory contains the service layer of the LOG_ON application, implementing a clean architecture with proper separation of concerns.

## Architecture Overview

The services layer provides:
- **Business Logic Encapsulation**: All business logic is contained within services
- **External API Abstraction**: API calls are centralized in dedicated services
- **Cross-Cutting Concerns**: Analytics, configuration, and other shared functionality
- **Testability**: Services are easily mockable for testing

## Service Structure

### Core Services

#### AnalyticsService (`analytics/AnalyticsService.ts`)
Centralized analytics tracking with consistent event naming and error handling.

**Usage:**
```typescript
import { analyticsService } from '../services/analytics/AnalyticsService';

analyticsService.trackEvent('user_action', { action: 'click' });
analyticsService.trackPageView('/marketplace');
```

#### ConfigurationService (`config/ConfigurationService.ts`)
Centralized configuration management for environment variables and feature flags.

**Usage:**
```typescript
import { configurationService } from '../services/config/ConfigurationService';

const apiUrl = configurationService.getApiUrl('/messages');
const isFeatureEnabled = configurationService.isFeatureEnabled('speechRecognition');
```

#### SpeechRecognitionService (`conversation/SpeechRecognitionService.ts`)
Handles all speech-to-text functionality with proper error handling and browser compatibility.

**Usage:**
```typescript
import { speechRecognitionService } from '../services/conversation/SpeechRecognitionService';

if (speechRecognitionService.isSupported()) {
  await speechRecognitionService.startRecognition({
    continuous: false,
    timeout: 10000
  });
}
```

### Data Services

#### ConversationService (`conversation/ConversationService.ts`)
Handles all conversation-related API calls and business logic.

#### Storage Services
- **BaseStorageRepository**: Abstract storage interface
- **ConversationRepository**: Conversation data persistence
- **RAGRepository**: RAG document management

## Migration Guidelines

### From Legacy Hooks to Services

#### Old Pattern (Deprecated):
```typescript
// ❌ Direct analytics usage
import { trackEvent } from './analytics/analytics';
trackEvent('event_name', properties);

// ❌ Direct speech recognition in hooks
const recognition = new webkitSpeechRecognition();
```

#### New Pattern (Recommended):
```typescript
// ✅ Service-based approach
import { analyticsService } from '../services/analytics/AnalyticsService';
import { speechRecognitionService } from '../services/conversation/SpeechRecognitionService';

analyticsService.trackEvent('event_name', properties);
speechRecognitionService.startRecognition();
```

## Testing

Services are designed for easy testing:

```typescript
// Mock service in tests
vi.mock('../services/analytics/AnalyticsService', () => ({
  analyticsService: {
    trackEvent: vi.fn(),
    trackUserAction: vi.fn(),
  }
}));
```

## Best Practices

1. **Always use services** for business logic, never implement directly in components
2. **Use dependency injection** for services in tests
3. **Handle errors gracefully** within services
4. **Provide meaningful defaults** for configuration
5. **Document service interfaces** for clear usage patterns

## Service Registry

| Service | Purpose | Key Methods |
|---------|---------|-------------|
| `analyticsService` | Analytics tracking | `trackEvent()`, `trackPageView()` |
| `configurationService` | Config management | `getConfig()`, `isFeatureEnabled()` |
| `speechRecognitionService` | Voice recognition | `startRecognition()`, `stopRecognition()` |
| `conversationService` | AI chat | `sendMessage()`, `getHistory()` |

## Future Enhancements

- [ ] Add caching layer to services
- [ ] Implement service health checks
- [ ] Add service metrics and monitoring
- [ ] Create service factory for dynamic instantiation