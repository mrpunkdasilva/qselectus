import Selectus from '../index';

describe('Selectus Connect', () => {
  beforeEach(() => {
    // Set up a mock DOM environment
    document.body.innerHTML = `
      <div id="counter">0</div>
      <span class="count-display">0</span>
      <button id="increment">+</button>
      <button id="decrement">-</button>
    `;
  });

  test('should connect state to DOM elements', () => {
    const counter = Selectus.createState(0);
    const elements = Selectus.select(['#counter', '.count-display']);
    
    const render = jest.fn((elements, value) => {
      elements.forEach(el => {
        el.textContent = value;
      });
    });
    
    const disconnect = Selectus.connect({
      selectors: ['#counter', '.count-display'],
      state: counter,
      render
    });
    
    // Should call render immediately with initial state
    expect(render).toHaveBeenCalledWith(elements, 0);
    
    // Update state
    counter.set(5);
    expect(render).toHaveBeenCalledWith(elements, 5);
    
    // Check DOM updates
    expect(document.querySelector('#counter').textContent).toBe('5');
    expect(document.querySelector('.count-display').textContent).toBe('5');
    
    // Disconnect should stop updates
    disconnect();
    counter.set(10);
    expect(render).toHaveBeenCalledTimes(2); // No additional calls
  });

  test('should connect with selectAll for string selector', () => {
    const counter = Selectus.createState(0);
    
    const render = jest.fn((elements, value) => {
      elements.forEach(el => {
        el.textContent = value;
      });
    });
    
    Selectus.connect({
      selectors: 'button',
      state: counter,
      render
    });
    
    // Should have selected both buttons
    expect(render.mock.calls[0][0].length).toBe(2);
    
    // Update state
    counter.set(5);
    
    // Check DOM updates
    expect(document.querySelector('#increment').textContent).toBe('5');
    expect(document.querySelector('#decrement').textContent).toBe('5');
  });
});