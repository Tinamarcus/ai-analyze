# Playwright MCP Integration Guide

**Owner:** Tina Marcus  
**License:** MIT  
**Repository:** Open Source Project

## 🚀 **Quick Start**

### **1. Installation**
```bash
# Install Playwright MCP server
npm install @playwright/mcp

# Install browser dependencies
npx playwright install chromium firefox webkit

# Install additional dependencies
npm install express cors helmet morgan
```

### **2. Basic Setup**
```javascript
// server.js
const express = require('express');
const { PlaywrightMCP } = require('@playwright/mcp');

const app = express();
const playwright = new PlaywrightMCP({
  port: 3001,
  browserType: 'chromium',
  headless: true
});

app.use(express.json());
app.use(cors());
app.use(helmet());

// Start Playwright MCP server
playwright.start();

// Your API routes here
app.listen(3000, () => {
  console.log('AI Analyzer with Playwright MCP running on port 3000');
});
```

## 🔧 **Web Automation Service Implementation**

### **Service Structure**
```
web-automation-service/
├── src/
│   ├── controllers/
│   │   ├── browserController.js
│   │   ├── analysisController.js
│   │   └── automationController.js
│   ├── services/
│   │   ├── playwrightService.js
│   │   ├── analysisService.js
│   │   └── screenshotService.js
│   ├── models/
│   │   ├── BrowserSession.js
│   │   └── AnalysisResult.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   └── routes/
│       ├── browser.js
│       ├── analysis.js
│       └── automation.js
├── config/
│   ├── playwright.config.js
│   └── database.js
└── tests/
    ├── browser.test.js
    └── analysis.test.js
```

### **Core Playwright Service**
```javascript
// src/services/playwrightService.js
const { chromium, firefox, webkit } = require('playwright');

class PlaywrightService {
  constructor() {
    this.browsers = new Map();
    this.sessions = new Map();
  }

  async launchBrowser(browserType = 'chromium', options = {}) {
    const browser = await this.getBrowser(browserType);
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      ...options
    });
    
    const page = await context.newPage();
    const sessionId = this.generateSessionId();
    
    this.sessions.set(sessionId, {
      browser,
      context,
      page,
      createdAt: new Date()
    });
    
    return { sessionId, page };
  }

  async navigateToUrl(sessionId, url, options = {}) {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');
    
    await session.page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000,
      ...options
    });
    
    return {
      url: session.page.url(),
      title: await session.page.title(),
      status: 'success'
    };
  }

  async takeScreenshot(sessionId, options = {}) {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');
    
    const screenshot = await session.page.screenshot({
      type: 'png',
      fullPage: true,
      ...options
    });
    
    return {
      screenshot: screenshot.toString('base64'),
      timestamp: new Date().toISOString()
    };
  }

  async extractContent(sessionId, selectors = {}) {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');
    
    const content = await session.page.evaluate((sel) => {
      const result = {};
      
      if (sel.text) {
        result.text = document.body.innerText;
      }
      
      if (sel.links) {
        result.links = Array.from(document.querySelectorAll('a')).map(a => ({
          text: a.textContent,
          href: a.href
        }));
      }
      
      if (sel.images) {
        result.images = Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt,
          width: img.width,
          height: img.height
        }));
      }
      
      if (sel.forms) {
        result.forms = Array.from(document.querySelectorAll('form')).map(form => ({
          action: form.action,
          method: form.method,
          inputs: Array.from(form.querySelectorAll('input, select, textarea')).map(input => ({
            type: input.type,
            name: input.name,
            placeholder: input.placeholder,
            required: input.required
          }))
        }));
      }
      
      return result;
    }, selectors);
    
    return content;
  }

  async analyzeAccessibility(sessionId) {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');
    
    // Use Playwright's accessibility snapshot
    const snapshot = await session.page.accessibility.snapshot();
    
    // Analyze for common accessibility issues
    const issues = [];
    
    // Check for missing alt text
    const images = await session.page.$$('img');
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      if (!alt) {
        issues.push({
          type: 'missing_alt_text',
          element: 'img',
          severity: 'high'
        });
      }
    }
    
    // Check for missing form labels
    const inputs = await session.page.$$('input');
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const label = await session.page.$(`label[for="${id}"]`);
      if (!label) {
        issues.push({
          type: 'missing_label',
          element: 'input',
          severity: 'medium'
        });
      }
    }
    
    return {
      snapshot,
      issues,
      score: this.calculateAccessibilityScore(issues)
    };
  }

  async monitorPerformance(sessionId) {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');
    
    // Start performance monitoring
    await session.page.coverage.startJSCoverage();
    await session.page.coverage.startCSSCoverage();
    
    // Get performance metrics
    const metrics = await session.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        resourceCount: performance.getEntriesByType('resource').length
      };
    });
    
    // Get coverage data
    const jsCoverage = await session.page.coverage.stopJSCoverage();
    const cssCoverage = await session.page.coverage.stopCSSCoverage();
    
    return {
      metrics,
      coverage: {
        js: this.calculateCoverage(jsCoverage),
        css: this.calculateCoverage(cssCoverage)
      }
    };
  }

  async closeSession(sessionId) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }
    
    await session.context.close();
    this.sessions.delete(sessionId);
    
    return { status: 'closed' };
  }

  // Helper methods
  async getBrowser(browserType) {
    if (this.browsers.has(browserType)) {
      return this.browsers.get(browserType);
    }
    
    let browser;
    switch (browserType) {
      case 'firefox':
        browser = await firefox.launch({ headless: true });
        break;
      case 'webkit':
        browser = await webkit.launch({ headless: true });
        break;
      default:
        browser = await chromium.launch({ headless: true });
    }
    
    this.browsers.set(browserType, browser);
    return browser;
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  calculateAccessibilityScore(issues) {
    const totalIssues = issues.length;
    const highSeverity = issues.filter(i => i.severity === 'high').length;
    const mediumSeverity = issues.filter(i => i.severity === 'medium').length;
    
    // Simple scoring algorithm
    let score = 100;
    score -= highSeverity * 10;
    score -= mediumSeverity * 5;
    
    return Math.max(0, score);
  }

  calculateCoverage(coverage) {
    let totalBytes = 0;
    let usedBytes = 0;
    
    for (const entry of coverage) {
      totalBytes += entry.text.length;
      for (const range of entry.ranges) {
        usedBytes += range.end - range.start;
      }
    }
    
    return totalBytes > 0 ? (usedBytes / totalBytes) * 100 : 0;
  }
}

module.exports = PlaywrightService;
```

