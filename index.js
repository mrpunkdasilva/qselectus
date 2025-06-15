/**
 * Selectus - A lightweight library for DOM selection and state management
 */

/**
 * Select multiple DOM elements using CSS selectors
 * @param {Array<string>} selectors - Array of CSS selectors
 * @returns {Array<Element>} - Array of selected DOM elements
 */
function select(selectors) {
  const elements = [];

  selectors.forEach((selector) => {
    const item = document.querySelector(selector);
    elements.push(item);
  });
  
  return elements;
}

/**
 * Select all matching DOM elements for a CSS selector
 * @param {string} selector - CSS selector
 * @returns {Array<Element>} - Array of all matching DOM elements
 */
function selectAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

/**
 * Create a reactive state that can be used with frameworks
 * @param {any} initialState - The initial state value
 * @returns {Object} - State management object with get, set, and subscribe methods
 */
function createState(initialState) {
  let state = initialState;
  const subscribers = new Set();

  const notifySubscribers = () => {
    subscribers.forEach(callback => callback(state));
  };

  return {
    /**
     * Get the current state value
     * @returns {any} - Current state value
     */
    get() {
      return state;
    },
    
    /**
     * Update the state value
     * @param {any|Function} newState - New state value or function that receives the current state and returns the new state
     */
    set(newState) {
      if (typeof newState === 'function') {
        state = newState(state);
      } else {
        state = newState;
      }
      notifySubscribers();
    },
    
    /**
     * Subscribe to state changes
     * @param {Function} callback - Function to call when state changes
     * @returns {Function} - Unsubscribe function
     */
    subscribe(callback) {
      subscribers.add(callback);
      // Call the callback immediately with the current state
      callback(state);
      
      // Return unsubscribe function
      return () => {
        subscribers.delete(callback);
      };
    },
    
    /**
     * Create a derived state that depends on this state
     * @param {Function} deriveFn - Function that derives a new state from the current state
     * @returns {Object} - A new state object with the derived value
     */
    derive(deriveFn) {
      const derivedState = createState(deriveFn(state));
      
      this.subscribe((newState) => {
        derivedState.set(deriveFn(newState));
      });
      
      return derivedState;
    }
  };
}

/**
 * Create a store with multiple state values
 * @param {Object} initialState - Object containing initial state values
 * @returns {Object} - Store object with methods to interact with the state
 */
function createStore(initialState = {}) {
  const states = {};
  const subscribers = new Set();
  
  // Initialize states
  Object.entries(initialState).forEach(([key, value]) => {
    states[key] = value;
  });
  
  const notifySubscribers = () => {
    subscribers.forEach(callback => callback(states));
  };
  
  return {
    /**
     * Get the current state
     * @param {string} [key] - Optional key to get a specific state value
     * @returns {any} - Current state or specific state value
     */
    getState(key) {
      if (key) {
        return states[key];
      }
      return { ...states };
    },
    
    /**
     * Update a specific state value
     * @param {string} key - State key to update
     * @param {any|Function} value - New value or function that receives the current value and returns the new value
     */
    setState(key, value) {
      if (typeof value === 'function') {
        states[key] = value(states[key]);
      } else {
        states[key] = value;
      }
      notifySubscribers();
    },
    
    /**
     * Subscribe to state changes
     * @param {Function} callback - Function to call when state changes
     * @returns {Function} - Unsubscribe function
     */
    subscribe(callback) {
      subscribers.add(callback);
      // Call the callback immediately with the current state
      callback({ ...states });
      
      // Return unsubscribe function
      return () => {
        subscribers.delete(callback);
      };
    },
    
    /**
     * Reset the store to its initial state
     */
    reset() {
      Object.entries(initialState).forEach(([key, value]) => {
        states[key] = value;
      });
      notifySubscribers();
    }
  };
}

/**
 * Connect DOM elements to a state
 * @param {Object} options - Configuration options
 * @param {Array<string>|string} options.selectors - CSS selectors for elements to connect
 * @param {Object} options.state - State object created with createState
 * @param {Function} options.render - Function that receives the state and updates the DOM
 * @returns {Function} - Disconnect function
 */
function connect({ selectors, state, render }) {
  const elements = Array.isArray(selectors) 
    ? select(selectors) 
    : selectAll(selectors);
  
  const unsubscribe = state.subscribe((newState) => {
    render(elements, newState);
  });
  
  return unsubscribe;
}

// Main Selectus function for backward compatibility
function Selectus(selectors) {
  return select(selectors);
}

// Attach all functions to the main export
Selectus.select = select;
Selectus.selectAll = selectAll;
Selectus.createState = createState;
Selectus.createStore = createStore;
Selectus.connect = connect;

export default Selectus;