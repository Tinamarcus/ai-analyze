# AI Ready Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-blue.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

**Owner:** Tina Marcus  
**License:** MIT  
**Repository:** Open Source Project

A sophisticated web application that analyzes websites for AI readiness and optimization. Built with Next.js 15, it provides real-time analysis with beautiful visualizations to help websites prepare for an AI-driven future.

<img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzZyaXVlOXoyaGJmMGV5YzBlbXNod2U5emRrZ2lqZTM1eGI1aHlzZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/irNt0XtSKmenMRqMre/giphy.gif" width="100%" alt="AI Ready Website">

## 🚀 What It Does

AI Ready Website analyzes any website for "AI readiness" - how well its content and structure enable AI systems and search agents to understand, summarize, and answer questions about the business. It produces a readiness score, prioritized recommendations, and visual metrics across multiple dimensions.

### Core Features

- **🧠 AI Readiness Analysis**: Comprehensive scoring across 7 key metrics
- **📊 Real-time Visualization**: Beautiful charts and progress indicators
- **🎯 Actionable Recommendations**: Specific steps to improve AI optimization
- **🔍 Technical Analysis**: Deep dive into HTML structure, metadata, and accessibility
- **📈 Performance Insights**: Readability scoring and content quality analysis
- **🌐 Web Standards Check**: Robots.txt, sitemap.xml, and cutting-edge LLMs.txt support

## 🎯 Why This Matters

AI is mediating search and discovery. Websites that are clear, structured, current, and well-labeled earn better representation in AI answers, reduce misinformation risk, and convert AI-driven traffic more effectively.

## 📊 Analysis Metrics

### 1. **Heading Hierarchy** (High Impact)
- Checks for proper H1-H6 structure
- Identifies multiple H1s or skipped heading levels
- Ensures logical content organization

### 2. **Content Readability** (High Impact)
- Uses Flesch-Kincaid scoring algorithm
- Evaluates sentence complexity and word difficulty
- Ensures AI can easily understand content

### 3. **Metadata Quality** (Medium Impact)
- Analyzes title tags, descriptions, and social media tags
- Checks for optimal length and content
- Validates author and publish date information

### 4. **Semantic HTML** (Medium Impact)
- Evaluates use of HTML5 semantic elements
- Checks for proper ARIA roles and accessibility
- Recognizes modern framework implementations

### 5. **Accessibility** (Medium Impact)
- Validates alt text on images
- Checks for ARIA labels and descriptions
- Ensures language attributes are present

### 6. **Robots.txt** (Low Impact)
- Verifies crawler directives
- Checks for sitemap references
- Ensures proper search engine guidance

### 7. **LLMs.txt** (Cutting-edge)
- Checks for AI usage permission files
- Future-proofs for AI crawler guidelines
- Industry-first feature for AI optimization

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **PIXI.js** - Advanced graphics and animations

### Backend & APIs
- **Next.js API Routes** - Serverless backend functions
- **Firecrawl API** - Web scraping and content extraction
- **OpenAI API** - AI-powered analysis and recommendations
- **Custom Algorithms** - Readability scoring and semantic analysis

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
ai-ready-website/
├── app/                          # Next.js 15 App Router
│   ├── api/                     # API endpoints
│   │   ├── ai-readiness/        # Main analysis endpoint
│   │   ├── ai-analysis/         # Additional AI analysis
│   │   ├── check-config/        # API key validation
│   │   └── check-llms/          # LLM availability check
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── app/(home)/sections/     # Page sections
│   ├── shared/                  # Reusable components
│   └── ui/                      # UI primitives
├── styles/                      # CSS and styling
│   ├── design-system/           # Design system styles
│   └── components/              # Component-specific styles
├── public/                      # Static assets
├── hooks/                       # Custom React hooks
├── utils/                       # Utility functions
├── .env.example                 # Environment template
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **npm 8+**
- **API Keys** (see setup guide)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tinamarcus/ai-analyze.git
   cd ai-analyze
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Required API Keys

