import { describe, it, expect, vi } from 'vitest';
import { VueComponentLoader } from '../src/index';
import { defineComponent } from 'vue';

// Component for mock example
const MockComponent = defineComponent({
  name: 'MockComponent',
  template: '<div>Mock Component</div>',
});

describe('VueComponentLoader', () => {
  // Mock function for load components
  const mockGlobFunction = (path: string) => {
    return {
      '/resources/components/MockComponent.vue': () => Promise.resolve({ default: MockComponent }),
      '/custom/path/MockComponent.vue': () => Promise.resolve({ default: MockComponent }),
    };
  };

  it('should instantiate correctly with mock glob function', () => {
    const loader = new VueComponentLoader(mockGlobFunction('/resources/components'));
    expect(loader).toBeDefined();
  });

  it('should load a component by name', async () => {
    const loader = new VueComponentLoader(mockGlobFunction('/resources/components'));
    const component = await loader.loadComponent('MockComponent');
    expect(component).toBe(MockComponent);
  });

  it('should throw an error if the component is not found', async () => {
    const loader = new VueComponentLoader(mockGlobFunction('/resources/components'));
    await expect(loader.loadComponent('NonExistentComponent')).rejects.toThrow('Component NonExistentComponent not found at path');
  });

  // Test for work with user path
  it('should load a component from a custom path', async () => {
    const loader = new VueComponentLoader(mockGlobFunction('/resources/components'));
    const component = await loader.loadComponent('MockComponent', '/custom/path');
    expect(component).toBe(MockComponent);
  });
});
