# Brave Search MCP Integration Guide

**Owner:** Tina Marcus  
**License:** MIT  
**Repository:** Open Source Project

## Environment Status
- BRAVE_API_KEY: configured via .env (value hidden)
- BRAVE_MCP_TRANSPORT=http, BRAVE_MCP_PORT=8080, BRAVE_MCP_HOST=0.0.0.0

### Validate the Brave key (no secret printed)
```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  -H "X-Subscription-Token: $BRAVE_API_KEY" \
  "https://api.search.brave.com/res/v1/web/search?q=healthcheck&count=1"
```
Expected: 200

## 🚀 **Quick Start**

### **1. Installation**
```bash
# Install Brave Search MCP server
npm install @brave/brave-search-mcp-server

# Set up environment variables
export BRAVE_API_KEY="your-brave-api-key-here"
export BRAVE_MCP_TRANSPORT="http"
export BRAVE_MCP_PORT=8080
export BRAVE_MCP_HOST="0.0.0.0"

# Start MCP server
npx @brave/brave-search-mcp-server --transport http --port 8080
```

### **2. Basic Setup**
```javascript
// search-service.js
const express = require('express');
const axios = require('axios');
const { BraveSearchMCP } = require('@brave/brave-search-mcp-server');

const app = express();
const braveSearch = new BraveSearchMCP({
  apiKey: process.env.BRAVE_API_KEY,
  transport: 'http',
  port: 8080,
  host: '0.0.0.0'
});

app.use(express.json());
app.use(cors());
app.use(helmet());

// Start Brave Search MCP server
braveSearch.start();

// Your API routes here
app.listen(3000, () => {
  console.log('AI Analyzer with Brave Search MCP running on port 3000');
});
```

## 🔧 **Search Service Implementation**

### **Service Structure**
```
search-service/
├── src/
│   ├── controllers/
│   │   ├── searchController.js
│   │   ├── newsController.js
│   │   ├── imageController.js
│   │   └── trendController.js
│   ├── services/
│   │   ├── braveSearchService.js
│   │   ├── summarizationService.js
│   │   └── analyticsService.js
│   ├── models/
│   │   ├── SearchResult.js
│   │   ├── NewsArticle.js
│   │   └── TrendData.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── rateLimit.js
│   │   └── validation.js
│   └── routes/
│       ├── search.js
│       ├── news.js
│       ├── images.js
│       └── trends.js
├── config/
│   ├── braveSearch.config.js
│   └── database.js
└── tests/
    ├── search.test.js
    └── news.test.js
```

