import {
  getConversationQuickReplies,
  getConversationResponse,
} from '@/lib/conversations';

import type { ConversationData } from '@/lib/conversations';
import mockConversationData from '@/__tests__/fixtures/mock-conversation.json';

const mockConversation = mockConversationData as ConversationData;

describe('Conversation State Machine - Implementation Tests', () => {
  describe('Feature 1: One-to-One Replies', () => {
    it('should return a specific text response when transitioning to a state', () => {
      const response = getConversationResponse(mockConversation, 'greeting');

      expect(response.text).toBeDefined();
      expect(typeof response.text).toBe('string');
      expect(response.text).toBe('Hello! Nice to meet you.');
      expect(response.state).toBe('greeting');
    });

    it('should handle state transitions via quick replies', () => {
      const initialState = mockConversation.initialState;
      const quickReplies = getConversationQuickReplies(
        mockConversation,
        initialState
      );

      const greetingReply = quickReplies.find(r => r.text === 'Say hello');
      expect(greetingReply).toBeDefined();
      expect(greetingReply!.nextState).toBe('greeting');

      const response = getConversationResponse(
        mockConversation,
        greetingReply!.nextState
      );
      expect(response.text).toBe('Hello! Nice to meet you.');
      expect(response.state).toBe('greeting');
    });
  });

  describe('Feature 2: One-to-Many Replies', () => {
    it('should return one of multiple possible responses for array-based state messages', () => {
      const response = getConversationResponse(
        mockConversation,
        'random_facts'
      );

      const possibleResponses = [
        'Did you know cats sleep 70% of their lives?',
        'The sky is blue because of Rayleigh scattering.',
        'Honey never spoils!',
      ];

      expect(possibleResponses).toContain(response.text);
      expect(response.state).toBe('random_facts');
    });

    it('should return random responses from array (statistical test)', () => {
      const responses = new Set<string>();

      for (let i = 0; i < 20; i++) {
        const response = getConversationResponse(
          mockConversation,
          'random_facts'
        );
        responses.add(response.text);
      }

      expect(responses.size).toBeGreaterThan(1);
    });

    it('should handle one-to-many in any state', () => {
      const possibleResponses = [
        'Octopuses have three hearts.',
        'Bananas are berries, but strawberries are not.',
        'A day on Venus is longer than its year.',
      ];

      const response = getConversationResponse(mockConversation, 'more_facts');

      expect(possibleResponses).toContain(response.text);
      expect(response.state).toBe('more_facts');
    });
  });

  describe('Feature 3: Infinite Conversations (State Loops)', () => {
    it('should allow looping back to welcome state from greeting', () => {
      const quickReplies = getConversationQuickReplies(
        mockConversation,
        'greeting'
      );
      const backReply = quickReplies.find(r => r.text === 'Go back');

      expect(backReply).toBeDefined();
      expect(backReply!.nextState).toBe('welcome');

      const response = getConversationResponse(
        mockConversation,
        backReply!.nextState
      );
      expect(response.state).toBe('welcome');
    });

    it('should allow looping back to welcome from help_menu', () => {
      const quickReplies = getConversationQuickReplies(
        mockConversation,
        'help_menu'
      );
      const backReply = quickReplies.find(r => r.text === 'Back to main menu');

      expect(backReply).toBeDefined();
      expect(backReply!.nextState).toBe('welcome');
    });

    it('should allow looping back to welcome from random_facts', () => {
      const quickReplies = getConversationQuickReplies(
        mockConversation,
        'random_facts'
      );
      const backReply = quickReplies.find(r => r.text === 'Back to start');

      expect(backReply).toBeDefined();
      expect(backReply!.nextState).toBe('welcome');
    });

    it('should allow infinite loops within a state (self-loops)', () => {
      const quickReplies = getConversationQuickReplies(
        mockConversation,
        'more_facts'
      );
      const moreFactsReply = quickReplies.find(
        r => r.text === 'More random facts'
      );

      expect(moreFactsReply).toBeDefined();
      expect(moreFactsReply!.nextState).toBe('random_facts');

      const response1 = getConversationResponse(
        mockConversation,
        moreFactsReply!.nextState
      );
      expect(response1.state).toBe('random_facts');

      const response2 = getConversationResponse(
        mockConversation,
        response1.state
      );
      expect(response2.state).toBe('random_facts');
    });

    it('should allow nested state loops (back to greeting from about)', () => {
      const quickReplies = getConversationQuickReplies(
        mockConversation,
        'about'
      );
      const backReply = quickReplies.find(r => r.text === 'Go back');

      expect(backReply).toBeDefined();
      expect(backReply!.nextState).toBe('greeting');
    });
  });

  describe('Feature 4: State Transitions', () => {
    it('should transition through multiple states in sequence', () => {
      let currentState = mockConversation.initialState;
      const stateHistory: string[] = [currentState];

      for (let i = 0; i < 5; i++) {
        const quickReplies = getConversationQuickReplies(
          mockConversation,
          currentState
        );

        if (quickReplies.length === 0) {
          break;
        }

        const reply = quickReplies[0];
        const response = getConversationResponse(
          mockConversation,
          reply.nextState
        );

        if (!response.state) {
          break;
        }

        currentState = response.state;
        stateHistory.push(currentState);
      }

      expect(stateHistory.length).toBeGreaterThan(1);

      stateHistory.forEach(state => {
        expect(mockConversation.states[state]).toBeDefined();
      });
    });

    it('should handle complex state flow: welcome -> greeting -> about -> capabilities -> about -> greeting -> welcome', () => {
      let state = mockConversation.initialState;
      let quickReplies = getConversationQuickReplies(mockConversation, state);
      const greetReply = quickReplies.find(r => r.text === 'Say hello');
      expect(greetReply).toBeDefined();

      let response = getConversationResponse(
        mockConversation,
        greetReply!.nextState
      );
      state = response.state;
      expect(state).toBe('greeting');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const tellMoreReply = quickReplies.find(
        r => r.text === 'Tell me more about yourself'
      );
      response = getConversationResponse(
        mockConversation,
        tellMoreReply!.nextState
      );
      state = response.state;
      expect(state).toBe('about');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const capabilitiesReply = quickReplies.find(
        r => r.text === 'What can you do?'
      );
      response = getConversationResponse(
        mockConversation,
        capabilitiesReply!.nextState
      );
      state = response.state;
      expect(state).toBe('capabilities');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const backReply = quickReplies.find(r => r.text === 'Back to about');
      response = getConversationResponse(
        mockConversation,
        backReply!.nextState
      );
      state = response.state;
      expect(state).toBe('about');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const backReply2 = quickReplies.find(r => r.text === 'Go back');
      response = getConversationResponse(
        mockConversation,
        backReply2!.nextState
      );
      state = response.state;
      expect(state).toBe('greeting');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const backReply3 = quickReplies.find(r => r.text === 'Go back');
      response = getConversationResponse(
        mockConversation,
        backReply3!.nextState
      );
      state = response.state;
      expect(state).toBe('welcome');
    });

    it('should handle conversation with one-to-many and loops', () => {
      let state = mockConversation.initialState;
      let quickReplies = getConversationQuickReplies(mockConversation, state);

      const randomReply = quickReplies.find(
        r => r.text === 'Tell me something random'
      );
      let response = getConversationResponse(
        mockConversation,
        randomReply!.nextState
      );
      state = response.state;
      expect(state).toBe('random_facts');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const moreFactsReply = quickReplies.find(
        r => r.text === 'Tell me another fact'
      );
      response = getConversationResponse(
        mockConversation,
        moreFactsReply!.nextState
      );
      expect(response.state).toBe('more_facts');

      quickReplies = getConversationQuickReplies(
        mockConversation,
        'more_facts'
      );
      const moreReply = quickReplies.find(r => r.text === 'More random facts');
      response = getConversationResponse(
        mockConversation,
        moreReply!.nextState
      );
      expect(response.state).toBe('random_facts');

      quickReplies = getConversationQuickReplies(
        mockConversation,
        'random_facts'
      );
      const backReply = quickReplies.find(r => r.text === 'Back to start');
      response = getConversationResponse(
        mockConversation,
        backReply!.nextState
      );
      state = response.state;
      expect(state).toBe('welcome');
    });

    it('should handle help menu flow with nested loops', () => {
      let state = mockConversation.initialState;
      let quickReplies = getConversationQuickReplies(mockConversation, state);

      const helpReply = quickReplies.find(r => r.text === 'Get help');
      let response = getConversationResponse(
        mockConversation,
        helpReply!.nextState
      );
      state = response.state;
      expect(state).toBe('help_menu');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const faqReply = quickReplies.find(r => r.text === 'View FAQ');
      response = getConversationResponse(mockConversation, faqReply!.nextState);
      state = response.state;
      expect(state).toBe('faq');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const questionReply = quickReplies.find(r => r.text === 'What is this?');
      response = getConversationResponse(
        mockConversation,
        questionReply!.nextState
      );
      expect(response.state).toBe('faq_answer');

      quickReplies = getConversationQuickReplies(
        mockConversation,
        'faq_answer'
      );
      const backReply = quickReplies.find(r => r.text === 'Back to help menu');
      response = getConversationResponse(
        mockConversation,
        backReply!.nextState
      );
      state = response.state;
      expect(state).toBe('help_menu');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const backReply2 = quickReplies.find(r => r.text === 'Back to main menu');
      response = getConversationResponse(
        mockConversation,
        backReply2!.nextState
      );
      state = response.state;
      expect(state).toBe('welcome');
    });
  });

  describe('Feature 5: Graceful Fallbacks', () => {
    it('should return default response for invalid state', () => {
      const response = getConversationResponse(
        mockConversation,
        'invalid-state-12345'
      );

      expect(response.text).toBe(
        "Sorry, I don't understand that. Let's start over."
      );
      expect(response.state).toBe(mockConversation.initialState);
    });

    it('should return default response for invalid conversation', () => {
      const response = getConversationResponse(
        null as unknown as ConversationData,
        'any-state'
      );

      expect(response.text).toBe(
        "Sorry, something went wrong. Let's start over."
      );
      expect(response.state).toBe('');
    });

    it('should return empty array for non-existent state', () => {
      const quickReplies = getConversationQuickReplies(
        mockConversation,
        'non-existent-state-12345'
      );
      expect(quickReplies).toEqual([]);
    });

    it('should return empty array for invalid conversation', () => {
      const quickReplies = getConversationQuickReplies(
        null as unknown as ConversationData,
        'any-state'
      );
      expect(quickReplies).toEqual([]);
    });
  });

  describe('Quick Replies Functionality', () => {
    it('should return quick replies for any state', () => {
      const initialState = mockConversation.initialState;
      const quickReplies = getConversationQuickReplies(
        mockConversation,
        initialState
      );

      expect(Array.isArray(quickReplies)).toBe(true);
      expect(quickReplies.length).toBeGreaterThan(0);

      quickReplies.forEach(reply => {
        expect(reply.text).toBeDefined();
        expect(reply.nextState).toBeDefined();
        expect(typeof reply.text).toBe('string');
        expect(typeof reply.nextState).toBe('string');
      });
    });

    it('should return different quick replies for different states', () => {
      const welcomeReplies = getConversationQuickReplies(
        mockConversation,
        'welcome'
      );
      const greetingReplies = getConversationQuickReplies(
        mockConversation,
        'greeting'
      );

      const welcomeNextStates = welcomeReplies
        .map(r => r.nextState)
        .sort()
        .join(',');
      const greetingNextStates = greetingReplies
        .map(r => r.nextState)
        .sort()
        .join(',');

      expect(welcomeNextStates).not.toBe(greetingNextStates);
    });
  });
});

