import { NextResponse } from 'next/server';
import { ArticleService } from '@/services/articleService';
import { ArticleCreateData } from '@/types/article';

const articleService = new ArticleService();

// POST /api/seed-articles - Create sample articles for testing
export async function POST() {
  try {
    const sampleArticles: ArticleCreateData[] = [
      {
        title: "Getting Started with Next.js 15",
        slug: "getting-started-with-nextjs-15",
        excerpt: "Learn the fundamentals of Next.js 15 and build your first modern web application with the latest features and improvements.",
        content: `
          <h2>Introduction to Next.js 15</h2>
          <p>Next.js 15 brings exciting new features and improvements that make building React applications even more powerful and efficient.</p>
          
          <h3>Key Features</h3>
          <ul>
            <li>Improved performance with React 19 support</li>
            <li>Enhanced developer experience</li>
            <li>Better TypeScript integration</li>
            <li>Advanced routing capabilities</li>
          </ul>
          
          <h3>Installation</h3>
          <p>To create a new Next.js 15 project, run:</p>
          <pre><code>npx create-next-app@latest my-app</code></pre>
          
          <h3>Project Structure</h3>
          <p>Next.js 15 follows a clean and organized project structure that makes development intuitive and scalable.</p>
          
          <h3>Conclusion</h3>
          <p>Next.js 15 is a powerful framework that enables developers to build fast, scalable web applications with ease.</p>
        `,
        author: "John Developer",
        category: "Web Development",
        tags: "Next.js, React, JavaScript, Web Development",
        published: true,
      },
      {
        title: "Building IoT Projects with Arduino and ESP32",
        slug: "building-iot-projects-arduino-esp32",
        excerpt: "Discover how to create amazing Internet of Things projects using Arduino and ESP32 microcontrollers with practical examples.",
        content: `
          <h2>Introduction to IoT Development</h2>
          <p>The Internet of Things (IoT) is revolutionizing how we interact with technology in our daily lives.</p>
          
          <h3>Arduino vs ESP32</h3>
          <p>Both Arduino and ESP32 are excellent platforms for IoT development, each with their unique strengths:</p>
          
          <h4>Arduino</h4>
          <ul>
            <li>Easy to learn and use</li>
            <li>Large community support</li>
            <li>Extensive library ecosystem</li>
          </ul>
          
          <h4>ESP32</h4>
          <ul>
            <li>Built-in WiFi and Bluetooth</li>
            <li>More processing power</li>
            <li>Lower cost for wireless projects</li>
          </ul>
          
          <h3>Project Ideas</h3>
          <p>Here are some exciting IoT projects you can build:</p>
          <ol>
            <li>Smart home automation system</li>
            <li>Weather monitoring station</li>
            <li>Plant watering system</li>
            <li>Security camera with alerts</li>
          </ol>
          
          <h3>Getting Started</h3>
          <p>To begin your IoT journey, you'll need basic electronics knowledge and programming skills.</p>
        `,
        author: "Sarah Hardware",
        category: "Hardware",
        tags: "Arduino, ESP32, IoT, Electronics, Microcontroller",
        published: true,
      },
      {
        title: "Machine Learning with Python: A Beginner's Guide",
        slug: "machine-learning-python-beginners-guide",
        excerpt: "Start your machine learning journey with Python. Learn the basics of ML algorithms, data preprocessing, and model training.",
        content: `
          <h2>What is Machine Learning?</h2>
          <p>Machine Learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed.</p>
          
          <h3>Types of Machine Learning</h3>
          <ul>
            <li><strong>Supervised Learning:</strong> Learning with labeled data</li>
            <li><strong>Unsupervised Learning:</strong> Finding patterns in unlabeled data</li>
            <li><strong>Reinforcement Learning:</strong> Learning through interaction and feedback</li>
          </ul>
          
          <h3>Essential Python Libraries</h3>
          <p>To get started with ML in Python, you'll need these libraries:</p>
          <ul>
            <li><strong>NumPy:</strong> Numerical computing</li>
            <li><strong>Pandas:</strong> Data manipulation and analysis</li>
            <li><strong>Scikit-learn:</strong> Machine learning algorithms</li>
            <li><strong>Matplotlib:</strong> Data visualization</li>
          </ul>
          
          <h3>Your First ML Model</h3>
          <p>Let's build a simple linear regression model to predict house prices.</p>
          
          <pre><code>
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Load and prepare data
data = pd.read_csv('house_prices.csv')
X = data[['size', 'bedrooms']]
y = data['price']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)
          </code></pre>
          
          <h3>Next Steps</h3>
          <p>Continue learning by exploring different algorithms and working on real-world projects.</p>
        `,
        author: "Dr. AI Researcher",
        category: "AI & Machine Learning",
        tags: "Python, Machine Learning, AI, Data Science, Scikit-learn",
        published: true,
      },
      {
        title: "Modern React Patterns and Best Practices",
        slug: "modern-react-patterns-best-practices",
        excerpt: "Explore advanced React patterns, hooks, and best practices for building scalable and maintainable React applications.",
        content: `
          <h2>Evolution of React</h2>
          <p>React has evolved significantly since its introduction, with hooks revolutionizing how we write components.</p>
          
          <h3>Modern React Patterns</h3>
          
          <h4>1. Custom Hooks</h4>
          <p>Create reusable stateful logic across components:</p>
          <pre><code>
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}
          </code></pre>
          
          <h4>2. Compound Components</h4>
          <p>Build flexible and reusable component APIs.</p>
          
          <h4>3. Render Props Pattern</h4>
          <p>Share code between components using a prop whose value is a function.</p>
          
          <h3>Performance Optimization</h3>
          <ul>
            <li>Use React.memo() for component memoization</li>
            <li>Implement useMemo() and useCallback() hooks</li>
            <li>Code splitting with React.lazy()</li>
            <li>Optimize re-renders with proper key props</li>
          </ul>
          
          <h3>State Management</h3>
          <p>Choose the right state management solution:</p>
          <ul>
            <li><strong>useState:</strong> Local component state</li>
            <li><strong>useContext:</strong> Shared state across components</li>
            <li><strong>useReducer:</strong> Complex state logic</li>
            <li><strong>External libraries:</strong> Redux, Zustand, Jotai</li>
          </ul>
          
          <h3>Testing Strategies</h3>
          <p>Write maintainable tests with React Testing Library and Jest.</p>
        `,
        author: "React Master",
        category: "Web Development",
        tags: "React, JavaScript, Hooks, Performance, Testing",
        published: true,
      },
      {
        title: "Building a Smart Home with Raspberry Pi",
        slug: "building-smart-home-raspberry-pi",
        excerpt: "Transform your home into a smart home using Raspberry Pi. Learn to control lights, temperature, and security systems.",
        content: `
          <h2>Introduction to Smart Home Automation</h2>
          <p>Smart home technology has become more accessible than ever, and Raspberry Pi is an excellent platform to start your automation journey.</p>
          
          <h3>What You'll Need</h3>
          <ul>
            <li>Raspberry Pi 4 (recommended)</li>
            <li>MicroSD card (32GB or larger)</li>
            <li>Various sensors (temperature, motion, light)</li>
            <li>Relay modules for controlling appliances</li>
            <li>LED strips or smart bulbs</li>
            <li>Breadboard and jumper wires</li>
          </ul>
          
          <h3>Setting Up the Base System</h3>
          <p>Start by installing Raspberry Pi OS and enabling SSH for remote access.</p>
          
          <h3>Core Components</h3>
          
          <h4>1. Temperature Control</h4>
          <p>Monitor and control your home's temperature using DHT22 sensors and smart thermostats.</p>
          
          <h4>2. Lighting System</h4>
          <p>Create automated lighting that responds to motion, time of day, and ambient light levels.</p>
          
          <h4>3. Security Features</h4>
          <ul>
            <li>Motion detection with PIR sensors</li>
            <li>Door/window sensors</li>
            <li>Camera integration</li>
            <li>Mobile notifications</li>
          </ul>
          
          <h3>Software Architecture</h3>
          <p>Use Home Assistant or create a custom Python application to coordinate all devices.</p>
          
          <h3>Voice Control Integration</h3>
          <p>Add voice control capabilities with Google Assistant or Amazon Alexa integration.</p>
          
          <h3>Mobile App</h3>
          <p>Build a mobile app for remote monitoring and control of your smart home system.</p>
        `,
        author: "Home Automation Expert",
        category: "Hardware",
        tags: "Raspberry Pi, Smart Home, IoT, Automation, Python",
        published: true,
      },
      {
        title: "TypeScript Best Practices for Large Applications",
        slug: "typescript-best-practices-large-applications",
        excerpt: "Master TypeScript for enterprise-level applications. Learn advanced types, patterns, and architectural decisions.",
        content: `
          <h2>Why TypeScript for Large Applications?</h2>
          <p>TypeScript provides static typing that catches errors early and improves code maintainability in large codebases.</p>
          
          <h3>Project Structure</h3>
          <p>Organize your TypeScript project for scalability:</p>
          <pre><code>
src/
  ├── types/          # Global type definitions
  ├── utils/          # Utility functions
  ├── services/       # API and business logic
  ├── components/     # UI components
  ├── hooks/          # Custom React hooks
  └── store/          # State management
          </code></pre>
          
          <h3>Advanced TypeScript Features</h3>
          
          <h4>1. Utility Types</h4>
          <pre><code>
// Partial makes all properties optional
type PartialUser = Partial<User>;

// Pick selects specific properties
type UserContact = Pick<User, 'email' | 'phone'>;

// Record creates object types
type UserRoles = Record<string, Permission[]>;
          </code></pre>
          
          <h4>2. Conditional Types</h4>
          <pre><code>
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };
          </code></pre>
            <h4>3. Template Literal Types</h4>
          <pre><code>
type EventName = \`on\${Capitalize<string>}\`;
type ButtonEvent = \`button_\${string}_clicked\`;
          </code></pre>
          
          <h3>Error Handling Patterns</h3>
          <p>Implement robust error handling with Result types and custom error classes.</p>
          
          <h3>Performance Considerations</h3>
          <ul>
            <li>Use strict TypeScript configuration</li>
            <li>Implement proper tree shaking</li>
            <li>Optimize compilation with project references</li>
            <li>Monitor bundle size impact</li>
          </ul>
          
          <h3>Testing TypeScript Code</h3>
          <p>Write type-safe tests with proper mocking and assertion strategies.</p>
        `,
        author: "TypeScript Architect",
        category: "Web Development",
        tags: "TypeScript, JavaScript, Architecture, Enterprise, Best Practices",
        published: true,
      }
    ];

    // Create articles
    const createdArticles = [];
    for (const articleData of sampleArticles) {
      const article = await articleService.createArticle(articleData);
      createdArticles.push(article);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${createdArticles.length} sample articles`,
      data: createdArticles,
    });
  } catch (error) {
    console.error('Error seeding articles:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to seed articles' 
      },
      { status: 500 }
    );
  }
}

// DELETE /api/seed-articles - Remove all articles (for testing)
export async function DELETE() {
  try {
    const articles = await articleService.getArticles({ published: undefined });
      for (const article of articles.articles) {
      await articleService.deleteArticle(article.id);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${articles.articles.length} articles`,
    });
  } catch (error) {
    console.error('Error deleting articles:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete articles' 
      },
      { status: 500 }
    );
  }
}
