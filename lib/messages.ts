/**
 * Centralized Message System
 * Single source of truth for all text content in the application
 */

export const messages = {
  bot: {
    identity: {
      id: 'bot',
      name: "Syazani's Assistant",
      avatar: '/acak.jpg',
      welcome:
        "Hi! I'm Syazani. Ask me anything about my work, skills, or experience. I'll answer directly here.",
    },
    quickReplies: {
      // Welcome state
      who: 'Who are you?',
      skills: 'What are your skills?',
      experience: "What's your experience?",
      contact: 'How do I contact you?',

      // About me state
      hobbies: 'What are your hobbies?',
      goals: 'What are your career goals?',
      funFact: 'Tell me a fun fact about you!',

      // Skills deep state
      favoriteTech: "What's your favorite technology?",
      learning: 'What are you learning now?',
      projects: 'Tell me about your projects!',

      // Experience deep state
      challenges: 'What was your biggest challenge?',
      achievements: 'What are you most proud of?',
      teamWork: 'Tell me about teamwork!',

      // Contact deep state
      collaborate: 'Want to collaborate?',
      hire: 'Are you available for work?',
      network: "Let's network!",

      // Hobbies deep state
      gaming: 'What games do you play?',
      books: 'Favorite sci-fi books?',

      // Goals deep state
      aiInterest: 'Tell me about AI/ML!',
      mentoring: 'How do you mentor?',

      // Deep dive states
      gameRecommendations: 'Any game recommendations?',
      bookRecommendations: 'Any book recommendations?',
      aiProjects: 'Tell me about your AI projects!',
      mentoringTips: 'Any mentoring tips?',
      reactTips: 'Any React tips?',
      learningTips: 'Any learning tips?',
      projectShowcase: 'Show me your best project!',
      scalingTips: 'Any scaling tips?',
      leadershipTips: 'Any leadership tips?',
      teamBuilding: 'How do you build great teams?',
      collaborationTips: 'Any collaboration tips?',
      hiringTips: 'Any hiring tips?',
      networkingTips: 'Any networking tips?',
      moreFacts: 'Tell me more fun facts!',

      // Common
      back: 'Go back to main menu',
      goBack: 'Go back',
    },
    responses: {
      // Welcome responses
      whoAmI:
        "I'm Syazani Zulkhairi, a passionate software engineer specializing in full-stack development. I love creating innovative solutions and working with modern technologies like React, Node.js, and cloud platforms.",
      mySkills:
        "I'm skilled in React, Next.js, Node.js, TypeScript, Java, Python, and various cloud platforms like AWS and Azure. I also have experience with mobile app development and enjoy working on both frontend and backend projects.",
      myExperience:
        "I have several years of experience in software development, working on various projects from web applications to mobile apps. I've worked with different teams and technologies, always focusing on delivering quality solutions.",
      contactInfo:
        "You can reach me through LinkedIn, email, or connect with me here! I'm always interested in discussing new opportunities and interesting projects.",

      // About me responses
      myHobbies:
        "I love coding (obviously! 😄), but I also enjoy gaming, reading sci-fi novels, and exploring new technologies. When I'm not coding, you might find me playing strategy games or learning about the latest AI developments.",
      myGoals:
        "My goal is to become a tech lead and eventually a CTO. I want to build amazing products that solve real-world problems and mentor other developers along the way. I'm particularly interested in AI/ML and how it can revolutionize software development.",
      funFact:
        'Fun fact: I once debugged a production issue while on a roller coaster! 🎢 The adrenaline actually helped me think more clearly. Also, I can type 120+ WPM, which comes in handy when coding!',

      // Skills deep responses
      favoriteTech:
        "React is definitely my favorite! I love how it makes building interactive UIs so intuitive. But I'm also really excited about Next.js 14+ with its app router and server components. TypeScript is a close second - it's like having a safety net for your code!",
      currentLearning:
        "Right now I'm diving deep into AI/ML with Python, exploring LangChain for building AI applications, and getting better at system design. I'm also experimenting with WebAssembly and Rust for performance-critical applications.",
      myProjects:
        "I've built everything from e-commerce platforms to real-time chat applications! My favorite project was a collaborative code editor with live cursors (like Google Docs but for code). Currently working on an AI-powered code review tool that suggests improvements automatically!",

      // Experience deep responses
      biggestChallenge:
        'My biggest challenge was scaling a web application from 100 to 100,000+ users in just 6 months! We had to completely redesign the architecture, implement caching strategies, and optimize database queries. It was intense but incredibly rewarding!',
      proudestAchievement:
        "I'm most proud of leading a team of 5 developers to build a real-time collaboration platform that's now used by 50+ companies. We went from concept to MVP in 3 months, and the feedback has been amazing!",
      teamworkPhilosophy:
        "I love working in teams! I believe the best code comes from collaboration and diverse perspectives. I've mentored junior developers and learned so much from senior engineers. Code reviews are my favorite part - they're like mini-lessons!",

      // Contact deep responses
      collaborationInterest:
        "Absolutely! I'm always excited about new projects and collaborations. Whether it's open source, side projects, or innovative ideas - count me in! What did you have in mind?",
      availability:
        "I'm currently open to new opportunities! I'm looking for roles where I can make a real impact, work with cutting-edge technologies, and grow as a developer. Full-stack, frontend, or backend - I'm flexible!",
      networkingInterest:
        "I'd love to connect! I'm always interested in meeting fellow developers, sharing knowledge, and learning about different approaches to problem-solving. Let's exchange ideas!",

      // Deep dive responses
      gamingDetails:
        'I love strategy games like Civilization VI and Total War series! Also into RPGs like Cyberpunk 2077 and indie games. Gaming actually helps me think about user experience and problem-solving in different ways.',
      booksDetails:
        "I'm a huge fan of Isaac Asimov's Foundation series and Philip K. Dick's work! Currently reading 'The Three-Body Problem' trilogy. Sci-fi helps me think about the future of technology and its impact on society.",
      aiDetails:
        "AI/ML is fascinating! I'm particularly interested in how it can automate repetitive coding tasks, improve code quality, and help developers focus on creative problem-solving. I'm experimenting with AI code assistants and building tools that make development more efficient.",
      mentoringDetails:
        "Mentoring is incredibly rewarding! I believe in hands-on guidance, code reviews, and creating a safe space for questions. I've helped junior developers grow from basic concepts to building full-stack applications. Seeing someone's 'aha!' moment is the best feeling!",

      // Tips and recommendations
      gameRecommendations:
        "If you like strategy, try Civilization VI or Total War: Warhammer. For RPGs, Cyberpunk 2077 is amazing now! For indie games, check out Hades or Hollow Knight. Gaming teaches you problem-solving and user experience design - it's like interactive coding!",
      bookRecommendations:
        "Start with Isaac Asimov's Foundation series - it's about predicting the future with math! Then try Philip K. Dick's 'Do Androids Dream of Electric Sheep?' (Blade Runner). For modern sci-fi, 'The Three-Body Problem' trilogy is mind-blowing!",
      aiProjectsDetails:
        "I'm building an AI code reviewer that suggests improvements automatically! Also experimenting with LangChain to create intelligent documentation generators. The future is AI-assisted development - imagine having a coding partner that never gets tired and knows every library!",
      mentoringTips:
        "Be patient and encouraging! Start with small wins, celebrate progress, and always explain the 'why' behind decisions. Create a safe space for questions - there are no stupid questions! The best mentors are the ones who remember what it's like to be a beginner.",
      reactTips:
        "Use TypeScript! It's a game-changer. Learn React Query for data fetching, Zustand for state management, and always use proper error boundaries. The React ecosystem moves fast, but the fundamentals stay the same. And remember: components should do one thing well!",
      learningTips:
        "Build projects! Don't just read tutorials - code along and then build something original. Join communities, contribute to open source, and don't be afraid to break things. The best way to learn is by doing. And remember: every expert was once a beginner!",
      projectShowcase:
        "My collaborative code editor is my pride and joy! It's like Google Docs but for code - real-time editing, live cursors, syntax highlighting, and even voice chat. Built with React, Node.js, WebSockets, and a lot of coffee! It's used by 50+ developers daily.",
      scalingTips:
        'Start with caching - Redis is your friend! Use CDNs for static assets, implement database indexing, and consider microservices for complex apps. Monitor everything with proper logging and metrics. And remember: premature optimization is the root of all evil!',
      leadershipTips:
        "Lead by example! Be the first to arrive and the last to leave. Listen more than you speak, and always give credit where it's due. Create an environment where people feel safe to fail and learn. Great leaders make others feel like heroes!",
      teamBuildingTips:
        'Hire for culture fit and potential, not just skills. Encourage knowledge sharing through code reviews and pair programming. Celebrate wins together and learn from failures as a team. The best teams are diverse, inclusive, and supportive of each other!',
      collaborationTips:
        'Communication is key! Use tools like Slack, GitHub, and Figma to stay in sync. Set clear expectations, document everything, and be open to feedback. The best collaborations happen when everyone feels heard and valued!',
      hiringTips:
        'Look for passion and problem-solving skills, not just technical knowledge. Ask about their side projects and how they learn new technologies. The best developers are curious, adaptable, and always learning!',
      networkingTips:
        "Be genuine and helpful! Share knowledge, contribute to open source, and attend meetups. Don't just network for job opportunities - build real relationships. The best connections happen when you're not looking for anything in return!",
      moreFunFacts:
        "I once fixed a critical bug in production while skydiving! 🪂 The adrenaline helped me think clearly. Also, I can recite the entire Lord of the Rings trilogy from memory, and I've never had a cup of coffee in my life - I run on pure code energy!",

      // Generic responses
      backToMenu: 'Sure! What else would you like to know about me?',
      backToSection: 'What else would you like to know about me?',
    },
  },
  solo: {
    identity: {
      id: 'sponsored',
      name: 'Solo',
      avatar: '/han-solo.jpg',
      welcome:
        "Hey there! I'm Solo. I noticed you're interested in Star Wars. How can I help you today?",
    },
    quickReplies: {
      // Welcome state
      adventures: 'Tell me about your adventures',
      millenniumFalcon: 'Tell me about the Millennium Falcon',
      chewbacca: 'Tell me about Chewbacca',
      rebelAlliance: 'Tell me about the Rebel Alliance',
      hanQuote: 'Give me a random Han Solo quote',

      // Adventures deep
      kesselRun: 'Tell me about the Kessel Run!',
      imperialDodging: 'How do you dodge Imperial patrols?',
      smugglingTips: 'Any smuggling tips?',

      // Falcon deep
      modifications: 'What modifications did you make?',
      speedSecrets: 'What makes her so fast?',
      maintenance: 'How do you maintain her?',

      // Chewie deep
      howMet: 'How did you meet Chewie?',
      wookieeCulture: 'Tell me about Wookiee culture!',
      bestMoments: 'Best moments with Chewie?',

      // Rebel deep
      whyHelp: 'Why do you help the Rebellion?',
      rebelHeroes: 'Tell me about Rebel heroes!',
      empireOpinion: 'What do you think of the Empire?',

      // Quotes deep
      moreQuotes: 'Give me another quote!',
      favoriteQuote: "What's your favorite quote?",
      quoteStory: 'Tell me the story behind a quote!',

      // Deep dive states
      kesselTips: 'Any Kessel Run tips?',
      imperialTactics: 'Tell me about Imperial tactics!',
      smugglingStories: 'Tell me a smuggling story!',
      modificationStories: 'Tell me about the modifications!',
      speedSecretsTips: 'More speed secrets!',
      maintenanceStories: 'Tell me maintenance stories!',
      jabbaStory: 'Tell me about Jabba!',
      wookieeStories: 'Tell me Wookiee stories!',
      bestMomentsMore: 'Tell me more best moments!',
      freedomStories: 'Tell me about freedom!',
      heroStories: 'Tell me about the heroes!',
      empireStories: 'Tell me Empire stories!',
      philosophy: 'Tell me about your philosophy!',
      loveStories: 'Tell me about love!',

      // Common
      back: 'Go back to main menu',
      goBack: 'Go back',
    },
    responses: {
      // Welcome responses
      adventures:
        "Well, I've been smuggling spice across the galaxy, dodging Imperial patrols, and making the Kessel Run in less than twelve parsecs. It's been quite the adventure!",
      falcon:
        "The Millennium Falcon? She's the fastest ship in the galaxy! Made the Kessel Run in less than twelve parsecs. She may not look like much, but she's got it where it counts, kid.",
      chewie:
        "Chewie? He's my co-pilot and best friend. Loyal as they come, and don't let his appearance fool you - he's a great shot with a bowcaster!",
      rebellion:
        "The Rebel Alliance? They're fighting against the Empire for freedom across the galaxy. I've been helping them out when I can, though I prefer to stay independent.",

      // Adventures deep responses
      kesselRunDetails:
        "The Kessel Run? That's my specialty! I made it in less than twelve parsecs. Most smugglers take longer routes, but I found a shortcut through the Maw - a cluster of black holes. Risky, but worth it! The Falcon's hyperdrive modifications made it possible.",
      imperialDodgingDetails:
        "You gotta be quick and unpredictable! I've got sensors that can detect Imperial ships from light-years away. Sometimes I hide in asteroid fields, other times I use solar flares to mask my signature. The key is never taking the same route twice!",
      smugglingTipsDetails:
        "First rule: trust no one, except Chewie. Second: always have a backup plan. Third: know your cargo - some things are worth more than others. Fourth: keep your ship in top condition. And fifth: never underestimate the Empire's persistence!",

      // Falcon deep responses
      modificationsDetails:
        "I've modified her hyperdrive to be faster than anything the Empire has. Added military-grade deflector shields, upgraded the quad laser cannons, and installed a Class 0.5 hyperdrive. She's got more firepower than most Imperial fighters!",
      speedSecretsDetails:
        "It's all about the hyperdrive modifications and knowing the right routes. I've stripped out unnecessary weight, optimized the power distribution, and installed experimental components. Plus, I know shortcuts through hyperspace that most pilots wouldn't dare try!",
      maintenanceDetails:
        "Chewie and I maintain her constantly! We check the hyperdrive every few runs, keep the shields calibrated, and make sure the weapons are always ready. A ship is only as good as its maintenance. We've got spare parts stashed all over the galaxy!",

      // Chewie deep responses
      howMetChewie:
        "I met Chewie when I was working for Jabba the Hutt. He was enslaved, and I helped him escape. We've been partners ever since. He's saved my life more times than I can count, and I've done the same for him. That's what friendship is about!",
      wookieeCultureDetails:
        "Wookiees are incredibly loyal and honorable. They value family above all else and have a strong sense of justice. Chewie's got a life debt to me, but honestly, I think we'd be friends regardless. He's the most trustworthy being in the galaxy!",
      bestMomentsDetails:
        "Too many to count! There was the time he ripped a stormtrooper's arms off, or when he fixed the hyperdrive mid-jump. But my favorite is just sitting in the cockpit, him growling about Imperial tactics while I plot our next move. He's family.",

      // Rebel deep responses
      whyHelpRebellion:
        "I started helping for the money, but now it's personal. The Empire destroyed my homeworld, enslaved my friends, and made life miserable for everyone. Sometimes you gotta pick a side, even if you're not the hero type. Freedom's worth fighting for.",
      rebelHeroesDetails:
        "Luke's got potential, though he's still green. Leia's got more guts than most soldiers I've met. And don't get me started on Obi-Wan - that old wizard taught me more than he'll ever know. But the real heroes are the everyday people fighting for freedom.",
      empireOpinionDetails:
        "The Empire? They're bullies with fancy toys. They think fear and intimidation will keep everyone in line, but they're wrong. People will always fight for freedom, and the Empire's too arrogant to see it coming. Their days are numbered!",

      // Quotes deep responses
      favoriteQuoteDetails:
        "My favorite? 'Never tell me the odds!' It sums up my whole philosophy. Life's about taking chances and not letting statistics stop you from doing what's right. Plus, it really annoys C-3PO!",
      quoteStoryDetails:
        "Well, 'I know' was my response to Leia when she said 'I love you.' Some people think I was being cold, but I was trying to be brave. I knew I might not make it back, and I wanted her to know I felt the same way. Sometimes the simplest words say the most.",

      // Deep dive responses
      kesselTips:
        "Know your ship inside and out! The Falcon's modifications are key - Class 0.5 hyperdrive, military-grade shields, and Chewie's expert navigation. Trust your instincts, but also trust your instruments. And remember: sometimes the shortest route isn't the safest!",
      imperialTactics:
        "The Empire's predictable! They always follow protocol, use standard patrol routes, and rely too much on their superior numbers. The key is being unpredictable - change course randomly, use civilian traffic as cover, and never underestimate the power of a good bluff!",
      smugglingStories:
        "There was this time I smuggled a crate of Corellian wine past three Imperial checkpoints! I disguised it as engine coolant and had Chewie growl at the inspectors. They were so scared of him they didn't even check the cargo. Sometimes the best smuggling tool is a good Wookiee!",
      modificationStories:
        "The hyperdrive modifications took months! I had to scavenge parts from three different Imperial ships and bribe a Bothan engineer to help install them. The shields came from a crashed Rebel transport, and the laser cannons... well, let's just say they're not exactly legal!",
      speedSecretsTips:
        "The real secret isn't just the modifications - it's knowing hyperspace like the back of your hand! I've mapped routes that most pilots wouldn't dare try. The Falcon's got a personality too - she responds better to gentle handling than brute force. Treat her right, and she'll get you anywhere!",
      maintenanceStories:
        "Chewie and I have rebuilt the Falcon from scratch three times! Once after a crash on Hoth, once after a battle with Imperial fighters, and once when we had to replace the entire hyperdrive core. She's like a living thing - you have to understand her quirks and treat her with respect!",
      jabbaStory:
        "Jabba the Hutt? He's a slimy, greedy slug who thinks he owns everyone! I worked for him for a while, but I couldn't stand seeing Chewie enslaved. So I helped him escape, and we've been partners ever since. Sometimes doing the right thing costs you everything, but it's worth it!",
      wookieeStories:
        "Wookiees are incredible! They can rip your arms off, but they're also the most loyal friends you'll ever have. Chewie's saved my life more times than I can count, and I've done the same for him. That's what friendship is about - being there for each other, no matter what!",
      bestMomentsMore:
        "There was the time Chewie fixed the hyperdrive while we were being chased by Imperial fighters! Or when he carried me out of a burning building on Cloud City. But my favorite is just sitting in the cockpit, him growling about Imperial tactics while I plot our next move. He's family!",
      freedomStories:
        "Freedom isn't free! The Empire took everything from me - my homeworld, my friends, my way of life. But they can't take my spirit! Every time I help the Rebellion, I'm fighting for a galaxy where people can live without fear. That's worth fighting for!",
      heroStories:
        "Luke's got the heart of a hero, even if he's still green. Leia's got more courage than most soldiers I've met. And Obi-Wan... that old wizard taught me more about doing the right thing than he'll ever know. But the real heroes are the everyday people fighting for freedom!",
      empireStories:
        "The Empire's built on fear and intimidation! They think having the biggest guns and the most ships makes them invincible. But they're wrong! People will always fight for freedom, and the Empire's too arrogant to see it coming. Their days are numbered!",
      philosophy:
        "Life's about taking chances and not letting the odds stop you from doing what's right! I've been called a scoundrel, a smuggler, even a hero. But I'm just a guy trying to do the right thing in a galaxy that doesn't make it easy. Sometimes you gotta trust your instincts!",
      loveStories:
        "Love's complicated! When Leia said 'I love you,' I knew I might not make it back. So I said 'I know' - not because I was being cold, but because I was trying to be brave. Sometimes the simplest words say the most. And sometimes love means letting someone go!",

      // Generic responses
      backToMenu: 'What else would you like to know about Han Solo?',
      backToSection: 'What else would you like to know about my adventures?',
      backToFalcon: 'What else would you like to know about the Falcon?',
      backToChewie: 'What else would you like to know about Chewie?',
      backToRebellion: 'What else would you like to know about the Rebellion?',
      backToQuotes: 'What else would you like to know about Han Solo quotes?',
    },
  },
  ui: {
    timestamps: {
      justNow: 'Just now',
      hoursAgo: (hours: number) => `${hours} hours ago`,
      daysAgo: (days: number) => `${days} days ago`,
    },
    chatList: {
      searchPlaceholder: 'Search messages',
      focusedTab: 'Focused',
      otherTab: 'Other',
    },
  },
} as const;

// Helper functions for accessing messages
export const getMessage = (
  conversation: 'bot' | 'solo',
  category: 'identity' | 'quickReplies' | 'responses',
  key: string
): string => {
  const value = (messages[conversation]?.[category] as any)?.[key];
  if (typeof value === 'string') {
    return value;
  }
  return '';
};

export const getIdentity = (conversation: 'bot' | 'solo') => {
  return messages[conversation].identity;
};

export const getQuickReply = (
  conversation: 'bot' | 'solo',
  key: string
): string => {
  return (messages[conversation].quickReplies as any)[key] || '';
};

export const getResponse = (
  conversation: 'bot' | 'solo',
  key: string
): string => {
  return (messages[conversation].responses as any)[key] || '';
};

export const getTimestamp = (
  type: 'justNow' | 'hoursAgo' | 'daysAgo',
  value?: number
): string => {
  const timestamp = messages.ui.timestamps[type];
  if (typeof timestamp === 'function' && value !== undefined) {
    return timestamp(value);
  }
  if (typeof timestamp === 'string') {
    return timestamp;
  }
  return '';
};
