import Selectus from '../index';

describe('Selectus', () => {
  beforeEach(() => {
    // Set up a mock DOM environment
    document.body.innerHTML = `
      <div id="test-div">Test Div</div>
      <p class="test-paragraph">Test Paragraph</p>
      <button class="test-button">Test Button</button>
    `;
  });

  test('should select elements by their selectors', () => {
    const elements = Selectus(['#test-div', '.test-paragraph', '.test-button']);
    
    expect(elements).toHaveLength(3);
    expect(elements[0].id).toBe('test-div');
    expect(elements[1].className).toBe('test-paragraph');
    expect(elements[2].className).toBe('test-button');
  });

  test('should return an empty array for non-existent elements', () => {
    const elements = Selectus(['.non-existent']);
    
    expect(elements).toHaveLength(1);
    expect(elements[0]).toBeNull();
  });

  test('should handle mixed existing and non-existing selectors', () => {
    const elements = Selectus(['#test-div', '.non-existent']);
    
    expect(elements).toHaveLength(2);
    expect(elements[0].id).toBe('test-div');
    expect(elements[1]).toBeNull();
  });
});