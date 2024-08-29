# Vue Dynamic Component Loader

Vue Dynamic Component Loader is a lightweight, flexible library for dynamically loading and mounting Vue 3 components. It allows you to easily load components on-demand, improving your application's performance and flexibility.

## Real-Life Example: Where This Might Be Needed

Imagine you are working on a Laravel (for example) project that uses its own routing system and Blade templating engine. You want to leverage Vue.js only in specific parts of the page where it's truly needed, such as interactive widgets, forms, or dynamic content areas.

In this scenario, manually managing the integration of Vue components into your Blade templates could become tedious, especially when you have multiple components that need to be conditionally loaded based on the page or user interaction.

By using vue-dynamic-component-loader, you can:

- Seamlessly integrate Vue.js components into your Blade templates without cluttering your code with numerous import statements.
- Dynamically load components only when necessary, reducing the initial load time and improving the overall performance of your application.
- Easily manage and scale the use of Vue.js in your Laravel project by automating the process of discovering and loading components.

This approach is ideal for projects where you want to keep the use of Vue.js focused and efficient, enhancing the user experience without overloading the page with unnecessary scripts.

## Why It's Necessary and What It Offers to Users

vue-dynamic-component-loader is a tool that significantly simplifies working with dynamic components in Vue.js. Normally, to dynamically load components, a developer needs to write a lot of code to handle various cases and paths to components. This can lead to a complex and hard-to-manage project structure.

With vue-dynamic-component-loader, you get the following benefits:

- Reduced Code Complexity: No more manual management of imports and dynamic component paths. The package automatically finds and loads components from the specified directory.
- Improved Maintainability and Extensibility: The code becomes simpler and easier to maintain, allowing you to focus on the core logic of your application rather than on infrastructure tasks.
- Time Savings: Quick setup and integration of the package into your project help reduce development time and increase productivity.
- Versatility: The package is suitable for projects of any complexity, from small to large, where flexible component management is required.

Using vue-dynamic-component-loader ensures a cleaner and more organized code structure, which is especially important when working on large Vue.js projects.

## Features

- Dynamically load Vue 3 components
- Support for custom component paths
- Configurable loading and error templates
- Easy integration with existing Vue projects
- TypeScript support

## Requirements

To use vue-dynamic-component-loader, your project needs to meet the following requirements:

- Vue.js: The package is designed to work with Vue.js (version 3.x).
- Vite or Webpack: A module bundler like Vite or Webpack is required to handle dynamic imports (import.meta.glob).
- TypeScript (optional): The package is written in TypeScript, but it can be used in both TypeScript and JavaScript projects. If you're using TypeScript, ensure your environment is properly configured.

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

Or you can use recursive search components in directory:

```ts
const components = import.meta.glob('/resources/components/**/*.vue');
initVueComponentLoader(components, '.my-component-selector');
```

```html
<div class="vue-component" data-component="MyComponent"></div>
<div class="vue-component" data-component="addons/MyComponent"></div>
<div class="vue-component" data-component="addons2/MyComponent3"></div>
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