### **Core Brave Search Service**
```javascript
// src/services/braveSearchService.js
const axios = require('axios');

class BraveSearchService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.search.brave.com/res/v1';
    this.headers = {
      'X-Subscription-Token': apiKey,
      'Content-Type': 'application/json'
    };
  }

  async webSearch(query, options = {}) {
    try {
      const params = {
        q: query,
        count: options.count || 10,
        offset: options.offset || 0,
        country: options.country || 'US',
        search_lang: options.search_lang || 'en',
        ui_lang: options.ui_lang || 'en-US',
        freshness: options.freshness || 'pd',
        safesearch: options.safesearch || 'moderate',
        spellcheck: options.spellcheck !== false,
        summary: options.summary || false,
        extra_snippets: options.extra_snippets || false,
        ...options
      };

      const response = await axios.get(`${this.baseURL}/web/search`, {
        headers: this.headers,
        params
      });

      return {
        success: true,
        data: response.data,
        query: query,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Web search failed: ${error.message}`);
    }
  }

  async newsSearch(query, options = {}) {
    try {
      const params = {
        q: query,
        count: options.count || 20,
        offset: options.offset || 0,
        country: options.country || 'US',
        search_lang: options.search_lang || 'en',
        ui_lang: options.ui_lang || 'en-US',
        freshness: options.freshness || 'pd',
        safesearch: options.safesearch || 'moderate',
        spellcheck: options.spellcheck !== false,
        extra_snippets: options.extra_snippets || false,
        ...options
      };

      const response = await axios.get(`${this.baseURL}/news/search`, {
        headers: this.headers,
        params
      });

      return {
        success: true,
        data: response.data,
        query: query,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`News search failed: ${error.message}`);
    }
  }

  async imageSearch(query, options = {}) {
    try {
      const params = {
        q: query,
        count: options.count || 20,
        offset: options.offset || 0,
        country: options.country || 'US',
        search_lang: options.search_lang || 'en',
        ui_lang: options.ui_lang || 'en-US',
        safesearch: options.safesearch || 'moderate',
        spellcheck: options.spellcheck !== false,
        ...options
      };

      const response = await axios.get(`${this.baseURL}/images/search`, {
        headers: this.headers,
        params
      });

      return {
        success: true,
        data: response.data,
        query: query,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Image search failed: ${error.message}`);
    }
  }

  async videoSearch(query, options = {}) {
    try {
      const params = {
        q: query,
        count: options.count || 20,
        offset: options.offset || 0,
        country: options.country || 'US',
        search_lang: options.search_lang || 'en',
        ui_lang: options.ui_lang || 'en-US',
        freshness: options.freshness || 'pd',
        safesearch: options.safesearch || 'moderate',
        spellcheck: options.spellcheck !== false,
        ...options
      };

      const response = await axios.get(`${this.baseURL}/videos/search`, {
        headers: this.headers,
        params
      });

      return {
        success: true,
        data: response.data,
        query: query,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Video search failed: ${error.message}`);
    }
  }

  async localSearch(query, location, options = {}) {
    try {
      const params = {
        q: query,
        count: options.count || 20,
        offset: options.offset || 0,
        country: options.country || 'US',
        search_lang: options.search_lang || 'en',
        ui_lang: options.ui_lang || 'en-US',
        safesearch: options.safesearch || 'moderate',
        spellcheck: options.spellcheck !== false,
        ...options
      };

      if (location) {
        params.lat = location.lat;
        params.lng = location.lng;
        params.radius = location.radius || 10;
      }

      const response = await axios.get(`${this.baseURL}/local/search`, {
        headers: this.headers,
        params
      });

      return {
        success: true,
        data: response.data,
        query: query,
        location: location,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Local search failed: ${error.message}`);
    }
  }

  async summarizeContent(summaryKey, options = {}) {
    try {
      const params = {
        key: summaryKey,
        entity_info: options.entity_info || false,
        inline_references: options.inline_references || false
      };

      const response = await axios.get(`${this.baseURL}/summarizer`, {
        headers: this.headers,
        params
      });

      return {
        success: true,
        data: response.data,
        summaryKey: summaryKey,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Summarization failed: ${error.message}`);
    }
  }

  async analyzeTrends(query, timeRange = '7d', options = {}) {
    try {
      // This would be a custom implementation for trend analysis
      // using multiple search queries over time
      const searches = await this.performTrendSearches(query, timeRange, options);
      
      const trendData = this.calculateTrendMetrics(searches);
      
      return {
        success: true,
        data: trendData,
        query: query,
        timeRange: timeRange,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Trend analysis failed: ${error.message}`);
    }
  }

  async performTrendSearches(query, timeRange, options) {
    const searches = [];
    const intervals = this.getTimeIntervals(timeRange);
    
    for (const interval of intervals) {
      const searchOptions = {
        ...options,
        freshness: interval.freshness
      };
      
      const result = await this.webSearch(query, searchOptions);
      searches.push({
        ...result,
        interval: interval
      });
    }
    
    return searches;
  }

  getTimeIntervals(timeRange) {
    const intervals = {
      '24h': [
        { freshness: 'pd', label: 'Last 24 hours' }
      ],
      '7d': [
        { freshness: 'pd', label: 'Last 24 hours' },
        { freshness: 'pw', label: 'Last 7 days' }
      ],
      '30d': [
        { freshness: 'pd', label: 'Last 24 hours' },
        { freshness: 'pw', label: 'Last 7 days' },
        { freshness: 'pm', label: 'Last 30 days' }
      ],
      '90d': [
        { freshness: 'pd', label: 'Last 24 hours' },
        { freshness: 'pw', label: 'Last 7 days' },
        { freshness: 'pm', label: 'Last 30 days' }
      ],
      '1y': [
        { freshness: 'pd', label: 'Last 24 hours' },
        { freshness: 'pw', label: 'Last 7 days' },
        { freshness: 'pm', label: 'Last 30 days' },
        { freshness: 'py', label: 'Last year' }
      ]
    };
    
    return intervals[timeRange] || intervals['7d'];
  }

  calculateTrendMetrics(searches) {
    const metrics = {
      totalResults: 0,
      averageResults: 0,
      trendDirection: 'stable',
      peakPeriod: null,
      lowPeriod: null,
      growthRate: 0
    };

    if (searches.length === 0) return metrics;

    // Calculate total results
    metrics.totalResults = searches.reduce((sum, search) => {
      return sum + (search.data.web?.results?.length || 0);
    }, 0);

    // Calculate average results
    metrics.averageResults = metrics.totalResults / searches.length;

    // Find peak and low periods
    const results = searches.map(s => s.data.web?.results?.length || 0);
    const maxIndex = results.indexOf(Math.max(...results));
    const minIndex = results.indexOf(Math.min(...results));

    metrics.peakPeriod = searches[maxIndex]?.interval?.label;
    metrics.lowPeriod = searches[minIndex]?.interval?.label;

    // Calculate growth rate
    if (searches.length >= 2) {
      const first = results[0];
      const last = results[results.length - 1];
      metrics.growthRate = ((last - first) / first) * 100;
    }

    // Determine trend direction
    if (metrics.growthRate > 10) {
      metrics.trendDirection = 'increasing';
    } else if (metrics.growthRate < -10) {
      metrics.trendDirection = 'decreasing';
    } else {
      metrics.trendDirection = 'stable';
    }

    return metrics;
  }
}

module.exports = BraveSearchService;
```

### **Search Controllers**
```javascript
// src/controllers/searchController.js
const BraveSearchService = require('../services/braveSearchService');

class SearchController {
  constructor() {
    this.braveSearch = new BraveSearchService(process.env.BRAVE_API_KEY);
  }

  async webSearch(req, res) {
    try {
      const { query, ...options } = req.body;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Query parameter is required'
        });
      }

      const result = await this.braveSearch.webSearch(query, options);
      
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

  async newsSearch(req, res) {
    try {
      const { query, ...options } = req.body;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Query parameter is required'
        });
      }

      const result = await this.braveSearch.newsSearch(query, options);
      
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

  async imageSearch(req, res) {
    try {
      const { query, ...options } = req.body;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Query parameter is required'
        });
      }

      const result = await this.braveSearch.imageSearch(query, options);
      
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

  async videoSearch(req, res) {
    try {
      const { query, ...options } = req.body;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Query parameter is required'
        });
      }

      const result = await this.braveSearch.videoSearch(query, options);
      
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

  async localSearch(req, res) {
    try {
      const { query, location, ...options } = req.body;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Query parameter is required'
        });
      }

      const result = await this.braveSearch.localSearch(query, location, options);
      
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

  async summarizeContent(req, res) {
    try {
      const { key, ...options } = req.body;
      
      if (!key) {
        return res.status(400).json({
          success: false,
          error: 'Summary key is required'
        });
      }

      const result = await this.braveSearch.summarizeContent(key, options);
      
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

  async analyzeTrends(req, res) {
    try {
      const { query, time_range, ...options } = req.body;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Query parameter is required'
        });
      }

      const result = await this.braveSearch.analyzeTrends(query, time_range, options);
      
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

module.exports = SearchController;
```

### **API Routes**
```javascript
// src/routes/search.js
const express = require('express');
const SearchController = require('../controllers/searchController');
const auth = require('../middleware/auth');
const rateLimit = require('../middleware/rateLimit');
const validation = require('../middleware/validation');

const router = express.Router();
const searchController = new SearchController();

// Apply authentication and rate limiting
router.use(auth);
router.use(rateLimit.search);

// Search routes
router.post('/web', validation.webSearch, searchController.webSearch);
router.post('/news', validation.newsSearch, searchController.newsSearch);
router.post('/images', validation.imageSearch, searchController.imageSearch);
router.post('/videos', validation.videoSearch, searchController.videoSearch);
router.post('/local', validation.localSearch, searchController.localSearch);
router.post('/summarize', validation.summarize, searchController.summarizeContent);
router.post('/trends', validation.trends, searchController.analyzeTrends);

module.exports = router;
```

## 🧪 **Testing**

### **Unit Tests**
```javascript
// tests/search.test.js
const BraveSearchService = require('../src/services/braveSearchService');

describe('BraveSearchService', () => {
  let braveSearch;
  
  beforeEach(() => {
    braveSearch = new BraveSearchService('test-api-key');
  });
  
  test('should perform web search successfully', async () => {
    // Mock axios response
    const mockResponse = {
      data: {
        web: {
          results: [
            { title: 'Test Result', url: 'https://example.com', description: 'Test description' }
          ]
        }
      }
    };
    
    jest.spyOn(require('axios'), 'get').mockResolvedValue(mockResponse);
    
    const result = await braveSearch.webSearch('test query');
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.query).toBe('test query');
  });
  
  test('should handle search errors gracefully', async () => {
    jest.spyOn(require('axios'), 'get').mockRejectedValue(new Error('API Error'));
    
    await expect(braveSearch.webSearch('test query')).rejects.toThrow('Web search failed: API Error');
  });
});
```

## 🚀 **Deployment**

### **Docker Configuration**
```dockerfile
# Dockerfile
FROM node:18-alpine

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Set environment variables
ENV BRAVE_API_KEY=""
ENV BRAVE_MCP_TRANSPORT="http"
ENV BRAVE_MCP_PORT=8080

# Expose port
EXPOSE 8080

# Start the application
CMD ["node", "search-service.js"]
```

### **Docker Compose**
```yaml
# docker-compose.yml
version: '3.8'

services:
  search-service:
    build: .
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - BRAVE_API_KEY=${BRAVE_API_KEY}
      - BRAVE_MCP_TRANSPORT=http
      - BRAVE_MCP_PORT=8080
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

## 📊 **Monitoring & Analytics**

### **Search Analytics**
```javascript
// src/middleware/analytics.js
const prometheus = require('prom-client');

// Create metrics
const searchCounter = new prometheus.Counter({
  name: 'search_requests_total',
  help: 'Total number of search requests',
  labelNames: ['search_type', 'country', 'status']
});

const searchDuration = new prometheus.Histogram({
  name: 'search_duration_seconds',
  help: 'Duration of search operations',
  labelNames: ['search_type', 'country']
});

const searchResults = new prometheus.Gauge({
  name: 'search_results_count',
  help: 'Number of search results returned',
  labelNames: ['search_type', 'country']
});

module.exports = {
  searchCounter,
  searchDuration,
  searchResults
};
```

### **Rate Limiting**
```javascript
// src/middleware/rateLimit.js
const rateLimit = require('express-rate-limit');

const searchRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 200, // 200 requests per minute
  message: {
    success: false,
    error: 'Too many search requests, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  search: searchRateLimit
};
```

This implementation provides a complete, production-ready integration of Brave Search MCP into your AI analyzer architecture, enabling powerful search and discovery capabilities with comprehensive analytics and monitoring.
