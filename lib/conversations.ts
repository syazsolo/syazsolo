import {
  getIdentity,
  getQuickReply,
  getResponse,
  getTimestamp,
  messages,
} from './messages';

export interface ConversationState {
  quickReplies: Array<{
    id: string;
    text: string;
  }>;
  responses: Record<
    string,
    {
      text: string | string[];
      nextState?: string;
    }
  >;
}

export interface ConversationData {
  id: string;
  name: string;
  avatar: string;
  messages: Array<{
    sender: 'user' | 'bot';
    text: string;
    timestamp: string;
  }>;
  initialState: string;
  states: Record<string, ConversationState>;
}

// Random Han Solo quotes from the internet
const hanSoloQuotes = [
  'Sometimes, I amaze even myself.',
  'I know.',
  'Never tell me the odds!',
  "I've got a bad feeling about this.",
  "Great, kid. Don't get cocky.",
  'Hokey religions and ancient weapons are no match for a good blaster at your side, kid.',
  "You're all clear, kid. Now let's blow this thing and go home!",
  'I love you.',
  'I know.',
  "Chewie, we're home.",
  "I've got a bad feeling about this.",
  "That's not how the Force works!",
  "I'm responsible for these people.",
  "I'm a simple man trying to make my way in the universe.",
  "I've been waiting for you, Obi-Wan. We meet again, at last.",
  "You're gonna need a bigger boat.",
  "I'll be back.",
  'May the Force be with you.',
  'I find your lack of faith disturbing.',
  'Do or do not, there is no try.',
  'The Force will be with you, always.',
  'I am your father.',
  'No, I am your father.',
  'Luke, I am your father.',
  'Use the Force, Luke.',
  "Help me, Obi-Wan Kenobi. You're my only hope.",
  'I have a bad feeling about this.',
  "It's a trap!",
  "I'm getting too old for this sort of thing.",
  "I've got a bad feeling about this.",
  "That's not how the Force works!",
  "I'm responsible for these people.",
  "I'm a simple man trying to make my way in the universe.",
  "I've been waiting for you, Obi-Wan. We meet again, at last.",
  "You're gonna need a bigger boat.",
  "I'll be back.",
  'May the Force be with you.',
  'I find your lack of faith disturbing.',
  'Do or do not, there is no try.',
  'The Force will be with you, always.',
  'I am your father.',
  'No, I am your father.',
  'Luke, I am your father.',
  'Use the Force, Luke.',
  "Help me, Obi-Wan Kenobi. You're my only hope.",
  'I have a bad feeling about this.',
  "It's a trap!",
  "I'm getting too old for this sort of thing.",
];

export const getRandomHanSoloQuote = (): string => {
  const randomIndex = Math.floor(Math.random() * hanSoloQuotes.length);
  return hanSoloQuotes[randomIndex];
};

export const getConversationResponse = (
  conversationId: string,
  replyId: string,
  currentState: string
): { text: string; nextState?: string } => {
  const conversation = conversationsData[conversationId];
  if (!conversation?.states) {
    return { text: 'Thanks for your message!' };
  }

  const state = conversation.states[currentState];
  if (!state?.responses) {
    return { text: 'Thanks for your message!' };
  }

  const response = state.responses[replyId];
  if (!response) {
    return { text: 'Thanks for your message!' };
  }

  // Handle array responses (random selection)
  if (Array.isArray(response.text)) {
    const randomIndex = Math.floor(Math.random() * response.text.length);
    return {
      text: response.text[randomIndex],
      nextState: response.nextState,
    };
  }

  // Handle string responses
  return {
    text: response.text,
    nextState: response.nextState,
  };
};

export const getConversationQuickReplies = (
  conversationId: string,
  currentState: string
): Array<{ id: string; text: string }> => {
  const conversation = conversationsData[conversationId];
  if (!conversation?.states) {
    return [];
  }

  const state = conversation.states[currentState];
  return state?.quickReplies || [];
};

