# Contributing to Selectus

Thank you for considering contributing to Selectus! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct. Please be respectful and considerate of others.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list to avoid duplicates. When you create a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed and what you expected to see
- Include screenshots if applicable
- Include details about your environment (OS, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are welcome! When suggesting an enhancement:

- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful to most users
- List some examples of how this enhancement would be used

### Pull Requests

- Fill in the required template
- Follow the JavaScript styleguide
- Include appropriate tests
- Update documentation as needed
- End all files with a newline
- Place requires in the following order:
  - Built-in Node modules
  - External modules
  - Internal modules

## Development Workflow

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/qselectus.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Run tests: `npm test`
6. Lint your code: `npm run lint`
7. Build the project: `npm run build`
8. Commit your changes: `git commit -m 'Add some feature'`
9. Push to the branch: `git push origin feature/your-feature-name`
10. Submit a pull request

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### JavaScript Styleguide

All JavaScript code is linted with ESLint. Run `npm run lint` to check your code.

- Use single quotes for strings
- 2 spaces for indentation
- End files with a single newline character
- Remove trailing whitespace
- Use semicolons
- Place spaces after list items and method parameters (`[1, 2, 3]`, not `[1,2,3]`)
- Place spaces around operators (`x += 1`, not `x+=1`)

### Testing

- Include tests for all new features
- Update tests when changing existing functionality
- Ensure all tests pass before submitting a pull request

## Additional Notes

### Issue and Pull Request Labels

This project uses labels to categorize issues and pull requests:

- `bug`: Indicates a confirmed bug or issue
- `enhancement`: Indicates a new feature or request
- `documentation`: Indicates a need for documentation improvements
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed

Thank you for contributing to Selectus!