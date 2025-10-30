import {
  getConversationQuickReplies,
  getConversationResponse,
  type ConversationData,
  type ConversationResponse,
  CONVERSATION_TYPE,
} from '@/lib/conversations';

// TO BE REFACTORED. THESE TESTS ARE NOT GOOD - POSSIBLE REDUNDANCY, INCOMPLETE TESTS.

import mockConversationData from '@/__tests__/fixtures/mock-conversation.json';

const mockConversation = mockConversationData as ConversationData;

// Type guard helpers for TS
const isSingle = (
  response: ConversationResponse
): response is {
  type: typeof CONVERSATION_TYPE.SINGLE;
  text: string;
  state: string;
} => {
  return (response as any).type === CONVERSATION_TYPE.SINGLE;
};

const isSequence = (
  response: ConversationResponse
): response is {
  type: typeof CONVERSATION_TYPE.SEQUENCE;
  items: Array<string | string[]>;
  state: string;
} => {
  return (response as any).type === CONVERSATION_TYPE.SEQUENCE;
};

const requireNextState = (label: string, nextState?: string): string => {
  if (!nextState) throw new Error(`${label} nextState is required`);
  return nextState;
};

describe('Conversation State Machine - Implementation Tests', () => {
  describe('Feature 1: One-to-One Replies', () => {
    it('should return a specific text response when transitioning to a state', () => {
      const response = getConversationResponse(mockConversation, 'greeting');

      if (!isSingle(response)) throw new Error('Expected a single response');
      const single = response;
      expect(single.text).toBeDefined();
      expect(typeof single.text).toBe('string');
      expect(single.text).toBe('Hello! Nice to meet you.');
      expect(single.state).toBe('greeting');
    });

    it('should handle state transitions via quick replies', () => {
      const initialState = mockConversation.initialState;
      const quickReplies = getConversationQuickReplies(
        mockConversation,
        initialState
      );

      const greetingReply = quickReplies.find(r => r.text === 'Say hello');
      expect(greetingReply).toBeDefined();
      const next = requireNextState('greeting', greetingReply?.nextState);

      const response = getConversationResponse(mockConversation, next);
      if (!isSingle(response)) throw new Error('Expected a single response');
      const single = response;
      expect(single.text).toBe('Hello! Nice to meet you.');
      expect(single.state).toBe('greeting');
    });
  });

  describe('Feature 2: One-to-Many Replies', () => {
    it('should return a sequence of possible responses for array-based state messages', () => {
      const response = getConversationResponse(
        mockConversation,
        'random_facts'
      );

      const possibleResponses = [
        'Did you know cats sleep 70% of their lives?',
        'The sky is blue because of Rayleigh scattering.',
        'Honey never spoils!',
      ];

      expect((response as any).type).toBe('sequence');
      if (!isSequence(response))
        throw new Error('Expected a sequence response');
      expect(Array.isArray(response.items)).toBe(true);
      expect(response.items).toEqual(possibleResponses);
      expect(response.state).toBe('random_facts');
    });

    it('should expose all options for one-to-many states', () => {
      const response = getConversationResponse(
        mockConversation,
        'random_facts'
      );

      expect((response as any).type).toBe('sequence');
      if (!isSequence(response))
        throw new Error('Expected a sequence response');
      expect(response.items.length).toBeGreaterThan(1);
    });

    it('should support randomized single message in other states (more_facts)', () => {
      const options = [
        'Octopuses have three hearts.',
        'Bananas are berries, but strawberries are not.',
        'A day on Venus is longer than its year.',
      ];

      const response = getConversationResponse(mockConversation, 'more_facts');

      if (!isSingle(response)) throw new Error('Expected a single response');
      expect(options.includes(response.text)).toBe(true);
      expect(response.state).toBe('more_facts');
    });
  });

  describe('Feature X: Random Single Reply (random_facts)', () => {
    it('should return a single message randomly chosen from options', () => {
      const options = [
        'Did you know cats sleep 70% of their lives?',
        'The sky is blue because of Rayleigh scattering.',
        'Honey never spoils!',
      ];
      const seen = new Set<string>();

      for (let i = 0; i < 10; i++) {
        const response = getConversationResponse(
          mockConversation,
          'random_facts'
        );
        if (!isSingle(response)) throw new Error('Expected a single response');
        expect(options.includes(response.text)).toBe(true);
        seen.add(response.text);
      }

      expect(seen.size).toBeGreaterThan(0);
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
      const next = requireNextState('back', backReply?.nextState);

      const response = getConversationResponse(mockConversation, next);
      expect(response.state).toBe('root');
    });

    it('should allow looping back to welcome from help_menu', () => {
      const quickReplies = getConversationQuickReplies(
        mockConversation,
        'help_menu'
      );
      const backReply = quickReplies.find(r => r.text === 'Back to main menu');

      expect(backReply).toBeDefined();
      const next = requireNextState('back', backReply?.nextState);
      expect(next).toBe('root');
    });

    it('should allow looping back to welcome from random_facts', () => {
      const quickReplies = getConversationQuickReplies(
        mockConversation,
        'random_facts'
      );
      const backReply = quickReplies.find(r => r.text === 'Back to start');

      expect(backReply).toBeDefined();
      const next = requireNextState('back', backReply?.nextState);
      expect(next).toBe('root');
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
      const next = requireNextState('more facts', moreFactsReply?.nextState);

      const response1 = getConversationResponse(mockConversation, next);
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
      const next = requireNextState('back', backReply?.nextState);
      expect(next).toBe('greeting');
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
        const next = requireNextState('sequence step', reply?.nextState);
        const response = getConversationResponse(mockConversation, next);

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
        requireNextState('greet', greetReply?.nextState)
      );
      state = response.state;
      expect(state).toBe('greeting');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const tellMoreReply = quickReplies.find(
        r => r.text === 'Tell me more about yourself'
      );
      response = getConversationResponse(
        mockConversation,
        requireNextState('tell more', tellMoreReply?.nextState)
      );
      state = response.state;
      expect(state).toBe('about');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const capabilitiesReply = quickReplies.find(
        r => r.text === 'What can you do?'
      );
      response = getConversationResponse(
        mockConversation,
        requireNextState('capabilities', capabilitiesReply?.nextState)
      );
      state = response.state;
      expect(state).toBe('capabilities');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const backReply = quickReplies.find(r => r.text === 'Back to about');
      response = getConversationResponse(
        mockConversation,
        requireNextState('back', backReply?.nextState)
      );
      state = response.state;
      expect(state).toBe('about');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const backReply2 = quickReplies.find(r => r.text === 'Go back');
      response = getConversationResponse(
        mockConversation,
        requireNextState('back2', backReply2?.nextState)
      );
      state = response.state;
      expect(state).toBe('greeting');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const backReply3 = quickReplies.find(r => r.text === 'Go back');
      response = getConversationResponse(
        mockConversation,
        requireNextState('back3', backReply3?.nextState)
      );
      state = response.state;
      expect(state).toBe('root');
    });

    it('should handle conversation with one-to-many and loops', () => {
      let state = mockConversation.initialState;
      let quickReplies = getConversationQuickReplies(mockConversation, state);

      const randomReply = quickReplies.find(
        r => r.text === 'Tell me something random'
      );
      let response = getConversationResponse(
        mockConversation,
        requireNextState('random', randomReply?.nextState)
      );
      state = response.state;
      expect(state).toBe('random_facts');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const moreFactsReply = quickReplies.find(
        r => r.text === 'Tell me another fact'
      );
      response = getConversationResponse(
        mockConversation,
        requireNextState('more facts', moreFactsReply?.nextState)
      );
      expect(response.state).toBe('more_facts');

      quickReplies = getConversationQuickReplies(
        mockConversation,
        'more_facts'
      );
      const moreReply = quickReplies.find(r => r.text === 'More random facts');
      response = getConversationResponse(
        mockConversation,
        requireNextState('more', moreReply?.nextState)
      );
      expect(response.state).toBe('random_facts');

      quickReplies = getConversationQuickReplies(
        mockConversation,
        'random_facts'
      );
      const backReply = quickReplies.find(r => r.text === 'Back to start');
      response = getConversationResponse(
        mockConversation,
        requireNextState('back', backReply?.nextState)
      );
      state = response.state;
      expect(state).toBe('root');
    });

    it('should handle help menu flow with nested loops', () => {
      let state = mockConversation.initialState;
      let quickReplies = getConversationQuickReplies(mockConversation, state);

      const helpReply = quickReplies.find(r => r.text === 'Get help');
      let response = getConversationResponse(
        mockConversation,
        requireNextState('help', helpReply?.nextState)
      );
      state = response.state;
      expect(state).toBe('help_menu');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const faqReply = quickReplies.find(r => r.text === 'View FAQ');
      response = getConversationResponse(
        mockConversation,
        requireNextState('faq', faqReply?.nextState)
      );
      state = response.state;
      expect(state).toBe('faq');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const questionReply = quickReplies.find(r => r.text === 'What is this?');
      response = getConversationResponse(
        mockConversation,
        requireNextState('question', questionReply?.nextState)
      );
      expect(response.state).toBe('faq_answer');

      quickReplies = getConversationQuickReplies(
        mockConversation,
        'faq_answer'
      );
      const backReply = quickReplies.find(r => r.text === 'Back to help menu');
      response = getConversationResponse(
        mockConversation,
        requireNextState('help back', backReply?.nextState)
      );
      state = response.state;
      expect(state).toBe('help_menu');

      quickReplies = getConversationQuickReplies(mockConversation, state);
      const backReply2 = quickReplies.find(r => r.text === 'Back to main menu');
      response = getConversationResponse(
        mockConversation,
        requireNextState('main back', backReply2?.nextState)
      );
      state = response.state;
      expect(state).toBe('root');
    });
  });

  describe('Feature 5: Graceful Fallbacks', () => {
    it('should return default response for invalid state', () => {
      const response = getConversationResponse(
        mockConversation,
        'invalid-state-12345'
      );

      if (!isSingle(response)) throw new Error('Expected a single response');
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

      if (!isSingle(response)) throw new Error('Expected a single response');
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
        'root'
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

  it('Rule 2: Every state must have a message node with valid shape', () => {
    Object.entries(mockConversation.states).forEach(([_stateName, state]) => {
      const msg = state.message as any;
      expect(msg).toBeDefined();
      expect(['single', 'sequence', 'random']).toContain(msg.type);
      if (msg.type === 'single') {
        expect(typeof msg.text).toBe('string');
      } else if (msg.type === 'sequence') {
        expect(Array.isArray(msg.items)).toBe(true);
        expect(msg.items.length).toBeGreaterThan(0);
      } else if (msg.type === 'random') {
        expect(Array.isArray(msg.options)).toBe(true);
        expect(msg.options.length).toBeGreaterThan(0);
      }
    });
  });

  it('Rule 3: Every quick reply must have text and nextState', () => {
    Object.entries(mockConversation.states).forEach(([_stateName, state]) => {
      const quickReplies = state.quickReplies ?? [];
      quickReplies.forEach(reply => {
        expect(reply.text).toBeDefined();
        expect(reply.nextState).toBeDefined();
        expect(typeof reply.text).toBe('string');
        expect(typeof reply.nextState).toBe('string');
      });
    });
  });

  it('Rule 4: If nextState is provided, it should be a valid state', () => {
    Object.entries(mockConversation.states).forEach(([_stateName, state]) => {
      const quickReplies = state.quickReplies ?? [];
      quickReplies.forEach(reply => {
        expect(reply.nextState).toBeDefined();
        if (reply.nextState) {
          expect(mockConversation.states[reply.nextState]).toBeDefined();
        }
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
      const quickReplies = state.quickReplies ?? [];
      quickReplies.forEach(reply => {
        if (reply.nextState && !visited.has(reply.nextState)) {
          queue.push(reply.nextState);
        }
      });
    }

    Object.keys(mockConversation.states).forEach(stateName => {
      expect(visited.has(stateName)).toBe(true);
    });
  });

  it('Rule 7: Sequence/random messages must have at least one element', () => {
    Object.entries(mockConversation.states).forEach(([_stateName, state]) => {
      const msg = state.message as any;
      if (msg.type === 'sequence') {
        expect(msg.items.length).toBeGreaterThan(0);
      }
      if (msg.type === 'random') {
        expect(msg.options.length).toBeGreaterThan(0);
      }
    });
  });

  it('Rule 8: All quick reply nextStates should be unique within a state', () => {
    Object.entries(mockConversation.states).forEach(([_stateName, state]) => {
      const nextStates = (state.quickReplies ?? []).map(
        qr => qr.nextState ?? ''
      );
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
      expect(state.quickReplies?.length ?? 0).toBeGreaterThan(0);
    });
  });

  it('Mock conversation should have all 3 main features', () => {
    let hasOneToOne = false;
    let hasOneToMany = false;
    let hasInfiniteLoop = false;

    Object.entries(mockConversation.states).forEach(([stateName, state]) => {
      const msg = state.message as any;
      if (msg.type === 'single') hasOneToOne = true;
      if (msg.type === 'sequence' || msg.type === 'random') hasOneToMany = true;

      (state.quickReplies ?? []).forEach(reply => {
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
