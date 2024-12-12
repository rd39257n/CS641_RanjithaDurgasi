import { firebaseUtils } from "./firebase-utils";

const SKILL_CATEGORIES = {
  Programming: {
    icon: "code-tags",
    color: "#6C63FF",
    description: "Software development and coding skills",
  },
  Design: {
    icon: "palette",
    color: "#FF6B6B",
    description: "Visual and user experience design",
  },
  "Data Science": {
    icon: "chart-box",
    color: "#4CAF50",
    description: "Data analysis and machine learning",
  },
  Technology: {
    icon: "laptop",
    color: "#FFA726",
    description: "General technology and IT skills",
  },
  Marketing: {
    icon: "bullhorn",
    color: "#9C27B0",
    description: "Digital marketing and promotion",
  },
};

const INITIAL_SKILLS = [
  {
    id: "react-native",
    name: "React Native",
    category: "Programming",
    description:
      "Mobile app development with React Native, enabling the creation of cross-platform applications using JavaScript and React.",
    difficulty: "Intermediate",
    learningTime: "3-6 months",
    prerequisites: ["JavaScript", "React"],
    careerPaths: ["Mobile App Developer", "Full Stack Developer"],
    resources: [
      "Official React Native Documentation",
      "Udemy Courses",
      "YouTube Tutorials",
    ],
  },
  {
    id: "ui-design",
    name: "UI Design",
    category: "Design",
    description:
      "Learn to create beautiful, functional, and user-centric interfaces for websites and applications.",
    difficulty: "Beginner",
    learningTime: "2-4 months",
    prerequisites: ["Basic Design Theory"],
    careerPaths: ["UI Designer", "UX Designer"],
    resources: ["Figma Tutorials", "Design Books", "Online Courses"],
  },
  {
    id: "python",
    name: "Python",
    category: "Programming",
    description:
      "General-purpose programming language used for web development, data science, AI, and more.",
    difficulty: "Beginner",
    learningTime: "2-3 months",
    prerequisites: [],
    careerPaths: [
      "Data Scientist",
      "Software Developer",
      "Machine Learning Engineer",
    ],
    resources: ["Python.org", "Codecademy", "Automate the Boring Stuff"],
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    category: "Data Science",
    description:
      "Learn to build predictive models and work with AI systems using algorithms and data.",
    difficulty: "Advanced",
    learningTime: "6-12 months",
    prerequisites: ["Python", "Linear Algebra", "Statistics"],
    careerPaths: ["Machine Learning Engineer", "Data Scientist"],
    resources: [
      "Coursera AI Courses",
      "Google AI Learning Resources",
      "Books on ML",
    ],
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    category: "Marketing",
    description:
      "Master online marketing strategies, including SEO, social media marketing, and content marketing.",
    difficulty: "Beginner",
    learningTime: "2-3 months",
    prerequisites: ["Basic Computer Knowledge"],
    careerPaths: ["Digital Marketer", "Content Strategist"],
    resources: [
      "Google Digital Garage",
      "HubSpot Academy",
      "Udemy Marketing Courses",
    ],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    category: "Technology",
    description:
      "Learn to secure networks, systems, and data against cyber threats and attacks.",
    difficulty: "Intermediate",
    learningTime: "6-9 months",
    prerequisites: ["Networking Basics", "Operating Systems"],
    careerPaths: ["Cybersecurity Analyst", "Ethical Hacker"],
    resources: [
      "CompTIA Security+ Materials",
      "Online Bootcamps",
      "Books on Cybersecurity",
    ],
  },
  {
    id: "cloud-computing",
    name: "Cloud Computing",
    category: "Technology",
    description:
      "Understand cloud platforms and services such as AWS, Azure, and Google Cloud to deploy and manage applications.",
    difficulty: "Intermediate",
    learningTime: "3-6 months",
    prerequisites: ["Networking", "Basic Programming"],
    careerPaths: ["Cloud Architect", "DevOps Engineer"],
    resources: ["AWS Training", "Microsoft Learn", "Google Cloud Skills Boost"],
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    category: "Data Science",
    description:
      "Gain skills to analyze, visualize, and interpret data to derive actionable insights.",
    difficulty: "Beginner",
    learningTime: "3-4 months",
    prerequisites: ["Basic Math"],
    careerPaths: ["Data Analyst", "Business Analyst"],
    resources: ["Kaggle", "Excel Tutorials", "Python Pandas"],
  },
  {
    id: "web-development",
    name: "Web Development",
    category: "Programming",
    description:
      "Build websites and web applications using modern tools and technologies such as HTML, CSS, JavaScript, and frameworks like React or Angular.",
    difficulty: "Beginner",
    learningTime: "4-6 months",
    prerequisites: ["Basic Computer Knowledge"],
    careerPaths: ["Frontend Developer", "Full Stack Developer"],
    resources: ["freeCodeCamp", "MDN Web Docs", "YouTube Tutorials"],
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    category: "Design",
    description:
      "Learn to create compelling visual content using tools like Photoshop, Illustrator, and Canva.",
    difficulty: "Beginner",
    learningTime: "2-3 months",
    prerequisites: ["Basic Computer Skills"],
    careerPaths: ["Graphic Designer", "Creative Director"],
    resources: ["Adobe Tutorials", "Canva Design School", "YouTube Channels"],
  },
  {
    id: "seo",
    name: "Search Engine Optimization (SEO)",
    category: "Marketing",
    description:
      "Improve website visibility on search engines through technical and content optimizations.",
    difficulty: "Beginner",
    learningTime: "1-2 months",
    prerequisites: [],
    careerPaths: ["SEO Specialist", "Content Marketer"],
    resources: ["Moz SEO Guide", "Yoast Academy", "Google Search Central"],
  },
  {
    id: "networking",
    name: "Networking",
    category: "Technology",
    description:
      "Learn the fundamentals of computer networks, protocols, and systems.",
    difficulty: "Intermediate",
    learningTime: "4-6 months",
    prerequisites: [],
    careerPaths: ["Network Administrator", "System Engineer"],
    resources: [
      "Cisco Networking Academy",
      "CompTIA Network+",
      "Books on Networking",
    ],
  },
  {
    id: "video-editing",
    name: "Video Editing",
    category: "Design",
    description:
      "Master the art of video editing using tools like Adobe Premiere Pro, Final Cut Pro, and Davinci Resolve.",
    difficulty: "Beginner",
    learningTime: "2-4 months",
    prerequisites: [],
    careerPaths: ["Video Editor", "Content Creator"],
    resources: ["Adobe Tutorials", "Skillshare Courses", "YouTube Tutorials"],
  },
  {
    id: "content-writing",
    name: "Content Writing",
    category: "Marketing",
    description:
      "Enhance your writing skills to create engaging content for blogs, websites, and social media.",
    difficulty: "Beginner",
    learningTime: "1-2 months",
    prerequisites: [],
    careerPaths: ["Content Writer", "Copywriter"],
    resources: [
      "Grammarly",
      "Content Marketing Institute",
      "Online Writing Courses",
    ],
  },
  {
    id: "database-management",
    name: "Database Management",
    category: "Technology",
    description:
      "Learn to design, implement, and manage relational databases using SQL and other tools.",
    difficulty: "Intermediate",
    learningTime: "3-6 months",
    prerequisites: ["Basic Programming"],
    careerPaths: ["Database Administrator", "Data Engineer"],
    resources: ["W3Schools SQL", "Coursera Database Courses", "Books on SQL"],
  },
  {
    id: "product-management",
    name: "Product Management",
    category: "Technology",
    description:
      "Master the art of managing products from ideation to launch, focusing on user needs and business goals.",
    difficulty: "Intermediate",
    learningTime: "4-6 months",
    prerequisites: ["Basic Business Knowledge"],
    careerPaths: ["Product Manager", "Product Owner"],
    resources: ["Reforge", "Books on Product Management", "Online Courses"],
  },
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    category: "Data Science",
    description:
      "Dive into AI concepts, including natural language processing, computer vision, and robotics.",
    difficulty: "Advanced",
    learningTime: "6-12 months",
    prerequisites: ["Python", "Linear Algebra", "Machine Learning"],
    careerPaths: ["AI Engineer", "Research Scientist"],
    resources: ["AI4ALL", "Coursera AI Specializations", "Google AI Resources"],
  },
  {
    id: "animation",
    name: "Animation",
    category: "Design",
    description:
      "Learn to create stunning animations using tools like Blender, Maya, and After Effects.",
    difficulty: "Intermediate",
    learningTime: "4-6 months",
    prerequisites: ["Basic Design Knowledge"],
    careerPaths: ["Animator", "Motion Designer"],
    resources: [
      "Blender Tutorials",
      "Skillshare Courses",
      "Books on Animation",
    ],
  },
  {
    id: "ethical-hacking",
    name: "Ethical Hacking",
    category: "Technology",
    description:
      "Learn penetration testing techniques to identify and fix security vulnerabilities in systems.",
    difficulty: "Advanced",
    learningTime: "6-9 months",
    prerequisites: ["Networking Basics", "Operating Systems"],
    careerPaths: ["Ethical Hacker", "Cybersecurity Consultant"],
    resources: [
      "CEH Certification",
      "Offensive Security Courses",
      "Books on Ethical Hacking",
    ],
  },
  {
    id: "game-development",
    name: "Game Development",
    category: "Programming",
    description:
      "Create engaging games using engines like Unity and Unreal Engine, and learn game design principles.",
    difficulty: "Intermediate",
    learningTime: "4-6 months",
    prerequisites: ["Programming Basics"],
    careerPaths: ["Game Developer", "Game Designer"],
    resources: [
      "Unity Learn",
      "Unreal Engine Tutorials",
      "Books on Game Development",
    ],
  },
];

async function seedData() {
  try {
    // First seed the categories
    await firebaseUtils.seedSkillCategories(SKILL_CATEGORIES);
    console.log("Categories seeded successfully");

    // Then seed the skills
    await firebaseUtils.seedSkills(INITIAL_SKILLS);
    console.log("Skills seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

// Run the seeding function
seedData();
