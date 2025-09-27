# 🚀 AI Ready Website - Complete Setup Guide

**Owner:** Tina Marcus  
**License:** MIT  
**Repository:** Open Source Project

This guide will walk you through everything you need to start the AI Ready Website analyzer on your local machine.

## 📋 Table of Contents

1. [Prerequisites](#-prerequisites)
2. [System Requirements](#-system-requirements)
3. [API Keys Setup](#-api-keys-setup)
4. [Installation Steps](#-installation-steps)
5. [Environment Configuration](#-environment-configuration)
6. [Starting the Project](#-starting-the-project)
7. [Verification & Testing](#-verification--testing)
8. [Troubleshooting](#-troubleshooting)
9. [Project Structure](#-project-structure)
10. [Next Steps](#-next-steps)

## 🔧 Prerequisites

### What You Need Before Starting

- **Computer**: macOS, Windows, or Linux
- **Internet Connection**: For downloading dependencies and API access
- **Git**: For version control (usually pre-installed)
- **Text Editor**: VS Code, Sublime Text, or any preferred editor
- **Browser**: Chrome, Firefox, Safari, or Edge

## 💻 System Requirements

### Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 18.0.0+ | JavaScript runtime |
| npm | 8.0.0+ | Package manager (comes with Node.js) |
| Git | Latest | Version control |

### Checking Your System

Run these commands to check if you have the required software:

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

### Installing Node.js (if needed)

**macOS (using Homebrew):**
```bash
brew install node
```

**Windows:**
1. Go to [nodejs.org](https://nodejs.org)
2. Download the LTS version
3. Run the installer

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 🔑 API Keys Setup

### Required API Keys

You'll need these API keys to run the AI Ready Website analyzer:

| Service | Purpose | Cost | Required |
|---------|---------|------|----------|
| OpenAI | AI analysis and recommendations | Pay-per-use | ✅ Yes |
| Firecrawl | Web scraping and content extraction | Free tier available | ✅ Yes |

### Getting Your API Keys

#### 1. OpenAI API Key
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in to your account
3. Navigate to **API Keys** section
4. Click **"Create new secret key"**
5. Copy the key (starts with `sk-proj-`)
6. **Important**: Save it securely - you won't see it again!

#### 2. Firecrawl API Key
1. Go to [firecrawl.dev](https://firecrawl.dev)
2. Sign up for a free account
3. Go to your dashboard
4. Generate an API key
5. Copy the key (starts with `fc-`)

## 📦 Installation Steps

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/Tinamarcus/ai-analyze.git
cd ai-analyze
```

### Step 2: Install Dependencies

```bash
# Install all dependencies
npm install
```

This will install all required packages including:
- Next.js 15 and React 18
- TypeScript and Tailwind CSS
- Framer Motion for animations
- Radix UI components
- Firecrawl and OpenAI SDKs

## ⚙️ Environment Configuration

### Step 1: Create Environment File

```bash
# Copy the example environment file
cp .env.example .env.local
```

### Step 2: Edit Environment File

Open the `.env.local` file in your text editor:

```bash
# Using VS Code
code .env.local

# Using nano (terminal)
nano .env.local

# Using vim (terminal)
vim .env.local
```

### Step 3: Add Your API Keys

Replace the placeholder values with your actual API keys:

```env
# OpenAI Configuration (Required)
OPENAI_API_KEY=sk-proj-your-actual-openai-key-here

# Firecrawl Configuration (Required)
FIRECRAWL_API_KEY=fc-your-actual-firecrawl-key-here
```

### Step 4: Verify Configuration

Make sure your `.env.local` file:
- Is in the root directory of the project
- Contains valid API keys (no extra spaces or quotes)
- Is not committed to git (should be in `.gitignore`)

## 🚀 Starting the Project

### Option 1: Start Development Server

```bash
# Start the development server
npm run dev
```

The application will start at `http://localhost:3000`

### Option 2: Start with Different Port

```bash
# If port 3000 is busy, use a different port
PORT=3001 npm run dev
```

### Option 3: Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## ✅ Verification & Testing

### Step 1: Check the Application

1. Open your browser
2. Go to `http://localhost:3000`
3. You should see the AI Ready Website analyzer interface

### Step 2: Test API Connections

1. Try entering a website URL (e.g., `https://example.com`)
2. Click "Analyze" or the equivalent button
3. Check if the analysis runs successfully

### Step 3: Check Browser Console

1. Open browser developer tools (F12)
2. Check the Console tab for any errors
3. Look for successful API calls in the Network tab

### Step 4: Test Different Features

- **Website Analysis**: Test with different websites
- **Real-time Progress**: Watch the analysis steps
- **Results Display**: Check charts and recommendations
- **Error Handling**: Try invalid URLs to test error messages

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Node.js Not Found

**Error**: `node: command not found`

**Solution**:
```bash
# Install Node.js (see System Requirements section)
# Or check if it's in your PATH
which node
```

#### 2. npm Install Fails

**Error**: Various npm installation errors

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and try again
rm -rf node_modules package-lock.json
npm install

# Try with different registry
npm install --registry https://registry.npmjs.org/
```

#### 3. Port Already in Use

**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill -9 [PID]

# Or use a different port
PORT=3001 npm run dev
```

#### 4. API Key Errors

**Error**: API authentication failures

**Solutions**:
1. Double-check your API keys in `.env.local` file
2. Ensure no extra spaces or quotes around keys
3. Verify keys are active in your API provider accounts
4. Check if you have sufficient credits/quota

#### 5. Environment Variables Not Loading

**Error**: `process.env.VARIABLE is undefined`

**Solutions**:
1. Ensure `.env.local` file is in the root directory
2. Restart your development server
3. Check for typos in variable names
4. Ensure `.env.local` is not in `.gitignore` (it should be)

#### 6. Build Errors

**Error**: TypeScript or build compilation errors

**Solutions**:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript configuration
npx tsc --noEmit
```

#### 7. Firecrawl Connection Issues

**Error**: Failed to scrape website

**Solutions**:
1. Check your Firecrawl API key
2. Verify you have sufficient credits
3. Try with a different website URL
4. Check if the target website is accessible

#### 8. OpenAI API Issues

**Error**: OpenAI API errors

**Solutions**:
1. Verify your OpenAI API key
2. Check your OpenAI account credits
3. Ensure you have access to the required models
4. Check OpenAI service status

### Getting Help

If you encounter issues not covered here:

1. **Check the logs**: Look at terminal output for error messages
2. **Search issues**: Check GitHub issues for similar problems
3. **Ask for help**: Create a new issue on GitHub
4. **Contact**: Email support at contact@tinamarcus.dev

## 📁 Project Structure

Understanding the AI Ready Website layout:

```
ai-ready-website/
├── app/                          # Next.js 15 App Router
│   ├── api/                     # API endpoints
│   │   ├── ai-readiness/        # Main analysis endpoint
│   │   ├── ai-analysis/         # Additional AI analysis
│   │   ├── check-config/        # API key validation
│   │   └── check-llms/          # LLM availability check
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Home page component
├── components/                   # React components
│   ├── app/(home)/sections/     # Home page sections
│   │   ├── ai-readiness/        # Analysis results components
│   │   ├── hero/                # Hero section components
│   │   ├── hero-input/          # URL input components
│   │   └── hero-scraping/       # Analysis progress components
│   ├── shared/                  # Reusable shared components
│   │   ├── button/              # Button components
│   │   ├── effects/             # Animation effects
│   │   ├── header/              # Header components
│   │   ├── icons/               # Icon components
│   │   └── ui/                  # UI primitives
│   └── ui/                      # UI component library
├── styles/                      # CSS and styling
│   ├── design-system/           # Design system styles
│   ├── components/              # Component-specific styles
│   └── main.css                 # Main stylesheet
├── public/                      # Static assets
│   ├── favicon.png              # Site favicon
│   └── compressor.json          # Asset compression config
├── hooks/                       # Custom React hooks
├── utils/                       # Utility functions
├── .env.example                 # Environment template
├── .env.local                   # Your local environment (create this)
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── next.config.js               # Next.js configuration
└── README.md                    # Project documentation
```

## 🎯 Next Steps

Once your AI Ready Website analyzer is running successfully:

### 1. Explore the Application
- Test the analyzer with different websites
- Try various types of sites (blogs, e-commerce, corporate)
- Explore the different analysis metrics
- Check the visualizations and recommendations

### 2. Understand the Analysis
- Read about each metric in the documentation
- Learn what makes a website "AI-ready"
- Understand the scoring algorithm
- See how different factors affect the overall score

### 3. Development Workflow
- Make changes to the code
- Test your changes with the development server
- Use the browser dev tools for debugging
- Follow the contributing guidelines

### 4. Customization
- Modify the analysis criteria
- Add new metrics or checks
- Customize the UI and styling
- Integrate with additional APIs

### 5. Deployment
- Build for production
- Deploy to Vercel, Netlify, or your preferred platform
- Set up environment variables in production
- Monitor performance and usage

## 📞 Support

### Getting Help

- **GitHub Issues**: [Report bugs or ask questions](https://github.com/Tinamarcus/ai-analyze/issues)
- **GitHub Discussions**: [Community discussions](https://github.com/Tinamarcus/ai-analyze/discussions)
- **Email**: [Contact Tina Marcus](mailto:contact@tinamarcus.dev)

### Documentation

- **Main README**: [Project Overview](README.md)
- **Contributing**: [How to contribute](CONTRIBUTING.md)

---

**🎉 Congratulations!** You now have everything you need to start working with the AI Ready Website analyzer. Happy analyzing!

**Made with ❤️ by Tina Marcus**