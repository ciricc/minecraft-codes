# Minecraft color codes string to objects

If you wanted once to convert colored server name or some other minecraft colored string in JavaScript, you may be met failure. This library can help you create objects from colored strings to data objects, which you can use for render this colored strings!

### Installation

```shell
npm i minecraft-codes
```

Or

```shell
yarn add minecraft-codes
```

#### Simple Example

This is how u can use this library

```javascript

const {getColoredStringData, getColorTag, getColorName} = require('minecraft-codes');

getColoredStringData("&aLast&bCraft").forEach(word => {
  console.log(word.color) // light-green and water
  console.log(getColorTag(word.color)) //&a and &b
  console.log(word.color === getColorName(getColorTag(word.color))) // true true
  console.log(word.value) // "Last" and "Craft"
})

```

#### And more

```javascript
getColoredStringData("&c&k| &l&r&aLast&eCraft")
/*
[ { value: '| ',
    isObfuscate: true,
    isUnderline: false,
    isLineThrough: false,
    isItalic: false,
    isBold: false,
    color: 'scarlet' },
  { value: '',
    isObfuscate: false,
    isUnderline: false,
    isLineThrough: false,
    isItalic: false,
    isBold: false,
    color: 'alpha' },
  { value: 'Last',
    color: 'light-green',
    isObfuscate: false,
    isUnderline: false,
    isLineThrough: false,
    isItalic: false,
    isBold: false },
  { value: 'Craft',
    color: 'yellow',
    isObfuscate: false,
    isUnderline: false,
    isLineThrough: false,
    isItalic: false,
    isBold: false } ]
*/
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

### Word properties

- <b>isObfuscate</b> - need or not enable obfuscation animation
- <b>isBold</b> - need render this string as a <b>bold</b> (larget weight font)
- <b>isItalic</b> - need or not render this string as an <i>italic</i>
- <b>isUnderline</b> - need or not render this string as an <u>underline</u>
- <b>isLineThrough</b> - need or not render this string as an <strike>line trough</strike>
- <b>color</b> - color name, may be: `black, blue, green, emerald, red, purple, orange, gray, space-gray, water, light-green, diamond, scarlet, pink, yellow, white`
- <b>value</b> - value string for this step rendering

### Usage

You can use it anywhere where you need render minecraft colored string in JavaScript code.
For example, i used it my React application that show colored server name in list of servers!


Love Minecraft, guys!