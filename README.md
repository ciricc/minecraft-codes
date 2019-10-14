### Minecraft color codes string to objects

If you wanted once to convert colored server name or some other minecraft colored string in JavaScript, you may be met failure. This library can help you create objects from colored strings to data objects, which you can use for render this colored strings!

#### Simple Example

This is how u can use this library

```javascript
const {getColoredStringData} = require('minecraft-codes');

/*
  Reurns
  {
    childs: [],
    isObfuscate: false,
    color: "&a",
    colorName: "light-green",
    value: ""
  }
*/
getColoredStringData("&a") 
```

### What is this happens?

For render this string you need use only `childs` property. Example:

```javascript
let serverName = "";

getColoredStringData("&aLast&bCraft").forEach((descriptor) => {
  descriptor.childs.forEach(child => {
    serverName += child.value
  });
});

console.log(serverName) // LastCraft
```

### getGolorName

Return color name by `color` value

```javascript

const {getColorName} = require('minecraft-codes');

console.log(getColorName("&0")); // black
console.log(getColorName("&f")); // white
console.log(getColorName("&r")); // reset
console.log(getColorName("&k")); // alpha

```

### Usage

You can use it anywhere where you need render minecraft colored string in JavaScript code.
For example, i used it my React application that show colored server name in list of servers!


Love Minecraft, guys!