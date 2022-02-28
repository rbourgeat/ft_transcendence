# useWindowSize - Custom React Hook

[![](https://img.shields.io/npm/v/react-use-window-size.svg?style=flat)](https://github.com/danielkhoo/react-use-window-size)
[![](https://img.shields.io/bundlephobia/min/react-use-window-size.svg?style=flat)](https://github.com/danielkhoo/react-use-window-size)

A custom React Hook to get the window dimensions including resizing.

Useful for implementing responsive behavior, modifying elements for different screen sizes.

## Install

`$ npm install react-use-window-size`

## Usage

```js
import useWindowSize from './useWindowSize';

const { width, height } = useWindowSize();

console.log(width, height); //Current window size i.e. 1366 768
```

## License

MIT
