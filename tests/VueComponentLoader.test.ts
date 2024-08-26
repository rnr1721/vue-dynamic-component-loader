import { VueComponentLoader, ComponentMounter } from '../src/VueComponentLoader';
import { ComponentElement } from '../src/types';
import * as Vue from 'vue';
import { mount } from '@vue/test-utils';

// Mock for Vue.createApp
jest.mock('vue', () => ({
  ...jest.requireActual('vue'),
  createApp: jest.fn()
}));

// Mock for import.meta.glob
jest.mock('../src/VueComponentLoader', () => {
  const originalModule = jest.requireActual('../src/VueComponentLoader');
  return {
    ...originalModule,
    VueComponentLoader: class MockVueComponentLoader {
      loadComponent() {
        return Promise.resolve({ template: '<div>Mocked Component</div>' });
      }
    }
  };
});

describe('VueComponentLoader', () => {
  it('should load a component', async () => {
    const loader = new VueComponentLoader();
    const component = await loader.loadComponent('TestComponent');
    expect(component).toBeDefined();
  });
});

describe('ComponentMounter', () => {
  it('should mount a component', () => {
    const loader = new VueComponentLoader();
    const mounter = new ComponentMounter(loader);

    // Create test DOM-элемент
    document.body.innerHTML = '<div class="vue-component" data-component="TestComponent"></div>';
    const el = document.querySelector('.vue-component') as ComponentElement;

    // Add component property to dataset
    Object.defineProperty(el, 'dataset', {
      writable: true,
      value: { component: 'TestComponent' }
    });

    // Mock up createApp
    const mockMount = jest.fn();
    const mockApp = { mount: mockMount };
    (Vue.createApp as jest.Mock).mockReturnValue(mockApp);

    mounter.mountComponent(el);

    expect(Vue.createApp).toHaveBeenCalled();
    expect(mockMount).toHaveBeenCalledWith(el, true);
  });
});