describe('Mock Conversation Structure Validation', () => {
  it('Rule 1: Every state must have quickReplies array', () => {
    Object.entries(mockConversation.states).forEach(([_stateName, state]) => {
      expect(state.quickReplies).toBeDefined();
      expect(Array.isArray(state.quickReplies)).toBe(true);
    });
  });

  it('Rule 2: Every state must have a message', () => {
    Object.entries(mockConversation.states).forEach(([_stateName, state]) => {
      expect(state.message).toBeDefined();
      const isStringOrArray =
        typeof state.message === 'string' || Array.isArray(state.message);
      expect(isStringOrArray).toBe(true);
    });
  });

  it('Rule 3: Every quick reply must have text and nextState', () => {
    Object.entries(mockConversation.states).forEach(([_stateName, state]) => {
      state.quickReplies.forEach(reply => {
        expect(reply.text).toBeDefined();
        expect(reply.nextState).toBeDefined();
        expect(typeof reply.text).toBe('string');
        expect(typeof reply.nextState).toBe('string');
      });
    });
  });

  it('Rule 4: If nextState is provided, it should be a valid state', () => {
    Object.entries(mockConversation.states).forEach(([_stateName, state]) => {
      state.quickReplies.forEach(reply => {
        expect(mockConversation.states[reply.nextState]).toBeDefined();
      });
    });
  });

  it('Rule 5: Conversation must have an initialState', () => {
    expect(mockConversation.initialState).toBeDefined();
    expect(
      mockConversation.states[mockConversation.initialState]
    ).toBeDefined();
  });

  it('Rule 6: All states must be reachable from initial state', () => {
    const visited = new Set<string>();
    const queue: string[] = [mockConversation.initialState];

    while (queue.length > 0) {
      const currentState = queue.shift()!;
      if (visited.has(currentState)) {
        continue;
      }

      visited.add(currentState);

      const state = mockConversation.states[currentState];
      state.quickReplies.forEach(reply => {
        if (!visited.has(reply.nextState)) {
          queue.push(reply.nextState);
        }
      });
    }

    Object.keys(mockConversation.states).forEach(stateName => {
      expect(visited.has(stateName)).toBe(true);
    });
  });

  it('Rule 7: One-to-many messages must have at least one option', () => {
    Object.entries(mockConversation.states).forEach(([_stateName, state]) => {
      if (Array.isArray(state.message)) {
        expect(state.message.length).toBeGreaterThan(0);
      }
    });
  });

  it('Rule 8: All quick reply nextStates should be unique within a state', () => {
    Object.entries(mockConversation.states).forEach(([_stateName, state]) => {
      const nextStates = state.quickReplies.map(qr => qr.nextState);
      const uniqueNextStates = new Set(nextStates);
      expect(nextStates.length).toBe(uniqueNextStates.size);
    });
  });

  it('Rule 9: State names should be valid identifiers', () => {
    Object.keys(mockConversation.states).forEach(stateName => {
      expect(stateName).toBeTruthy();
      expect(typeof stateName).toBe('string');
      expect(stateName.length).toBeGreaterThan(0);
    });
  });

  it('Rule 10: All states should have at least one quick reply', () => {
    Object.entries(mockConversation.states).forEach(([_stateName, state]) => {
      expect(state.quickReplies.length).toBeGreaterThan(0);
    });
  });

  it('Mock conversation should have all 3 main features', () => {
    let hasOneToOne = false;
    let hasOneToMany = false;
    let hasInfiniteLoop = false;

    Object.entries(mockConversation.states).forEach(([stateName, state]) => {
      if (typeof state.message === 'string') {
        hasOneToOne = true;
      }
      if (Array.isArray(state.message)) {
        hasOneToMany = true;
      }

      state.quickReplies.forEach(reply => {
        if (
          reply.nextState === stateName ||
          reply.nextState === mockConversation.initialState
        ) {
          hasInfiniteLoop = true;
        }
      });
    });

    expect(hasOneToOne).toBe(true);
    expect(hasOneToMany).toBe(true);
    expect(hasInfiniteLoop).toBe(true);
  });
});