Create a `.env.local` file with the following:

```env
# OpenAI API Key (required)
OPENAI_API_KEY=sk-proj-your-openai-key-here

# Firecrawl API Key (required)
FIRECRAWL_API_KEY=fc-your-firecrawl-key-here
```

### Getting API Keys

#### OpenAI API Key
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new secret key
5. Copy the key (starts with `sk-proj-`)

#### Firecrawl API Key
1. Go to [firecrawl.dev](https://firecrawl.dev)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Copy the key (starts with `fc-`)

## 🎯 Usage

### Basic Analysis
1. **Enter a website URL** in the input field
2. **Click "Analyze"** to start the analysis
3. **Watch real-time progress** as the system evaluates the site
4. **Review results** with scores, recommendations, and insights

### Understanding Results
- **Overall Score**: 0-100 rating of AI readiness
- **Category Scores**: Individual scores for each metric
- **Recommendations**: Specific actions to improve
- **Technical Details**: In-depth analysis of each component

### Export Options
- **Screenshots**: Save visual results
- **Reports**: Download detailed analysis (coming soon)
- **Share**: Generate shareable links (coming soon)

## 🏢 Business Use Cases

### For Website Owners
- **AI Optimization**: Understand how AI systems see your site
- **SEO Benefits**: Better AI readiness = better search visibility
- **Competitive Analysis**: Compare against industry standards
- **Performance Tracking**: Monitor improvements over time

### For Digital Agencies
- **Client Reports**: Professional AI readiness audits
- **Lead Generation**: Offer AI optimization as a premium service
- **Competitive Intelligence**: Analyze competitor websites
- **Service Upselling**: Ongoing optimization retainers

### For Developers
- **Technical Insights**: Understand implementation details
- **Best Practices**: Learn AI-friendly development patterns
- **Quality Assurance**: Automated website analysis
- **Performance Monitoring**: Track technical improvements

## 🎨 Features

### Real-time Analysis
- **Live Progress Updates**: See analysis steps in real-time
- **Error Handling**: Graceful failures with helpful messages
- **Timeout Management**: Won't hang on slow or problematic sites

### Beautiful Interface
- **Animated Hero Section**: Engaging ASCII art and flame effects
- **Interactive Dashboard**: Rich visualizations and charts
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Mode**: Automatic theme switching

### Advanced Analytics
- **Weighted Scoring**: Intelligent algorithms, not simple pass/fail
- **Domain Reputation**: Recognizes trusted and authoritative sites
- **Content Quality Signals**: Rewards well-structured content
- **Future-proofing**: Checks for emerging standards like LLMs.txt

## 🚀 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

### Code Structure
- **Components**: Modular React components with TypeScript
- **API Routes**: Serverless functions for backend logic
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📚 Documentation

- **[Setup Guide](SETUP_GUIDE.md)** - Complete installation and configuration guide
- **[Contributing](CONTRIBUTING.md)** - How to contribute to the project
- **[API Documentation](docs/)** - API endpoint documentation (coming soon)

## 🤝 Support

### Getting Help
- **GitHub Issues**: [Report bugs or ask questions](https://github.com/Tinamarcus/ai-analyze/issues)
- **GitHub Discussions**: [Community discussions](https://github.com/Tinamarcus/ai-analyze/discussions)
- **Email**: [Contact Tina Marcus](mailto:contact@tinamarcus.dev)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Firecrawl** - Web scraping and content extraction
- **OpenAI** - AI analysis and recommendations
- **Next.js Team** - Amazing React framework
- **Vercel** - Deployment and hosting platform
- **Open Source Community** - Inspiration and tools

---

**🎉 Ready to analyze your website for AI readiness?** 

Start by entering a URL and see how well your site is optimized for the AI-powered future!

**Made with ❤️ by Tina Marcus**