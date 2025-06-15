import Selectus from '../index';

describe('Selectus State Management', () => {
  describe('createState', () => {
    test('should create a state with initial value', () => {
      const state = Selectus.createState(10);
      expect(state.get()).toBe(10);
    });

    test('should update state value', () => {
      const state = Selectus.createState('initial');
      state.set('updated');
      expect(state.get()).toBe('updated');
    });

    test('should update state using a function', () => {
      const state = Selectus.createState(5);
      state.set(prev => prev * 2);
      expect(state.get()).toBe(10);
    });

    test('should notify subscribers when state changes', () => {
      const state = Selectus.createState(0);
      const mockCallback = jest.fn();
      
      const unsubscribe = state.subscribe(mockCallback);
      
      // Should be called immediately with initial state
      expect(mockCallback).toHaveBeenCalledWith(0);
      
      state.set(1);
      expect(mockCallback).toHaveBeenCalledWith(1);
      
      state.set(prev => prev + 1);
      expect(mockCallback).toHaveBeenCalledWith(2);
      
      // Unsubscribe should stop notifications
      unsubscribe();
      state.set(3);
      expect(mockCallback).toHaveBeenCalledTimes(3); // No additional calls
    });

    test('should create derived state', () => {
      const count = Selectus.createState(10);
      const doubled = count.derive(value => value * 2);
      
      expect(doubled.get()).toBe(20);
      
      count.set(5);
      expect(doubled.get()).toBe(10);
    });
  });

  describe('createStore', () => {
    test('should create a store with initial values', () => {
      const store = Selectus.createStore({
        count: 0,
        name: 'John',
        active: true
      });
      
      expect(store.getState('count')).toBe(0);
      expect(store.getState('name')).toBe('John');
      expect(store.getState('active')).toBe(true);
    });

    test('should get the entire state object', () => {
      const store = Selectus.createStore({
        count: 0,
        name: 'John'
      });
      
      expect(store.getState()).toEqual({
        count: 0,
        name: 'John'
      });
    });

    test('should update specific state values', () => {
      const store = Selectus.createStore({
        count: 0,
        name: 'John'
      });
      
      store.setState('count', 5);
      expect(store.getState('count')).toBe(5);
      
      store.setState('name', 'Jane');
      expect(store.getState('name')).toBe('Jane');
    });

    test('should update state using a function', () => {
      const store = Selectus.createStore({
        count: 10
      });
      
      store.setState('count', prev => prev * 2);
      expect(store.getState('count')).toBe(20);
    });

    test('should notify subscribers when state changes', () => {
      const store = Selectus.createStore({
        count: 0,
        name: 'John'
      });
      
      const mockCallback = jest.fn();
      const unsubscribe = store.subscribe(mockCallback);
      
      // Should be called immediately with initial state
      expect(mockCallback).toHaveBeenCalledWith({
        count: 0,
        name: 'John'
      });
      
      store.setState('count', 5);
      expect(mockCallback).toHaveBeenCalledWith({
        count: 5,
        name: 'John'
      });
      
      // Unsubscribe should stop notifications
      unsubscribe();
      store.setState('name', 'Jane');
      expect(mockCallback).toHaveBeenCalledTimes(2); // No additional calls
    });

    test('should reset store to initial values', () => {
      const store = Selectus.createStore({
        count: 0,
        name: 'John'
      });
      
      store.setState('count', 5);
      store.setState('name', 'Jane');
      
      store.reset();
      
      expect(store.getState()).toEqual({
        count: 0,
        name: 'John'
      });
    });
  });
});