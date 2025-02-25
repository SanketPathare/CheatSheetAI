const topics = {
  HTML: ["HTML5", "CSS3", "Bootstrap", "Responsive Design", "Accessibility"],
  CSS: ["Flexbox", "Grid", "Animations", "Transitions", "CSS Modules"],
  JavaScript: ["React", "Node.js", "Express", "Data Structures", "Algorithms"],
  React: ["Hooks", "Redux", "React Router", "State Management", "Testing"],
  Redux: ["Actions", "Reducers", "Middleware", "Async Actions", "React-Redux"],
  TailwindCSS: [
    "Utility Classes",
    "Components",
    "Variants",
    "Plugins",
    "Themes",
  ],
  NextJs: [
    "Static Generation",
    "Server-Side Rendering",
    "API Integration",
    "Deployment",
  ],
  Express: [
    "Routing",
    "Middleware",
    "Database Integration",
    "Authentication",
    "Deployment",
  ],

  TypeScript: ["React", "Node.js", "Express", "TypeScript", "Testing"],
  MongoDB: [
    "NoSQL",
    "Query Optimization",
    "Indexing",
    "Security",
    "Data Modeling",
  ],
  MySQL: ["SQL", "Query Optimization", "Indexing", "Security", "Data Modeling"],
  PostgreSQL: [
    "SQL",
    "Query Optimization",
    "Indexing",
    "Security",
    "Data Modeling",
  ],
  Django: ["Django", "ORM", "Views", "Templates", "Deployment"],

  Python: [
    "Machine Learning",
    "Data Analysis",
    "Web Scraping",
    "Neural Networks",
    "Natural Language Processing",
  ],
  Java: [
    "Spring Boot",
    "Android Development",
    "Multithreading",
    "Design Patterns",
    "JVM Optimization",
  ],
  Rust: [
    "Memory Safety",
    "Concurrency",
    "Systems Programming",
    "WebAssembly",
    "Game Development",
  ],
  Go: [
    "Microservices",
    "Concurrency",
    "Web Services",
    "Docker Integration",
    "Performance Optimization",
  ],
  "C++": [
    "Concurrency",
    "Multithreading",
    "Memory Management",
    "Performance Optimization",
    "Game Development",
  ],
  Kotlin: [
    "Coroutines",
    "Kotlin Multiplatform",
    "Data Binding",
    "Navigation Components",
    "Testing",
  ],
  Swift: [
    "Concurrency",
    "SwiftUI",
    "Combine",
    "Networking",
    "Performance Optimization",
  ],
  "Kotlin/Native": [
    "Kotlin Multiplatform",
    "Concurrency",
    "Concurrency with Kotlin/Native",
    "Concurrency with Swift",
    "Testing",
  ],
  "C#": [
    ".NET Core",
    "Entity Framework Core",
    "Blazor",
    "Testing",
    "Performance Optimization",
  ],
  Dart: [
    "Flutter",
    "Dartium",
    "State Management",
    "Testing",
    "Performance Optimization",
  ],
  Flutter: [
    "Flutter",
    "Dartium",
    "State Management",
    "Testing",
    "Performance Optimization",
  ],
  ReasonML: [
    "Reason",
    "ReasonReact",
    "Reason GraphQL",
    "Testing",
    "Performance Optimization",
  ],
  Elixir: ["Phoenix", "Ecto", "GraphQL", "Testing", "Performance Optimization"],
  Clojure: [
    "ClojureScript",
    "Reagent",
    "GraphQL",
    "Testing",
    "Performance Optimization",
  ],
  Scala: [
    "Play Framework",
    "Akka",
    "GraphQL",
    "Testing",
    "Performance Optimization",
  ],
  "F#": ["F# Core", "F# Web", "GraphQL", "Testing", "Performance Optimization"],
  Haskell: [
    "Servant",
    "Haskell-Nix",
    "GraphQL",
    "Testing",
    "Performance Optimization",
  ],
  Elm: [
    "Elm Platform",
    "Elm-GraphQL",
    "GraphQL",
    "Testing",
    "Performance Optimization",
  ],
  Julia: ["Julia", "JuliaDB", "GraphQL", "Testing", "Performance Optimization"],
  R: [
    "R Shiny",
    "R Markdown",
    "GraphQL",
    "Testing",
    "Performance Optimization",
  ],
  Lua: ["Lua", "Lapis", "GraphQL", "Testing", "Performance Optimization"],
  Crystal: [
    "Crystal",
    "Granite",
    "GraphQL",
    "Testing",
    "Performance Optimization",
  ],
  SwiftUI: [
    "SwiftUI",
    "Combine",
    "GraphQL",
    "Testing",
    "Performance Optimization",
  ],
  "Kotlin/JS": ["Kotlin/JS", "React", "TypeScript", "GraphQL", "Testing"],
  ReasonReact: [
    "ReasonReact",
    "Reason GraphQL",
    "GraphQL",
    "Testing",
    "Performance Optimization",
  ],
  "ReasonML/ReasonReact": [
    "ReasonML",
    "ReasonReact",
    "Reason GraphQL",
    "Testing",
    "Performance Optimization",
  ],
  "SwiftUI/Combine": [
    "SwiftUI",
    "Combine",
    "GraphQL",
    "Testing",
    "Performance Optimization",
  ],
  DevOps: [
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Infrastructure as Code",
    "Monitoring",
  ],

  AWS: ["Lambda", "S3", "EC2", "DynamoDB", "CloudFormation"],

  Azure: [
    "Azure Functions",
    "Cosmos DB",
    "Virtual Machines",
    "App Service",
    "Azure DevOps",
  ],

  GraphQL: ["Schemas", "Resolvers", "Apollo", "Subscriptions", "Federation"],

  Testing: ["Jest", "Cypress", "Mocha", "TDD", "E2E Testing"],

  Security: [
    "Authentication",
    "Authorization",
    "OWASP",
    "Encryption",
    "Penetration Testing",
  ],

  WebAssembly: [
    "Rust to WASM",
    "Performance Optimization",
    "Browser Integration",
    "Tools",
    "Use Cases",
  ],

  MachineLearning: [
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Neural Networks",
    "Natural Language Processing",
  ],

  DataScience: [
    "Pandas",
    "NumPy",
    "Data Visualization",
    "Jupyter",
    "Statistical Analysis",
  ],

  MobileAppDevelopment: [
    "React Native",
    "Ionic",
    "PWA",
    "App Store Optimization",
    "Cross-platform Development",
  ],

  BlockchainDevelopment: [
    "Smart Contracts",
    "Ethereum",
    "Solidity",
    "Web3.js",
    "Decentralized Applications",
  ],

  VR_AR: ["Unity", "A-Frame", "Three.js", "WebXR", "Spatial Computing"],

  IoT: ["Arduino", "Raspberry Pi", "MQTT", "Sensors", "Edge Computing"],

  AgileMethodologies: [
    "Scrum",
    "Kanban",
    "Sprint Planning",
    "Retrospectives",
    "Story Points",
  ],

  UIDesign: [
    "Figma",
    "User Research",
    "Prototyping",
    "Accessibility",
    "Design Systems",
  ],

  Firebase: [
    "Firestore",
    "Authentication",
    "Cloud Functions",
    "Realtime Database",
    "Hosting",
  ],

  Svelte: [
    "Reactivity",
    "Stores",
    "Transitions",
    "SvelteKit",
    "Component Composition",
  ],

  Vue: ["Vue 3", "Composition API", "Vuex", "Vue Router", "Nuxt.js"],

  Angular: ["Components", "Services", "RxJS", "NgRx", "Angular Universal"],

  Linux: [
    "Shell Scripting",
    "System Administration",
    "Networking",
    "Security",
    "Performance Tuning",
  ],

  Git: [
    "Branching Strategies",
    "Rebasing",
    "Hooks",
    "GitHub Actions",
    "GitLab CI",
  ],

  SoftwareArchitecture: [
    "Microservices",
    "Domain-Driven Design",
    "SOLID Principles",
    "Event-Driven Architecture",
    "Clean Architecture",
  ],

  DataVisualization: ["D3.js", "Chart.js", "Tableau", "Plotly", "WebGL"],

  Serverless: [
    "AWS Lambda",
    "Azure Functions",
    "Google Cloud Functions",
    "Cold Starts",
    "Event-Driven Architecture",
  ],

  QualityAssurance: [
    "Unit Testing",
    "Integration Testing",
    "Performance Testing",
    "Accessibility Testing",
    "Test Automation",
  ],

  CloudNative: [
    "Containers",
    "Service Mesh",
    "Observability",
    "GitOps",
    "Serverless",
  ],

  APIDesign: ["REST", "GraphQL", "gRPC", "OpenAPI", "API Gateway"],

  PerformanceOptimization: [
    "Caching",
    "Lazy Loading",
    "Code Splitting",
    "Network Optimization",
    "Memory Management",
  ],

  Databases: [
    "Relational",
    "NoSQL",
    "NewSQL",
    "Time Series",
    "Graph Databases",
  ],

  Embedded: [
    "Real-time Systems",
    "Firmware",
    "RTOS",
    "Low-level Programming",
    "Hardware Interfaces",
  ],

  GameDevelopment: [
    "Unity",
    "Unreal Engine",
    "Godot",
    "Game Physics",
    "AI for Games",
  ],

  WebRTC: [
    "Signaling",
    "Peer Connection",
    "Media Streaming",
    "Data Channels",
    "NAT Traversal",
  ],

  ContainerOrchestration: [
    "Kubernetes",
    "Docker Swarm",
    "Nomad",
    "Helm",
    "Service Discovery",
  ],

  StaticSiteGenerators: ["Gatsby", "Next.js", "Hugo", "Eleventy", "Jekyll"],

  PWA: [
    "Service Workers",
    "Offline Support",
    "Push Notifications",
    "App Shell Architecture",
    "Installable Web Apps",
  ],
};

export default topics;
