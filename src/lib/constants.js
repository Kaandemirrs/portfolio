export const projects = [
  {
    id: 'rota-travel-planning-app',
    title: 'Rota - Travel Planning App',
    shortTitle: 'Rota',
    category: 'Mobile App',
    year: '2024',
    role: 'UI/UX Design + Mobile Development',
    source: 'Upwork',
    origin: 'Upwork freelance project',
    previewVariant: 'rota',
    overview:
      'A mobile travel planner designed to reduce friction across booking, itinerary creation, and trip coordination.',
    summary:
      'A streamlined mobile experience that brings planning, recommendations, and maps into a single travel flow.',
    liveUrl: 'https://testflight.apple.com/join/rota-demo',
    githubUrl: 'https://github.com/kaandemir/rota-travel-planning-app',
    quickStats: [
      { label: 'Duration', value: '8 weeks' },
      { label: 'Outcome', value: '47% less drop-off' },
      { label: 'Core tech', value: 'React Native' },
      { label: 'Source', value: 'Upwork' },
    ],
    problem: {
      tag: '01',
      title: 'Travel planning felt fragmented and too difficult to start.',
      points: [
        'Users had to switch between 5-6 different apps while planning a single trip.',
        '73% of new users dropped off on the first onboarding screen.',
        'The client said: "Users found the app confusing, so we wanted a much simpler flow."',
      ],
      narrative:
        'The challenge was not only to make the product look better, but to remove hesitation at the very first interaction and build trust fast.',
    },
    process: {
      tag: '02',
      title: 'The Process',
      stages: [
        'Research: 12 user interviews and competitor analysis',
        'Define: user persona creation and pain-point mapping',
        'Design: wireframes to high-fidelity Figma screens',
        'Prototype: Maze usability testing and iteration',
        'Build: React Native implementation with scalable components',
      ],
    },
    tools: ['Figma', 'Maze', 'Spline', 'React Native', 'Expo', 'TypeScript', 'Supabase'],
    solution: {
      tag: '03',
      title: 'A focused mobile flow built around one trip screen.',
      points: [
        'Trip planning, schedule details, and recommendations were unified into one core screen.',
        'A smart suggestion layer reduced the amount of manual user input.',
        'Offline mode supported travelers during unstable connections.',
        'The product centered around three key screens: Home, Create Plan, and Map.',
      ],
    },
    results: {
      tag: '04',
      title: 'The product became easier to start, easier to trust, and easier to keep using.',
      points: [
        'Drop-off decreased by 47%',
        'Session duration increased from 3 minutes to 8 minutes',
        'The app reached a 4.8 App Store rating',
        'Client feedback: "This is exactly what we wanted."',
      ],
    },
    learnings: [
      'User testing should happen at wireframe stage, not later.',
      'Simple navigation consistently wins over feature-heavy flows.',
      'Weekly client check-ins speed up decisions and reduce rework.',
    ],
    stack: {
      design: ['Figma', 'Spline', 'Maze'],
      development: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
    },
  },
  {
    id: 'learnlogicify-landing-page',
    title: 'Learnlogicify Landing Page',
    shortTitle: 'Learnlogicify',
    category: 'Web Design',
    year: '2025',
    role: 'Landing Page Design + Front-end Development',
    source: 'Personal Product',
    origin: 'Own product',
    previewVariant: 'learnlogicify',
    overview:
      'A conversion-focused landing page for a coding education product with clear hierarchy and modern visual blocks.',
    summary:
      'Built to present courses, increase clarity, and guide visitors toward action in a cleaner way.',
    liveUrl: 'https://learnlogicify.example.com',
    githubUrl: 'https://github.com/kaandemir/learnlogicify',
    quickStats: [
      { label: 'Duration', value: '4 weeks' },
      { label: 'Outcome', value: 'Higher CTA clarity' },
      { label: 'Core tech', value: 'React + Tailwind' },
      { label: 'Source', value: 'Personal' },
    ],
    problem: {
      tag: '01',
      title: 'The product needed a stronger first impression and clearer conversion flow.',
      points: [
        'Visitors could not quickly understand the value of the platform.',
        'The old structure did not prioritize course discovery well.',
        'The design needed more trust-building visual rhythm.',
      ],
      narrative:
        'The goal was to create a cleaner educational brand experience while keeping the content easy to scan.',
    },
    process: {
      tag: '02',
      title: 'The Process',
      stages: [
        'Research: reviewed competing edtech landing pages',
        'Define: identified trust and clarity as the main conversion blockers',
        'Design: created modular hero, stats, and content sections',
        'Prototype: validated layout rhythm and CTA placement',
        'Build: implemented the responsive front-end with reusable sections',
      ],
    },
    tools: ['Figma', 'React', 'Tailwind CSS', 'Vite'],
    solution: {
      tag: '03',
      title: 'A cleaner landing experience with stronger visual hierarchy.',
      points: [
        'The messaging was simplified into clear blocks.',
        'The CTA path became more visible and easier to follow.',
        'The supporting sections were redesigned to feel more structured and premium.',
      ],
    },
    results: {
      tag: '04',
      title: 'The brand presentation became more confident and easier to navigate.',
      points: [
        'The hero communicated the offer faster',
        'Course-related actions became more prominent',
        'The page felt more polished and conversion-oriented',
      ],
    },
    learnings: [
      'Educational products need immediate value communication.',
      'Readable layout beats decorative density.',
      'Strong CTA placement matters as much as the copy itself.',
    ],
    stack: {
      design: ['Figma'],
      development: ['React', 'Tailwind CSS', 'Vite'],
    },
  },
  {
    id: 'winzee-web-chat-application',
    title: 'Winzee Web Chat Application',
    shortTitle: 'Winzee',
    category: 'Web App',
    year: '2024',
    role: 'Brand UI + Front-end Development',
    source: 'Client Work',
    origin: 'Freelance product',
    previewVariant: 'winzee',
    overview:
      'A branded web chat concept focused on visual identity, fast interaction, and a memorable landing presence.',
    summary:
      'Designed to feel light, modern, and recognizable while keeping the product direction simple.',
    liveUrl: 'https://winzee.example.com',
    githubUrl: 'https://github.com/kaandemir/winzee-chat',
    quickStats: [
      { label: 'Duration', value: '5 weeks' },
      { label: 'Outcome', value: 'Stronger brand recall' },
      { label: 'Core tech', value: 'React' },
      { label: 'Source', value: 'Client' },
    ],
    problem: {
      tag: '01',
      title: 'The interface needed personality without losing usability.',
      points: [
        'The product lacked a distinct visual signature.',
        'The early interface felt generic and forgettable.',
        'The user journey needed to stay fast despite a more expressive style.',
      ],
      narrative:
        'The challenge was balancing playful visuals with a clean interaction structure.',
    },
    process: {
      tag: '02',
      title: 'The Process',
      stages: [
        'Research: reviewed chat product benchmarks',
        'Define: identified brand memorability as a core goal',
        'Design: built a soft-gradient visual direction',
        'Prototype: tested simpler hierarchy and display states',
        'Build: implemented responsive interface sections',
      ],
    },
    tools: ['Figma', 'React', 'Tailwind CSS'],
    solution: {
      tag: '03',
      title: 'A more expressive front-end with simplified interaction layers.',
      points: [
        'The brand identity became more memorable through color and scale.',
        'The layout was kept focused with fewer distractions.',
        'The responsive structure preserved the hero impact across sizes.',
      ],
    },
    results: {
      tag: '04',
      title: 'The product direction became both more recognizable and more usable.',
      points: [
        'The first screen carried more personality',
        'The overall direction felt more intentional',
        'The UI stayed simple while looking more premium',
      ],
    },
    learnings: [
      'Brand expression works best when interaction remains simple.',
      'Contrast and spacing shape perceived product quality.',
      'A focused visual identity can reduce product ambiguity.',
    ],
    stack: {
      design: ['Figma'],
      development: ['React', 'Tailwind CSS'],
    },
  },
  {
    id: 'gemini-clone',
    title: 'Gemini Clone',
    shortTitle: 'Gemini',
    category: 'AI Experience',
    year: '2024',
    role: 'UI Design + Front-end Development',
    source: 'Personal Product',
    origin: 'Own product',
    previewVariant: 'gemini',
    overview:
      'A conversational AI interface exploration focused on minimal layout, motion, and product atmosphere.',
    summary:
      'Built as a clean AI product study that prioritizes clarity, responsive structure, and polished visual mood.',
    liveUrl: 'https://gemini-clone.example.com',
    githubUrl: 'https://github.com/kaandemir/gemini-clone',
    quickStats: [
      { label: 'Duration', value: '3 weeks' },
      { label: 'Outcome', value: 'Fast prototype' },
      { label: 'Core tech', value: 'React' },
      { label: 'Source', value: 'Personal' },
    ],
    problem: {
      tag: '01',
      title: 'The goal was to recreate an AI product feel without losing responsiveness.',
      points: [
        'The interface needed to feel premium without becoming visually heavy.',
        'The conversational layout had to remain simple across breakpoints.',
        'The product required a believable AI atmosphere.',
      ],
      narrative:
        'This project was shaped as a front-end study around balance, mood, and interaction cleanliness.',
    },
    process: {
      tag: '02',
      title: 'The Process',
      stages: [
        'Research: reviewed conversational AI interaction patterns',
        'Define: focused on clarity, spacing, and atmosphere',
        'Design: built dark UI directions and supporting visual accents',
        'Prototype: refined card, text, and response areas',
        'Build: implemented a reusable React-based interface',
      ],
    },
    tools: ['Figma', 'React', 'Tailwind CSS', 'Vite'],
    solution: {
      tag: '03',
      title: 'A minimal interface with stronger visual rhythm and cleaner messaging zones.',
      points: [
        'The UI emphasized focus through controlled spacing and contrast.',
        'The layout became easier to scale between mobile and desktop.',
        'The design captured a lightweight AI product feeling.',
      ],
    },
    results: {
      tag: '04',
      title: 'The final result felt more complete as a product concept and front-end study.',
      points: [
        'The design direction became more cohesive',
        'The interface remained responsive across devices',
        'The prototype served as a stronger portfolio piece',
      ],
    },
    learnings: [
      'Atmosphere matters in AI interfaces as much as utility.',
      'Dark themes need careful spacing and contrast control.',
      'Simple structures scale faster in iterative builds.',
    ],
    stack: {
      design: ['Figma'],
      development: ['React', 'Tailwind CSS', 'Vite'],
    },
  },
]

export const skills = [
  {
    group: 'design',
    items: ['UI Design', 'UX Thinking', 'Wireframing'],
  },
  {
    group: 'development',
    items: ['React', 'Tailwind CSS', 'JavaScript'],
  },
]