### **API Controllers**
```javascript
// src/controllers/browserController.js
const PlaywrightService = require('../services/playwrightService');

class BrowserController {
  constructor() {
    this.playwrightService = new PlaywrightService();
  }

  async launchBrowser(req, res) {
    try {
      const { browserType, options } = req.body;
      const result = await this.playwrightService.launchBrowser(browserType, options);
      
      res.json({
        success: true,
        sessionId: result.sessionId,
        message: 'Browser launched successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async navigate(req, res) {
    try {
      const { sessionId, url, options } = req.body;
      const result = await this.playwrightService.navigateToUrl(sessionId, url, options);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async screenshot(req, res) {
    try {
      const { sessionId, options } = req.body;
      const result = await this.playwrightService.takeScreenshot(sessionId, options);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async extractContent(req, res) {
    try {
      const { sessionId, selectors } = req.body;
      const result = await this.playwrightService.extractContent(sessionId, selectors);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async analyzeAccessibility(req, res) {
    try {
      const { sessionId } = req.body;
      const result = await this.playwrightService.analyzeAccessibility(sessionId);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async monitorPerformance(req, res) {
    try {
      const { sessionId } = req.body;
      const result = await this.playwrightService.monitorPerformance(sessionId);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async closeSession(req, res) {
    try {
      const { sessionId } = req.body;
      const result = await this.playwrightService.closeSession(sessionId);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = BrowserController;
```

### **API Routes**
```javascript
// src/routes/browser.js
const express = require('express');
const BrowserController = require('../controllers/browserController');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');

const router = express.Router();
const browserController = new BrowserController();

// Apply authentication middleware
router.use(auth);

// Browser management routes
router.post('/launch', validation.launchBrowser, browserController.launchBrowser);
router.post('/navigate', validation.navigate, browserController.navigate);
router.post('/screenshot', validation.screenshot, browserController.screenshot);
router.post('/extract-content', validation.extractContent, browserController.extractContent);
router.post('/analyze-accessibility', validation.analyzeAccessibility, browserController.analyzeAccessibility);
router.post('/monitor-performance', validation.monitorPerformance, browserController.monitorPerformance);
router.post('/close-session', validation.closeSession, browserController.closeSession);

module.exports = router;
```

## 🧪 **Testing**

