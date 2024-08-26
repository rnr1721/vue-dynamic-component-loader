import { defineComponent } from 'vue';

/**
 * Represents a DOM element that can be used as a Vue component container.
 * Extends the standard HTMLElement with specific dataset requirements.
 */
export interface ComponentElement extends HTMLElement {
  dataset: {
    /**
     * The name of the Vue component to be loaded and mounted.
     */
    component: string;
    /**
     * Additional data attributes that can be passed to the component.
     */
    [key: string]: string;
  };
}

/**
 * Defines the interface for a component loader.
 * This is used to dynamically load Vue components.
 */
export interface ComponentLoader {
  /**
   * Loads a Vue component asynchronously.
   * 
   * @param componentName - The name of the component to load.
   * @param customPath - Optional custom path to load the component from.
   * @returns A Promise that resolves to the loaded Vue component.
   */
  loadComponent(componentName: string, customPath?: string): Promise<ReturnType<typeof defineComponent>>;
}