export const conversationsData: Record<string, ConversationData> = {
  bot: {
    id: messages.bot.identity.id,
    name: messages.bot.identity.name,
    avatar: messages.bot.identity.avatar,
    messages: [
      {
        sender: 'bot',
        text: messages.bot.identity.welcome,
        timestamp: getTimestamp('justNow'),
      },
    ],
    initialState: 'welcome',
    states: {
      welcome: {
        quickReplies: [
          { id: 'who', text: getQuickReply('bot', 'who') },
          { id: 'skills', text: getQuickReply('bot', 'skills') },
          { id: 'experience', text: getQuickReply('bot', 'experience') },
          { id: 'contact', text: getQuickReply('bot', 'contact') },
        ],
        responses: {
          who: {
            text: getResponse('bot', 'whoAmI'),
            nextState: 'about_me',
          },
          skills: {
            text: getResponse('bot', 'mySkills'),
            nextState: 'skills_deep',
          },
          experience: {
            text: getResponse('bot', 'myExperience'),
            nextState: 'experience_deep',
          },
          contact: {
            text: getResponse('bot', 'contactInfo'),
            nextState: 'contact_deep',
          },
        },
      },
      about_me: {
        quickReplies: [
          { id: 'hobbies', text: getQuickReply('bot', 'hobbies') },
          { id: 'goals', text: getQuickReply('bot', 'goals') },
          { id: 'fun_fact', text: getQuickReply('bot', 'funFact') },
          { id: 'back', text: getQuickReply('bot', 'back') },
        ],
        responses: {
          hobbies: {
            text: getResponse('bot', 'myHobbies'),
            nextState: 'hobbies_deep',
          },
          goals: {
            text: getResponse('bot', 'myGoals'),
            nextState: 'goals_deep',
          },
          fun_fact: {
            text: getResponse('bot', 'funFact'),
            nextState: 'fun_facts',
          },
          back: {
            text: getResponse('bot', 'backToMenu'),
            nextState: 'welcome',
          },
        },
      },
      skills_deep: {
        quickReplies: [
          { id: 'favorite_tech', text: getQuickReply('bot', 'favoriteTech') },
          { id: 'learning', text: getQuickReply('bot', 'learning') },
          { id: 'projects', text: getQuickReply('bot', 'projects') },
          { id: 'back', text: getQuickReply('bot', 'back') },
        ],
        responses: {
          favorite_tech: {
            text: getResponse('bot', 'favoriteTech'),
            nextState: 'tech_deep',
          },
          learning: {
            text: getResponse('bot', 'currentLearning'),
            nextState: 'learning_deep',
          },
          projects: {
            text: getResponse('bot', 'myProjects'),
            nextState: 'projects_deep',
          },
          back: {
            text: getResponse('bot', 'backToMenu'),
            nextState: 'welcome',
          },
        },
      },
      experience_deep: {
        quickReplies: [
          { id: 'challenges', text: getQuickReply('bot', 'challenges') },
          { id: 'achievements', text: getQuickReply('bot', 'achievements') },
          { id: 'team_work', text: getQuickReply('bot', 'teamWork') },
          { id: 'back', text: getQuickReply('bot', 'back') },
        ],
        responses: {
          challenges: {
            text: 'My biggest challenge was scaling a web application from 100 to 100,000+ users in just 6 months! We had to completely redesign the architecture, implement caching strategies, and optimize database queries. It was intense but incredibly rewarding!',
            nextState: 'challenges_deep',
          },
          achievements: {
            text: "I'm most proud of leading a team of 5 developers to build a real-time collaboration platform that's now used by 50+ companies. We went from concept to MVP in 3 months, and the feedback has been amazing!",
            nextState: 'achievements_deep',
          },
          team_work: {
            text: "I love working in teams! I believe the best code comes from collaboration and diverse perspectives. I've mentored junior developers and learned so much from senior engineers. Code reviews are my favorite part - they're like mini-lessons!",
            nextState: 'team_deep',
          },
          back: {
            text: getResponse('bot', 'backToMenu'),
            nextState: 'welcome',
          },
        },
      },
      contact_deep: {
        quickReplies: [
          { id: 'collaborate', text: getQuickReply('bot', 'collaborate') },
          { id: 'hire', text: getQuickReply('bot', 'hire') },
          { id: 'network', text: getQuickReply('bot', 'network') },
          { id: 'back', text: getQuickReply('bot', 'back') },
        ],
        responses: {
          collaborate: {
            text: "Absolutely! I'm always excited about new projects and collaborations. Whether it's open source, side projects, or innovative ideas - count me in! What did you have in mind?",
            nextState: 'collaboration',
          },
          hire: {
            text: "I'm currently open to new opportunities! I'm looking for roles where I can make a real impact, work with cutting-edge technologies, and grow as a developer. Full-stack, frontend, or backend - I'm flexible!",
            nextState: 'hiring',
          },
          network: {
            text: "I'd love to connect! I'm always interested in meeting fellow developers, sharing knowledge, and learning about different approaches to problem-solving. Let's exchange ideas!",
            nextState: 'networking',
          },
          back: {
            text: getResponse('bot', 'backToMenu'),
            nextState: 'welcome',
          },
        },
      },
      // Additional states for deeper conversations
      hobbies_deep: {
        quickReplies: [
          { id: 'gaming', text: getQuickReply('bot', 'gaming') },
          { id: 'books', text: getQuickReply('bot', 'books') },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          gaming: {
            text: 'I love strategy games like Civilization VI and Total War series! Also into RPGs like Cyberpunk 2077 and indie games. Gaming actually helps me think about user experience and problem-solving in different ways.',
            nextState: 'gaming_deep',
          },
          books: {
            text: "I'm a huge fan of Isaac Asimov's Foundation series and Philip K. Dick's work! Currently reading 'The Three-Body Problem' trilogy. Sci-fi helps me think about the future of technology and its impact on society.",
            nextState: 'books_deep',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      goals_deep: {
        quickReplies: [
          { id: 'ai_interest', text: getQuickReply('bot', 'aiInterest') },
          { id: 'mentoring', text: getQuickReply('bot', 'mentoring') },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          ai_interest: {
            text: "AI/ML is fascinating! I'm particularly interested in how it can automate repetitive coding tasks, improve code quality, and help developers focus on creative problem-solving. I'm experimenting with AI code assistants and building tools that make development more efficient.",
            nextState: 'ai_deep',
          },
          mentoring: {
            text: "Mentoring is incredibly rewarding! I believe in hands-on guidance, code reviews, and creating a safe space for questions. I've helped junior developers grow from basic concepts to building full-stack applications. Seeing someone's 'aha!' moment is the best feeling!",
            nextState: 'mentoring_deep',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      // End states that loop back to main menu
      gaming_deep: {
        quickReplies: [
          {
            id: 'game_recommendations',
            text: getQuickReply('bot', 'gameRecommendations'),
          },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          game_recommendations: {
            text: "If you like strategy, try Civilization VI or Total War: Warhammer. For RPGs, Cyberpunk 2077 is amazing now! For indie games, check out Hades or Hollow Knight. Gaming teaches you problem-solving and user experience design - it's like interactive coding!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      books_deep: {
        quickReplies: [
          {
            id: 'book_recommendations',
            text: getQuickReply('bot', 'bookRecommendations'),
          },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          book_recommendations: {
            text: "Start with Isaac Asimov's Foundation series - it's about predicting the future with math! Then try Philip K. Dick's 'Do Androids Dream of Electric Sheep?' (Blade Runner). For modern sci-fi, 'The Three-Body Problem' trilogy is mind-blowing!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      ai_deep: {
        quickReplies: [
          { id: 'ai_projects', text: getQuickReply('bot', 'aiProjects') },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          ai_projects: {
            text: "I'm building an AI code reviewer that suggests improvements automatically! Also experimenting with LangChain to create intelligent documentation generators. The future is AI-assisted development - imagine having a coding partner that never gets tired and knows every library!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      mentoring_deep: {
        quickReplies: [
          { id: 'mentoring_tips', text: getQuickReply('bot', 'mentoringTips') },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          mentoring_tips: {
            text: "Be patient and encouraging! Start with small wins, celebrate progress, and always explain the 'why' behind decisions. Create a safe space for questions - there are no stupid questions! The best mentors are the ones who remember what it's like to be a beginner.",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      tech_deep: {
        quickReplies: [
          { id: 'react_tips', text: getQuickReply('bot', 'reactTips') },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          react_tips: {
            text: "Use TypeScript! It's a game-changer. Learn React Query for data fetching, Zustand for state management, and always use proper error boundaries. The React ecosystem moves fast, but the fundamentals stay the same. And remember: components should do one thing well!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      learning_deep: {
        quickReplies: [
          { id: 'learning_tips', text: getQuickReply('bot', 'learningTips') },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          learning_tips: {
            text: "Build projects! Don't just read tutorials - code along and then build something original. Join communities, contribute to open source, and don't be afraid to break things. The best way to learn is by doing. And remember: every expert was once a beginner!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      projects_deep: {
        quickReplies: [
          {
            id: 'project_showcase',
            text: getQuickReply('bot', 'projectShowcase'),
          },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          project_showcase: {
            text: "My collaborative code editor is my pride and joy! It's like Google Docs but for code - real-time editing, live cursors, syntax highlighting, and even voice chat. Built with React, Node.js, WebSockets, and a lot of coffee! It's used by 50+ developers daily.",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      challenges_deep: {
        quickReplies: [
          { id: 'scaling_tips', text: getQuickReply('bot', 'scalingTips') },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          scaling_tips: {
            text: 'Start with caching - Redis is your friend! Use CDNs for static assets, implement database indexing, and consider microservices for complex apps. Monitor everything with proper logging and metrics. And remember: premature optimization is the root of all evil!',
            nextState: 'welcome',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      achievements_deep: {
        quickReplies: [
          {
            id: 'leadership_tips',
            text: getQuickReply('bot', 'leadershipTips'),
          },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          leadership_tips: {
            text: "Lead by example! Be the first to arrive and the last to leave. Listen more than you speak, and always give credit where it's due. Create an environment where people feel safe to fail and learn. Great leaders make others feel like heroes!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      team_deep: {
        quickReplies: [
          { id: 'team_building', text: getQuickReply('bot', 'teamBuilding') },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          team_building: {
            text: 'Hire for culture fit and potential, not just skills. Encourage knowledge sharing through code reviews and pair programming. Celebrate wins together and learn from failures as a team. The best teams are diverse, inclusive, and supportive of each other!',
            nextState: 'welcome',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      collaboration: {
        quickReplies: [
          {
            id: 'collaboration_tips',
            text: getQuickReply('bot', 'collaborationTips'),
          },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          collaboration_tips: {
            text: 'Communication is key! Use tools like Slack, GitHub, and Figma to stay in sync. Set clear expectations, document everything, and be open to feedback. The best collaborations happen when everyone feels heard and valued!',
            nextState: 'welcome',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      hiring: {
        quickReplies: [
          { id: 'hiring_tips', text: getQuickReply('bot', 'hiringTips') },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          hiring_tips: {
            text: 'Look for passion and problem-solving skills, not just technical knowledge. Ask about their side projects and how they learn new technologies. The best developers are curious, adaptable, and always learning!',
            nextState: 'welcome',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      networking: {
        quickReplies: [
          {
            id: 'networking_tips',
            text: getQuickReply('bot', 'networkingTips'),
          },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          networking_tips: {
            text: "Be genuine and helpful! Share knowledge, contribute to open source, and attend meetups. Don't just network for job opportunities - build real relationships. The best connections happen when you're not looking for anything in return!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      fun_facts: {
        quickReplies: [
          { id: 'more_facts', text: getQuickReply('bot', 'moreFacts') },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          more_facts: {
            text: "I once fixed a critical bug in production while skydiving! 🪂 The adrenaline helped me think clearly. Also, I can recite the entire Lord of the Rings trilogy from memory, and I've never had a cup of coffee in my life - I run on pure code energy!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('bot', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
    },
  },
  sponsored: {
    id: 'sponsored',
    name: messages.solo.identity.name,
    avatar: messages.solo.identity.avatar,
    messages: [
      {
        sender: 'bot',
        text: messages.solo.identity.welcome,
        timestamp: getTimestamp('hoursAgo', 2),
      },
    ],
    initialState: 'welcome',
    states: {
      welcome: {
        quickReplies: [
          { id: 'adventures', text: getQuickReply('solo', 'adventures') },
          {
            id: 'millennium-falcon',
            text: getQuickReply('solo', 'millenniumFalcon'),
          },
          { id: 'chewbacca', text: getQuickReply('solo', 'chewbacca') },
          {
            id: 'rebel-alliance',
            text: getQuickReply('solo', 'rebelAlliance'),
          },
          { id: 'han-quote', text: getQuickReply('solo', 'hanQuote') },
        ],
        responses: {
          adventures: {
            text: getResponse('solo', 'adventures'),
            nextState: 'adventures_deep',
          },
          'millennium-falcon': {
            text: getResponse('solo', 'falcon'),
            nextState: 'falcon_deep',
          },
          chewbacca: {
            text: getResponse('solo', 'chewie'),
            nextState: 'chewie_deep',
          },
          'rebel-alliance': {
            text: getResponse('solo', 'rebellion'),
            nextState: 'rebel_deep',
          },
          'han-quote': {
            text: hanSoloQuotes.map(quote => `"${quote}" - Han Solo`),
            nextState: 'quotes_deep',
          },
        },
      },
      adventures_deep: {
        quickReplies: [
          { id: 'kessel_run', text: getQuickReply('solo', 'kesselRun') },
          {
            id: 'imperial_dodging',
            text: getQuickReply('solo', 'imperialDodging'),
          },
          {
            id: 'smuggling_tips',
            text: getQuickReply('solo', 'smugglingTips'),
          },
          { id: 'back', text: getQuickReply('bot', 'back') },
        ],
        responses: {
          kessel_run: {
            text: "The Kessel Run? That's my specialty! I made it in less than twelve parsecs. Most smugglers take longer routes, but I found a shortcut through the Maw - a cluster of black holes. Risky, but worth it! The Falcon's hyperdrive modifications made it possible.",
            nextState: 'kessel_deep',
          },
          imperial_dodging: {
            text: "You gotta be quick and unpredictable! I've got sensors that can detect Imperial ships from light-years away. Sometimes I hide in asteroid fields, other times I use solar flares to mask my signature. The key is never taking the same route twice!",
            nextState: 'imperial_deep',
          },
          smuggling_tips: {
            text: "First rule: trust no one, except Chewie. Second: always have a backup plan. Third: know your cargo - some things are worth more than others. Fourth: keep your ship in top condition. And fifth: never underestimate the Empire's persistence!",
            nextState: 'smuggling_deep',
          },
          back: {
            text: getResponse('solo', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      falcon_deep: {
        quickReplies: [
          { id: 'modifications', text: getQuickReply('solo', 'modifications') },
          { id: 'speed_secrets', text: getQuickReply('solo', 'speedSecrets') },
          { id: 'maintenance', text: getQuickReply('solo', 'maintenance') },
          { id: 'back', text: getQuickReply('bot', 'back') },
        ],
        responses: {
          modifications: {
            text: "I've modified her hyperdrive to be faster than anything the Empire has. Added military-grade deflector shields, upgraded the quad laser cannons, and installed a Class 0.5 hyperdrive. She's got more firepower than most Imperial fighters!",
            nextState: 'mods_deep',
          },
          speed_secrets: {
            text: "It's all about the hyperdrive modifications and knowing the right routes. I've stripped out unnecessary weight, optimized the power distribution, and installed experimental components. Plus, I know shortcuts through hyperspace that most pilots wouldn't dare try!",
            nextState: 'speed_deep',
          },
          maintenance: {
            text: "Chewie and I maintain her constantly! We check the hyperdrive every few runs, keep the shields calibrated, and make sure the weapons are always ready. A ship is only as good as its maintenance. We've got spare parts stashed all over the galaxy!",
            nextState: 'maintenance_deep',
          },
          back: {
            text: getResponse('solo', 'backToFalcon'),
            nextState: 'welcome',
          },
        },
      },
      chewie_deep: {
        quickReplies: [
          { id: 'how_met', text: getQuickReply('solo', 'howMet') },
          {
            id: 'wookiee_culture',
            text: getQuickReply('solo', 'wookieeCulture'),
          },
          { id: 'best_moments', text: getQuickReply('solo', 'bestMoments') },
          { id: 'back', text: getQuickReply('bot', 'back') },
        ],
        responses: {
          how_met: {
            text: "I met Chewie when I was working for Jabba the Hutt. He was enslaved, and I helped him escape. We've been partners ever since. He's saved my life more times than I can count, and I've done the same for him. That's what friendship is about!",
            nextState: 'meeting_deep',
          },
          wookiee_culture: {
            text: "Wookiees are incredibly loyal and honorable. They value family above all else and have a strong sense of justice. Chewie's got a life debt to me, but honestly, I think we'd be friends regardless. He's the most trustworthy being in the galaxy!",
            nextState: 'culture_deep',
          },
          best_moments: {
            text: "Too many to count! There was the time he ripped a stormtrooper's arms off, or when he fixed the hyperdrive mid-jump. But my favorite is just sitting in the cockpit, him growling about Imperial tactics while I plot our next move. He's family.",
            nextState: 'moments_deep',
          },
          back: {
            text: getResponse('solo', 'backToChewie'),
            nextState: 'welcome',
          },
        },
      },
      rebel_deep: {
        quickReplies: [
          { id: 'why_help', text: getQuickReply('solo', 'whyHelp') },
          { id: 'rebel_heroes', text: getQuickReply('solo', 'rebelHeroes') },
          {
            id: 'empire_opinion',
            text: getQuickReply('solo', 'empireOpinion'),
          },
          { id: 'back', text: getQuickReply('bot', 'back') },
        ],
        responses: {
          why_help: {
            text: "I started helping for the money, but now it's personal. The Empire destroyed my homeworld, enslaved my friends, and made life miserable for everyone. Sometimes you gotta pick a side, even if you're not the hero type. Freedom's worth fighting for.",
            nextState: 'motivation_deep',
          },
          rebel_heroes: {
            text: "Luke's got potential, though he's still green. Leia's got more guts than most soldiers I've met. And don't get me started on Obi-Wan - that old wizard taught me more than he'll ever know. But the real heroes are the everyday people fighting for freedom.",
            nextState: 'heroes_deep',
          },
          empire_opinion: {
            text: "The Empire? They're bullies with fancy toys. They think fear and intimidation will keep everyone in line, but they're wrong. People will always fight for freedom, and the Empire's too arrogant to see it coming. Their days are numbered!",
            nextState: 'empire_deep',
          },
          back: {
            text: getResponse('solo', 'backToRebellion'),
            nextState: 'welcome',
          },
        },
      },
      quotes_deep: {
        quickReplies: [
          { id: 'more_quotes', text: getQuickReply('solo', 'moreQuotes') },
          {
            id: 'favorite_quote',
            text: getQuickReply('solo', 'favoriteQuote'),
          },
          { id: 'quote_story', text: getQuickReply('solo', 'quoteStory') },
          { id: 'back', text: getQuickReply('bot', 'back') },
        ],
        responses: {
          more_quotes: {
            text: hanSoloQuotes.map(quote => `"${quote}" - Han Solo`),
            nextState: 'quotes_deep',
          },
          favorite_quote: {
            text: "My favorite? 'Never tell me the odds!' It sums up my whole philosophy. Life's about taking chances and not letting statistics stop you from doing what's right. Plus, it really annoys C-3PO!",
            nextState: 'favorite_deep',
          },
          quote_story: {
            text: "Well, 'I know' was my response to Leia when she said 'I love you.' Some people think I was being cold, but I was trying to be brave. I knew I might not make it back, and I wanted her to know I felt the same way. Sometimes the simplest words say the most.",
            nextState: 'story_deep',
          },
          back: {
            text: getResponse('solo', 'backToMenu'),
            nextState: 'welcome',
          },
        },
      },
      // End states that loop back to main menu
      kessel_deep: {
        quickReplies: [
          { id: 'kessel_tips', text: 'Any Kessel Run tips?' },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          kessel_tips: {
            text: "Know your ship inside and out! The Falcon's modifications are key - Class 0.5 hyperdrive, military-grade shields, and Chewie's expert navigation. Trust your instincts, but also trust your instruments. And remember: sometimes the shortest route isn't the safest!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('solo', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      imperial_deep: {
        quickReplies: [
          { id: 'imperial_tactics', text: 'Tell me about Imperial tactics!' },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          imperial_tactics: {
            text: "The Empire's predictable! They always follow protocol, use standard patrol routes, and rely too much on their superior numbers. The key is being unpredictable - change course randomly, use civilian traffic as cover, and never underestimate the power of a good bluff!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('solo', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      smuggling_deep: {
        quickReplies: [
          { id: 'smuggling_stories', text: 'Tell me a smuggling story!' },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          smuggling_stories: {
            text: "There was this time I smuggled a crate of Corellian wine past three Imperial checkpoints! I disguised it as engine coolant and had Chewie growl at the inspectors. They were so scared of him they didn't even check the cargo. Sometimes the best smuggling tool is a good Wookiee!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('solo', 'backToSection'),
            nextState: 'welcome',
          },
        },
      },
      mods_deep: {
        quickReplies: [
          {
            id: 'modification_stories',
            text: 'Tell me about the modifications!',
          },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          modification_stories: {
            text: "The hyperdrive modifications took months! I had to scavenge parts from three different Imperial ships and bribe a Bothan engineer to help install them. The shields came from a crashed Rebel transport, and the laser cannons... well, let's just say they're not exactly legal!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('solo', 'backToFalcon'),
            nextState: 'welcome',
          },
        },
      },
      speed_deep: {
        quickReplies: [
          { id: 'speed_secrets', text: 'More speed secrets!' },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          speed_secrets: {
            text: "The real secret isn't just the modifications - it's knowing hyperspace like the back of your hand! I've mapped routes that most pilots wouldn't dare try. The Falcon's got a personality too - she responds better to gentle handling than brute force. Treat her right, and she'll get you anywhere!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('solo', 'backToFalcon'),
            nextState: 'welcome',
          },
        },
      },
      maintenance_deep: {
        quickReplies: [
          { id: 'maintenance_stories', text: 'Tell me maintenance stories!' },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          maintenance_stories: {
            text: "Chewie and I have rebuilt the Falcon from scratch three times! Once after a crash on Hoth, once after a battle with Imperial fighters, and once when we had to replace the entire hyperdrive core. She's like a living thing - you have to understand her quirks and treat her with respect!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('solo', 'backToFalcon'),
            nextState: 'welcome',
          },
        },
      },
      meeting_deep: {
        quickReplies: [
          { id: 'jabba_story', text: 'Tell me about Jabba!' },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          jabba_story: {
            text: "Jabba the Hutt? He's a slimy, greedy slug who thinks he owns everyone! I worked for him for a while, but I couldn't stand seeing Chewie enslaved. So I helped him escape, and we've been partners ever since. Sometimes doing the right thing costs you everything, but it's worth it!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('solo', 'backToChewie'),
            nextState: 'welcome',
          },
        },
      },
      culture_deep: {
        quickReplies: [
          { id: 'wookiee_stories', text: 'Tell me Wookiee stories!' },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          wookiee_stories: {
            text: "Wookiees are incredible! They can rip your arms off, but they're also the most loyal friends you'll ever have. Chewie's saved my life more times than I can count, and I've done the same for him. That's what friendship is about - being there for each other, no matter what!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('solo', 'backToChewie'),
            nextState: 'welcome',
          },
        },
      },
      moments_deep: {
        quickReplies: [
          { id: 'best_moments', text: 'Tell me more best moments!' },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          best_moments: {
            text: "There was the time Chewie fixed the hyperdrive while we were being chased by Imperial fighters! Or when he carried me out of a burning building on Cloud City. But my favorite is just sitting in the cockpit, him growling about Imperial tactics while I plot our next move. He's family!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('solo', 'backToChewie'),
            nextState: 'welcome',
          },
        },
      },
      motivation_deep: {
        quickReplies: [
          { id: 'freedom_stories', text: 'Tell me about freedom!' },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          freedom_stories: {
            text: "Freedom isn't free! The Empire took everything from me - my homeworld, my friends, my way of life. But they can't take my spirit! Every time I help the Rebellion, I'm fighting for a galaxy where people can live without fear. That's worth fighting for!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('solo', 'backToRebellion'),
            nextState: 'welcome',
          },
        },
      },
      heroes_deep: {
        quickReplies: [
          { id: 'hero_stories', text: 'Tell me about the heroes!' },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          hero_stories: {
            text: "Luke's got the heart of a hero, even if he's still green. Leia's got more courage than most soldiers I've met. And Obi-Wan... that old wizard taught me more about doing the right thing than he'll ever know. But the real heroes are the everyday people fighting for freedom!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('solo', 'backToRebellion'),
            nextState: 'welcome',
          },
        },
      },
      empire_deep: {
        quickReplies: [
          { id: 'empire_stories', text: 'Tell me Empire stories!' },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          empire_stories: {
            text: "The Empire's built on fear and intimidation! They think having the biggest guns and the most ships makes them invincible. But they're wrong! People will always fight for freedom, and the Empire's too arrogant to see it coming. Their days are numbered!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('solo', 'backToRebellion'),
            nextState: 'welcome',
          },
        },
      },
      favorite_deep: {
        quickReplies: [
          { id: 'philosophy', text: 'Tell me about your philosophy!' },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          philosophy: {
            text: "Life's about taking chances and not letting the odds stop you from doing what's right! I've been called a scoundrel, a smuggler, even a hero. But I'm just a guy trying to do the right thing in a galaxy that doesn't make it easy. Sometimes you gotta trust your instincts!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('solo', 'backToQuotes'),
            nextState: 'welcome',
          },
        },
      },
      story_deep: {
        quickReplies: [
          { id: 'love_stories', text: 'Tell me about love!' },
          { id: 'back', text: getQuickReply('bot', 'goBack') },
        ],
        responses: {
          love_stories: {
            text: "Love's complicated! When Leia said 'I love you,' I knew I might not make it back. So I said 'I know' - not because I was being cold, but because I was trying to be brave. Sometimes the simplest words say the most. And sometimes love means letting someone go!",
            nextState: 'welcome',
          },
          back: {
            text: getResponse('solo', 'backToQuotes'),
            nextState: 'welcome',
          },
        },
      },
    },
  },
};
