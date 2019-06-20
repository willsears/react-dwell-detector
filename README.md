# react-dwell-detector

> A simple component interface for handling user mouse dwells

[![NPM Version][npm-image]][npm-url]

## Install

```bash
npm i --save react-dwell-detector
```

## Example

See https://a-website-i-need-to-make for an example use-case using `react-dwell-detector`: submitting requests to a tracking API.

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
