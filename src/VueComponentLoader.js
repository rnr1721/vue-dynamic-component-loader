import { __awaiter } from "tslib";
import { createApp, defineAsyncComponent, h } from 'vue';
/**
 * Class for loading Vue components
 * @implements {ComponentLoader}
 */
export class VueComponentLoader {
    /**
     * @param {string} basePath - Base path to components
     * @param {ComponentGlobFunction} globFunction - Function for loading components
     */
    constructor(basePath = '../components', globFunction) {
        this.basePath = basePath;
        this.componentGlob = globFunction || ((path) => ({}));
        this.componentFiles = this.componentGlob(`${this.basePath}/*.vue`);
    }
    /**
     * Loads a component by name
     * @param {string} componentName - Name of the component
     * @param {string} customPath - Custom path (optional)
     * @returns {Promise<ReturnType<typeof vueDefineComponent>>}
     * @throws {Error} If component is not found
     */
    loadComponent(componentName, customPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullPath = customPath
                ? `${customPath}/${componentName}.vue`
                : `${this.basePath}/${componentName}.vue`;
            if (!(fullPath in this.componentFiles)) {
                throw new Error(`Component ${componentName} not found at path: ${fullPath}`);
            }
            const module = yield this.componentFiles[fullPath]();
            return module.default;
        });
    }
}
/**
 * Class for mounting Vue components
 */
export class ComponentMounter {
    /**
     * @param {ComponentLoader} loader - Component loader
     */
    constructor(loader) {
        this.loader = loader;
    }
    /**
     * Mounts a component to a DOM element
     * @param {ComponentElement} el - DOM element for mounting
     * @param {Object} options - Mounting options
     */
    mountComponent(el, options = {}) {
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
    extractProps(el) {
        return Object.entries(el.dataset)
            .filter(([key]) => key !== 'component')
            .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
    }
    /**
     * Applies properties to the element
     * @private
     */
    applyProps(el, props) {
        Object.entries(props).forEach(([key, value]) => {
            el.setAttribute(`:${key}`, value);
        });
    }
}
/**
 * Initializes the Vue component loader
 * @param {string} componentSelector - CSS selector for components
 * @param {string} componentPath - Path to components
 */
export function initVueComponentLoader(componentSelector = '.vue-component', componentPath = '../components') {
    document.addEventListener('DOMContentLoaded', () => {
        const loader = new VueComponentLoader(componentPath);
        const mounter = new ComponentMounter(loader);
        const vueComponents = document.querySelectorAll(componentSelector);
        vueComponents.forEach((el) => {
            const customPath = el.dataset.componentPath;
            mounter.mountComponent(el, { customPath });
        });
    });
}
//# sourceMappingURL=VueComponentLoader.js.map