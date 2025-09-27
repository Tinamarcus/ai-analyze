# Contributing to AI Code Analyzer & Product Research Platform

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 8+
- Git
- Basic understanding of TypeScript/JavaScript

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/tinamarcus/ai-code-analyzer-platform.git
   cd ai-code-analyzer-platform
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Add your API keys to .env (see .env.example for required keys)
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

## 📋 Development Workflow

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test improvements

### Commit Messages
Follow conventional commits:
```
type(scope): description

feat(api): add new analysis endpoint
fix(ui): resolve dashboard loading issue
docs(readme): update installation instructions
```

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, well-documented code
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   npm test
   npm run lint
   ```

4. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Provide clear description of changes
   - Link related issues
   - Add screenshots for UI changes

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests
- Unit tests for individual functions
- Integration tests for API endpoints
- End-to-end tests for critical user flows
- Aim for >80% code coverage

## 📝 Code Style

### ESLint Configuration
We use ESLint for code quality. Run linting:
```bash
npm run lint
npm run lint:fix  # Auto-fix issues
```

### Prettier
Code formatting is handled by Prettier:
```bash
npm run format
```

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` types when possible

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions and classes
- Include parameter descriptions and return types
- Provide usage examples for complex functions

### README Updates
- Update README.md for new features
- Add installation/setup instructions for new dependencies
- Include configuration examples

## 🐛 Bug Reports

### Before Reporting
1. Check existing issues
2. Try latest version
3. Verify it's not a configuration issue

### Bug Report Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior.

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Node.js version: [e.g. 18.17.0]
- npm version: [e.g. 9.6.7]

**Additional context**
Any other relevant information.
```

## ✨ Feature Requests

### Before Requesting
1. Check existing feature requests
2. Consider if it aligns with project goals
3. Think about implementation complexity

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or workarounds.

**Additional context**
Any other context about the feature request.
```

## 🔒 Security

### Reporting Security Issues
Please do NOT report security vulnerabilities through public GitHub issues.

Instead, please email security concerns to: security@tinamarcus.dev

### Security Guidelines
- Never commit API keys or secrets
- Use environment variables for sensitive data
- Validate all user inputs
- Follow OWASP security guidelines

## 🏷️ Release Process

### Versioning
We follow semantic versioning (SemVer):
- `MAJOR.MINOR.PATCH`
- Breaking changes = MAJOR
- New features = MINOR  
- Bug fixes = PATCH

### Release Checklist
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Release notes prepared

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on what's best for the community

### Getting Help
- Check documentation first
- Search existing issues
- Ask questions in GitHub Discussions
- Join our community channels

## 📞 Contact

- **Project Owner**: Tina Marcus
- **Email**: contact@tinamarcus.dev
- **GitHub**: [@tinamarcus](https://github.com/tinamarcus)

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to make this project better! 🎉
