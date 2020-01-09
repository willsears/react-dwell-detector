# react-dwell-detector

> A simple component interface for handling user mouse dwells

[![NPM Version][npm-image]][npm-url]

## Intro

A tracking API I was working on was being sent too much data for bar chart hovers. If a user moved the mouse over a bar and out again after a certain amount of time, we wanted to ignore it, as they were probably just moving the mouse through the element to inspect another. Once a user spends a certain amount of time with their mouse inside an element, they are deemed to be "dwelling" on it, and a tracking event should be recorded. This was achieved with closures around mouse event handlers, but the implementation wasn't easily re-usable for other places we wanted to track hovers.

This package attempts to encapsulate the same behaviour in a nicer, more re-usable component interface.

## Install

```bash
npm install --save git+https://github.com/willsears/react-dwell-detector.git
```

## Example

See https://willsears.github.io/react-dwell-detector-example/ to see an app using react-dwell-detector to detect dwells vs simple mouseovers.

## Usage

```javascript
import React from 'react';
import DwellDetector from 'react-dwell-detector';


const CUSTOM_DWELLING_TIME = 300;

const Example = props => {
  const handleDwell = (e, elemProps) => {
    // Do something when user dwells on an element
  };

  return (
    <DwellDetector
      onDwell={handleDwell}
      dwellingTime={CUSTOM_DWELLING_TIME} // Optional, defaults to 333ms
    >
      <MyCustomComponent
        customData={{ id: 1, name: 'Atticus Finch', age: 48 }}
        onMouseOver={() => { /* This will still fire on every mouseover */}}
        onMouseOut={() => { /* This will still fire on every mouseout */}}
      />
    </DwellDetector>;
  );
};
```

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/live-xxx.svg
[npm-url]: https://npmjs.org/package/live-xxx
