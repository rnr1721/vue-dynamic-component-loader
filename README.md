# Vue Dynamic Component Loader

Vue Dynamic Component Loader is a lightweight, flexible library for dynamically loading and mounting Vue 3 components. It allows you to easily load components on-demand, improving your application's performance and flexibility.

## Features

- Dynamically load Vue 3 components
- Support for custom component paths
- Configurable loading and error templates
- Easy integration with existing Vue projects
- TypeScript support

## Installation

Install the package using npm:

```bash
npm install vue-dynamic-component-loader
```

or yarn

```bash
yarn add vue-dynamic-component-loader
```

## Usage

### Basic Usage

1. Import the initializer function in your main JavaScript/TypeScript file:

```js
import { initVueComponentLoader } from 'vue-dynamic-component-loader';
```

2. Initialize the component loader:

```js
// Example of how to generate the component object
const components = import.meta.glob('/resources/components/*.vue');
initVueComponentLoader(components,'.vue-component');
```

3. In your HTML, use the vue-component class and data-component attribute to specify which  component to load (you need to have MyComponent.vue in your components directory):

```html
<div class="vue-component" data-component="MyComponent"></div>
```

## Advanced Usage

You can customize the component selector

```ts
const components = import.meta.glob('/resources/components/*.vue');
initVueComponentLoader(components, '.my-component-selector');
```

## API

```js
initVueComponentLoader( components: ComponentGlobFunction, componentSelector: string = '.vue-component'): void
```

Initializes the Vue component loader.

- components: Object containing component paths and import functions
- componentSelector: CSS selector for component containers (default: .vue-component)

### VueComponentLoader

A class for loading Vue components.

```js
import { VueComponentLoader } from 'vue-dynamic-component-loader';

const loader = new VueComponentLoader(components);
const component = await loader.loadComponent('MyComponent');
```

### ComponentMounter

A class for mounting Vue components.

```js
import { VueComponentLoader, ComponentMounter } from 'vue-dynamic-component-loader';

const loader = new VueComponentLoader(components);
const mounter = new ComponentMounter(loader);

const element = document.querySelector('.vue-component');
mounter.mountComponent(element, {
  loadingTemplate: '<div>Custom loading...</div>',
  errorTemplate: '<div>Custom error message</div>',
  delay: 200,
  timeout: 3000,
  customPath: '/custom/path'
});
```

## Configuration

You can configure the following options when mounting a component:

- loadingTemplate: HTML template to show while the component is loading
- errorTemplate: HTML template to show if component loading fails
- delay: Delay before showing the loading template (in milliseconds)
- timeout: Timeout for component loading (in milliseconds)
- customPath: Custom path to load the component from

## TypeScript Support

This library is written in TypeScript and includes type definitions. You can import types like this:

```ts
import { ComponentElement, ComponentLoader } from 'vue-dynamic-component-loader';
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## README

This README provides a comprehensive overview of your library, including:

1. A brief introduction
2. Key features
3. Installation instructions
4. Basic and advanced usage examples
5. API documentation
6. Configuration options
7. Information about TypeScript support
8. Guidelines for contributing
9. License information

You may want to adjust some parts based on your specific implementation or add more examples if needed. Also, don't forget to create a LICENSE file if you haven't already.
