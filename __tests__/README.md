# Conversation Feature Tests

This directory contains comprehensive tests for the conversation messagebar feature.

## 🎯 Key Principle: Tests Don't Use Production Data

**Important**: Tests use ONLY the mock conversation from `fixtures/mock-conversation.json`.

- ✅ **You can freely edit** `bot.json` and `sponsored.json` without breaking tests
- ✅ Tests verify the **implementation** works, not specific content
- ✅ The mock conversation proves the pattern works for any conversation following the rules
- ✅ Mock is automatically loaded as `test-bot` in test environment only

### Why This Matters

Your production conversations (`bot.json`, `sponsored.json`) are not finalized yet and should be freely editable. Tests that depend on production data would prevent you from changing conversations without breaking tests. By using only a mock, you have complete freedom to edit your conversations while still having confidence that the implementation works correctly.

## Test Structure

```
__tests__/
├── lib/
│   └── conversations.test.ts   ← Tests mirror source structure
└── fixtures/
    └── mock-conversation.json  ← Test data
```

### Main Test File

- **`lib/conversations.test.ts`** - Tests the conversation state machine implementation

### Test Fixtures

- **`fixtures/mock-conversation.json`** - Mock conversation data that demonstrates all features

## Features Tested

The tests verify that the conversation system supports 5 key features:

### 1. One-to-One Replies

A quick reply leads to a single, specific text response.

```json
{
  "responses": {
    "greet": {
      "text": "Hello! Nice to meet you.",
      "nextState": "greeting"
    }
  }
}
```

### 2. One-to-Many Replies

A quick reply can return one of many possible responses (randomly selected).

```json
{
  "responses": {
    "random": {
      "text": [
        "Did you know cats sleep 70% of their lives?",
        "The sky is blue because of Rayleigh scattering.",
        "Honey never spoils!"
      ],
      "nextState": "random_facts"
    }
  }
}
```

### 3. Infinite Conversations

Conversations can loop back to previous states, allowing endless interaction.

```json
{
  "responses": {
    "back": {
      "text": "Going back to the main menu.",
      "nextState": "welcome"
    },
    "more_facts": {
      "text": ["Fact 1", "Fact 2"],
      "nextState": "random_facts"
    }
  }
}
```

### 4. State Transitions

Responses can specify the next state, creating complex conversation flows.

```json
{
  "initialState": "welcome",
  "states": {
    "welcome": {
      "responses": {
        "greet": {
          "text": "Hello!",
          "nextState": "greeting"
        }
      }
    }
  }
}
```

### 5. Graceful Fallbacks

The system returns sensible defaults when conversation data is missing or invalid.

- Invalid conversation ID → `"Thanks for your message!"`
- Invalid state → `"Thanks for your message!"`
- Invalid reply ID → `"Thanks for your message!"`
- Non-existent state → `[]` (empty quick replies)

## Test Categories

### Implementation Tests

Tests that verify the actual conversation implementation works correctly:

- Feature 1-5 tests
- Quick replies functionality
- State transitions through multiple states

### Validation Rules

Tests that verify conversation data structure follows all required rules:

1. Every state must have quickReplies array
2. Every quick reply must have a corresponding response
3. Every response must have text (string or array)
4. If nextState is provided, it should be a valid state
5. Conversation must have an initialState
6. All states must be reachable from initial state
7. One-to-many responses must have at least one option
8. All quick reply IDs must be unique within a state
9. State names should be valid identifiers
10. Quick replies should have both id and text

## Running Tests

```bash
# Run all tests
npm test

# Run conversation tests only
npm test -- __tests__/lib/conversations.test.ts

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

## Mock Conversation

The `fixtures/mock-conversation.json` file contains a complete conversation that demonstrates all features. This ensures the tests are not tied to specific conversation content and can verify that any conversation following the same structure will work correctly.

### Mock Conversation Structure

- **7 states**: welcome, greeting, help_menu, random_facts, about, faq, capabilities
- **One-to-One examples**: Most basic responses
- **One-to-Many examples**: random facts with multiple possible responses
- **Infinite loops**:
  - Back buttons that return to welcome state
  - Self-loops (e.g., random_facts → more_facts → random_facts)
- **State transitions**: Complex navigation paths between states

## Benefits of This Test Approach

1. **Implementation-Independent**: Tests verify behavior, not specific content
2. **Comprehensive Coverage**: All 5 features are tested
3. **Validation Rules**: Ensures any new conversation data follows the correct structure
4. **Clean Separation**: Production code in `lib/`, tests in `__tests__/`
5. **Mock Data**: Tests use only mock data, never production data
