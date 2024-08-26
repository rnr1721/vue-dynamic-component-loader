import { __awaiter } from "tslib";
import { VueComponentLoader, ComponentMounter } from '../src/VueComponentLoader';
import * as Vue from 'vue';
// Mock for Vue.createApp
jest.mock('vue', () => (Object.assign(Object.assign({}, jest.requireActual('vue')), { createApp: jest.fn() })));
// Mock for import.meta.glob
jest.mock('../src/VueComponentLoader', () => {
    const originalModule = jest.requireActual('../src/VueComponentLoader');
    return Object.assign(Object.assign({}, originalModule), { VueComponentLoader: class MockVueComponentLoader {
            loadComponent() {
                return Promise.resolve({ template: '<div>Mocked Component</div>' });
            }
        } });
});
describe('VueComponentLoader', () => {
    it('should load a component', () => __awaiter(void 0, void 0, void 0, function* () {
        const loader = new VueComponentLoader();
        const component = yield loader.loadComponent('TestComponent');
        expect(component).toBeDefined();
    }));
});
describe('ComponentMounter', () => {
    it('should mount a component', () => {
        const loader = new VueComponentLoader();
        const mounter = new ComponentMounter(loader);
        // Create test DOM-элемент
        document.body.innerHTML = '<div class="vue-component" data-component="TestComponent"></div>';
        const el = document.querySelector('.vue-component');
        // Add component property to dataset
        Object.defineProperty(el, 'dataset', {
            writable: true,
            value: { component: 'TestComponent' }
        });
        // Mock up createApp
        const mockMount = jest.fn();
        const mockApp = { mount: mockMount };
        Vue.createApp.mockReturnValue(mockApp);
        mounter.mountComponent(el);
        expect(Vue.createApp).toHaveBeenCalled();
        expect(mockMount).toHaveBeenCalledWith(el, true);
    });
});
//# sourceMappingURL=VueComponentLoader.test.js.map