### **Unit Tests**
```javascript
// tests/browser.test.js
const PlaywrightService = require('../src/services/playwrightService');

describe('PlaywrightService', () => {
  let playwrightService;
  
  beforeEach(() => {
    playwrightService = new PlaywrightService();
  });
  
  afterEach(async () => {
    // Clean up sessions
    for (const sessionId of playwrightService.sessions.keys()) {
      await playwrightService.closeSession(sessionId);
    }
  });
  
  test('should launch browser successfully', async () => {
    const result = await playwrightService.launchBrowser('chromium');
    
    expect(result.sessionId).toBeDefined();
    expect(result.page).toBeDefined();
  });
  
  test('should navigate to URL successfully', async () => {
    const { sessionId } = await playwrightService.launchBrowser('chromium');
    const result = await playwrightService.navigateToUrl(sessionId, 'https://example.com');
    
    expect(result.url).toBe('https://example.com/');
    expect(result.status).toBe('success');
  });
  
  test('should take screenshot successfully', async () => {
    const { sessionId } = await playwrightService.launchBrowser('chromium');
    await playwrightService.navigateToUrl(sessionId, 'https://example.com');
    const result = await playwrightService.takeScreenshot(sessionId);
    
    expect(result.screenshot).toBeDefined();
    expect(result.timestamp).toBeDefined();
  });
});
```

## 🚀 **Deployment**

### **Docker Configuration**
```dockerfile
# Dockerfile
FROM node:18-alpine

# Install Playwright dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set environment variables
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]
```

### **Docker Compose**
```yaml
# docker-compose.yml
version: '3.8'

services:
  web-automation:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
    volumes:
      - ./screenshots:/app/screenshots
      - ./reports:/app/reports
    depends_on:
      - redis
      - postgres

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: ai_analyzer
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 📊 **Monitoring & Logging**

### **Performance Monitoring**
```javascript
// src/middleware/monitoring.js
const prometheus = require('prom-client');

// Create metrics
const browserLaunchCounter = new prometheus.Counter({
  name: 'browser_launches_total',
  help: 'Total number of browser launches',
  labelNames: ['browser_type', 'status']
});

const analysisDuration = new prometheus.Histogram({
  name: 'analysis_duration_seconds',
  help: 'Duration of analysis operations',
  labelNames: ['analysis_type', 'status']
});

const activeSessions = new prometheus.Gauge({
  name: 'active_browser_sessions',
  help: 'Number of active browser sessions'
});

module.exports = {
  browserLaunchCounter,
  analysisDuration,
  activeSessions
};
```

### **Logging Configuration**
```javascript
// src/config/logging.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

module.exports = logger;
```

This implementation provides a complete, production-ready integration of Playwright MCP into your AI analyzer architecture, enabling powerful web automation and analysis capabilities.

---

## ✅ Playwright MCP Best Practices (2025)

### Configuration
- Use `headless=true` by default; run headed only for local debugging.
- Pin browsers per CI image; run `npx playwright install --with-deps` in build stage.
- Standardize viewport (1920×1080) and network idle waits (`waitUntil=networkidle`).
- Prefer selectors with test-ids (`data-testid`) to reduce flakiness.

### Stability & Speed
- Consolidate `waitFor*` with auto-waits; avoid arbitrary sleeps.
- Batch navigation and assertions to reduce context switching.
- Reuse browser/context across tests; isolate state via context not browser.
- Capture traces/screenshots on failure; keep video only on failure to save time/space.

### Observability
- Enable tracing around flaky suites (`browser_start_tracing`/`stop_tracing`).
- Export HAR/network logs for performance analysis.
- Surface Core Web Vital approximations via `performance.timing` and paint metrics.

### Security & Compliance
- Mask secrets in screenshots/logs; never log cookies or Authorization headers.
- Run in sandboxed containers; disable devtools in CI.
- Respect robots policies and rate limits for research crawls.

### Accessibility
- Use `browser_snapshot` to validate roles/names/labels in critical flows.
- Fail builds on critical a11y regressions; track score trends over time.

### CI/CD Guidance
- Shard tests by file and retry failed shards only.
- Cache `~/.cache/ms-playwright` between jobs for speed.
- Artifacts: traces, screenshots, HAR, and HTML reports for each run.

#### Example CI job (GitHub Actions)
```yaml
name: e2e
on: [push, pull_request]
jobs:
  playwright:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - name: Install deps
        run: npm ci
      - name: Install browsers
        run: npx playwright install --with-deps
      - name: Run tests
        run: npx playwright test --reporter=html --retries=2 --shard=${{ matrix.shard }}/${{ matrix.total }}
      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report
```

Keep this checklist close to your suites and revisit quarterly.
