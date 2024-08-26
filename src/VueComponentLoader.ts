import { createApp, defineAsyncComponent, h, defineComponent as vueDefineComponent } from 'vue';
import { ComponentElement, ComponentLoader } from './types';

/** Type for component loading function */
type ComponentGlobFunction = Record<string, () => Promise<any>>;

/**
 * Class for loading Vue components
 * @implements {ComponentLoader}
 */
export class VueComponentLoader implements ComponentLoader {
  private componentFiles: ComponentGlobFunction;

  /**
   * @param {ComponentGlobFunction} componentFiles - Object containing component paths and import functions
   */
  constructor(componentFiles: ComponentGlobFunction) {
    this.componentFiles = componentFiles;
  }

  /**
   * Loads a component by name
   * @param {string} componentName - Name of the component
   * @param {string} customPath - Custom path (optional)
   * @returns {Promise<ReturnType<typeof vueDefineComponent>>}
   * @throws {Error} If component is not found
   */
  async loadComponent(componentName: string, customPath?: string): Promise<ReturnType<typeof vueDefineComponent>> {
    const fullPath = customPath
      ? `${customPath}/${componentName}.vue`
      : `/resources/components/${componentName}.vue`;

    if (!(fullPath in this.componentFiles)) {
      throw new Error(`Component ${componentName} not found at path: ${fullPath}`);
    }

    const module = await this.componentFiles[fullPath]();
    return module.default;
  }
}

/**
 * Class for mounting Vue components
 */
export class ComponentMounter {
  private loader: ComponentLoader;

  /**
   * @param {ComponentLoader} loader - Component loader
   */
  constructor(loader: ComponentLoader) {
    this.loader = loader;
  }

  /**
   * Mounts a component to a DOM element
   * @param {ComponentElement} el - DOM element for mounting
   * @param {Object} options - Mounting options
   */
  mountComponent(el: ComponentElement, options: {
    loadingTemplate?: string;
    errorTemplate?: string;
    delay?: number;
    timeout?: number;
    customPath?: string;
  } = {}): void {
    const componentName = el.dataset.component;
    if (!componentName) {
      console.error('Component name not specified');
      return;
    }

    const AsyncComp = defineAsyncComponent({
      loader: () => this.loader.loadComponent(componentName, options.customPath),
      loadingComponent: { template: options.loadingTemplate || '<div>Loading...</div>' },
      errorComponent: { template: options.errorTemplate || '<div>Error loading component</div>' },
      delay: options.delay || 200,
      timeout: options.timeout || 3000,
    });

    const app = createApp({
      render() {
        return h(AsyncComp, this.$attrs);
      }
    });

    const props = this.extractProps(el);
    app.mount(el, true);
    this.applyProps(el, props);

    console.log(`App mounted for component: ${componentName}`);
  }

  /**
   * Extracts properties from element's data attributes
   * @private
   */
  private extractProps(el: ComponentElement): Record<string, string> {
    return Object.entries(el.dataset)
      .filter(([key]) => key !== 'component')
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
  }

  /**
   * Applies properties to the element
   * @private
   */
  private applyProps(el: HTMLElement, props: Record<string, string>): void {
    Object.entries(props).forEach(([key, value]) => {
      el.setAttribute(`:${key}`, value);
    });
  }
}

/**
 * Initializes the Vue component loader
 * @param {ComponentGlobFunction} components - Object containing component paths and import functions
 * @param {string} componentSelector - CSS selector for components
 */
export function initVueComponentLoader( components: ComponentGlobFunction, componentSelector: string = '.vue-component'): void {
  document.addEventListener('DOMContentLoaded', () => {
    const loader = new VueComponentLoader(components);
    const mounter = new ComponentMounter(loader);
    const vueComponents = document.querySelectorAll<ComponentElement>(componentSelector);
    vueComponents.forEach((el) => {
      const customPath = el.dataset.componentPath;
      mounter.mountComponent(el, { customPath });
    });
  });
}
