# Selectus

[![npm version](https://img.shields.io/npm/v/qselectus.svg)](https://www.npmjs.com/package/qselectus)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CI](https://github.com/MrNullus/qselectus/actions/workflows/ci.yml/badge.svg)](https://github.com/MrNullus/qselectus/actions/workflows/ci.yml)
[![Docker Build](https://github.com/MrNullus/qselectus/actions/workflows/docker.yml/badge.svg)](https://github.com/MrNullus/qselectus/actions/workflows/docker.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/MrNullus/qselectus/pulls)

**Selectus** is a lightweight JavaScript library that simplifies the selection of UI elements and provides state management capabilities. With this library, you can easily select HTML elements, create reactive states, and connect them to your UI frameworks.

## 📦 Installation

You can install **Selectus** in your project using npm:

```bash
npm install qselectus
```

Or using yarn:

```bash
yarn add qselectus
```

## 🚀 Usage

To start using **Selectus**, first import it into your code:

```javascript
import Selectus from 'qselectus';
```

### Element Selection

You can select elements using an array of CSS selectors:

```javascript
const elements = Selectus(['#element1', '.element2', 'button']);
```

Or use the dedicated selection methods:

```javascript
// Select first matching element for each selector
const elements = Selectus.select(['#element1', '.element2', 'button']);

// Select all elements matching a selector
const allButtons = Selectus.selectAll('button');
```

### State Management

Create a reactive state:

```javascript
const counter = Selectus.createState(0);

// Get the current state value
console.log(counter.get()); // 0

// Update the state
counter.set(5);
console.log(counter.get()); // 5

// Update state based on previous state
counter.set(prev => prev + 1);
console.log(counter.get()); // 6

// Subscribe to state changes
const unsubscribe = counter.subscribe(value => {
  console.log(`Counter changed: ${value}`);
});

// Later, unsubscribe when no longer needed
unsubscribe();
```

Create a store with multiple state values:

```javascript
const store = Selectus.createStore({
  count: 0,
  user: { name: 'John', age: 30 },
  theme: 'light'
});

// Get specific state
console.log(store.getState('count')); // 0

// Update specific state
store.setState('count', 5);
store.setState('theme', 'dark');

// Update based on previous state
store.setState('count', prev => prev + 1);

// Subscribe to all state changes
const unsubscribe = store.subscribe(state => {
  console.log('State updated:', state);
});

// Reset store to initial values
store.reset();
```

### Connecting State to DOM

Connect state to DOM elements:

```javascript
const counter = Selectus.createState(0);

// Connect state to DOM elements
const disconnect = Selectus.connect({
  selectors: '#counter, .count-display',
  state: counter,
  render: (elements, value) => {
    elements.forEach(el => {
      el.textContent = `Count: ${value}`;
    });
  }
});

// State changes will automatically update the DOM
counter.set(5);
```

## 🔍 Examples

### Basic Element Selection

```javascript
import Selectus from 'qselectus';

// Select multiple elements with different selectors
const elements = Selectus(['#my-element', '.another-element', 'button.primary']);

// Work with the selected elements
elements.forEach((element) => {
  // Do something with each selected element
  element.addEventListener('click', () => {
    console.log(`Element clicked: ${element.tagName}`);
  });
  
  // Add a class to each element
  element.classList.add('selected');
});
```

### Counter with State Management

```javascript
import Selectus from 'qselectus';

// Create a counter state
const counter = Selectus.createState(0);

// Select DOM elements
const counterDisplay = Selectus.select(['#counter-display'])[0];
const incrementBtn = Selectus.select(['#increment-btn'])[0];
const decrementBtn = Selectus.select(['#decrement-btn'])[0];

// Subscribe to state changes
counter.subscribe(value => {
  counterDisplay.textContent = value;
});

// Add event listeners
incrementBtn.addEventListener('click', () => {
  counter.set(prev => prev + 1);
});

decrementBtn.addEventListener('click', () => {
  counter.set(prev => prev - 1);
});
```

### Todo List with Store

```javascript
import Selectus from 'qselectus';

// Create a store for the todo list
const todoStore = Selectus.createStore({
  todos: [],
  filter: 'all' // 'all', 'active', 'completed'
});

// DOM elements
const todoInput = Selectus.select(['#todo-input'])[0];
const todoList = Selectus.select(['#todo-list'])[0];
const filterButtons = Selectus.selectAll('.filter-btn');

// Add a new todo
function addTodo(text) {
  todoStore.setState('todos', todos => [
    ...todos,
    { id: Date.now(), text, completed: false }
  ]);
}

// Toggle todo completion
function toggleTodo(id) {
  todoStore.setState('todos', todos =>
    todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
}

// Delete a todo
function deleteTodo(id) {
  todoStore.setState('todos', todos => todos.filter(todo => todo.id !== id));
}

// Set filter
function setFilter(filter) {
  todoStore.setState('filter', filter);
}

// Render todos based on current state
todoStore.subscribe(state => {
  const { todos, filter } = state;
  
  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });
  
  // Render todo list
  todoList.innerHTML = '';
  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''}>
      <span>${todo.text}</span>
      <button class="delete-btn">×</button>
    `;
    
    // Add event listeners
    li.querySelector('input').addEventListener('change', () => toggleTodo(todo.id));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(todo.id));
    
    todoList.appendChild(li);
  });
  
  // Update filter buttons
  filterButtons.forEach(btn => {
    const btnFilter = btn.dataset.filter;
    btn.classList.toggle('active', btnFilter === filter);
  });
});

// Setup event listeners
todoInput.addEventListener('keypress', e => {
  if (e.key === 'Enter' && todoInput.value.trim()) {
    addTodo(todoInput.value.trim());
    todoInput.value = '';
  }
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});
```

## 🐳 Docker

You can also run **Selectus** in a Docker container. We provide a Docker setup for development and testing.

### Building the Docker image

```bash
docker build -t qselectus .
```

### Running the container

```bash
docker run -it --rm qselectus
```

## 🤝 Contributing

**Selectus** is an open-source project, and we welcome contributions from the community. If you find issues, have ideas for improvements, or want to add features, feel free to open issues or submit pull requests on the [Selectus GitHub repository](https://github.com/MrNullus/qselectus).

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/MrNullus/qselectus.git
   cd qselectus
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Lint your code:
   ```bash
   npm run lint
   ```

5. Build the library:
   ```bash
   npm run build
   ```

6. Make your changes and submit a pull request!

### Continuous Integration

This project uses GitHub Actions for continuous integration and deployment:

- **CI Workflow**: Automatically runs tests and linting on pull requests and pushes to main branches
- **Publish Workflow**: Automatically publishes the package to npm when a new release is created
- **Docker Workflow**: Builds and pushes Docker images to Docker Hub

### Dependabot

We use Dependabot to keep dependencies up-to-date. It automatically creates pull requests when updates are available for:

- npm packages
- GitHub Actions
- Docker images

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

---

We hope **Selectus** makes selecting and manipulating UI elements easier in your projects. If you have any questions or need assistance, don't hesitate to reach out.