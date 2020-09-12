DaddyArray
===========

[![Version](http://img.shields.io/npm/v/daddy-array.svg)](https://www.npmjs.org/package/daddy-array)

Really promising asynchronous and parallel work with large arrays without slowing down the GUI.

Install with [npm](https://www.npmjs.com/):

npm:
```sh
npm install daddy-array --save
```

### How to use

```tsx
import {asyncForEach} from "daddy-array";

const arr = [];
for (let i = 0; i < 0xFFFF; i++) arr.push(i);
asyncForEach(arr, x => {
    // SOME ACTION WITH ARRAY ELEMENT X
    return true; // false to cancel
}).then(x => console.log(x ? 'SUCCESS' : 'CANCELLED'));

```

## License

[MIT](LICENSE). Copyright (c) 2020 Vitaliy Dyukar.
