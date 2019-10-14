let colors = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
let functionalDescriptors = ["l", "m", "n", "o", "r", "k"];

let colorsNames = ["black", "blue", "green", "emerald", "red", "purple", "orange", "gray", "space-gray", "water", "light-green", "diamond", "scarlet", "pink", "yellow", "white"];
let descriptorsClasses = ["large", "line-through", "underline", "italic"];

const DESCRIPTOR_PREFIX = "&";

const RESET_DESCRIPTOR =  DESCRIPTOR_PREFIX + "r";
const OBFUSCATE_DESCRIPTOR = DESCRIPTOR_PREFIX + "k";

/**
 * This function returns a string splitted by got descriptors.
 * For example: getDescriptors("&aLastCraft&c", ["a"]) returns ["&a", "LastCraft&c"]
 * but getDescriptors("&aLastCraft&c", ["a", "c"]) returns ["&a", "LastCraft", "&c"]
 * @param {*} stringName string value
 * @param {*} descriptors supprted descriptors, which will found
 */
function getDescriptors (stringName="", descriptors=[]) {
  let chars = [];
  let isNext = true;
  for (let i = 0; i < stringName.length; i++) {
    if (stringName[i] === DESCRIPTOR_PREFIX && descriptors.indexOf(stringName[i + 1]) !== -1) {
      chars.push(DESCRIPTOR_PREFIX + stringName[i + 1]);
      i++;
      isNext = true;
      continue;
    } else {
      if (isNext) {
        let newString = stringName[i];
        chars.push(newString);
        isNext = false;
      } else {
        let newString = chars[chars.length - 1] + stringName[i];
        chars[chars.length - 1] = newString;
      }
    }
  }
  return chars;
}

/**
 * Returns color name by descriptor like "&0": "black" 
 * @param {*} colorTag string color tag descriptor
 */
function getColorName (colorTag="") {
  if (colors.indexOf(colorTag[1]) !== -1) {
    return colorsNames[colors.indexOf(colorTag[1])]
  } else if (colorTag === RESET_DESCRIPTOR) {
    return "reset";
  } else {
    return "alpha";
  }
}

/**
 * Returns color tag with prefix, or empty string of not have this name
 * @param {*} colorName color name from color property
 */
function getColorTag (colorName="") {
  if (colorsNames.indexOf(colorName) !== -1) {
    return DESCRIPTOR_PREFIX +  colors[colorsNames.indexOf(colorName)]
  } else if (colorName === "reset") {
    return RESET_DESCRIPTOR;
  } else {
    return "";
  }
}


/**
 * Returns colored string object information, Where child - is a functionsl descriptorts and full body of a string 
 * @param {*} stringName minecraft colored string 
 */
function getColoredStringData (stringName="") {

  let chars = [];
  let isObfuscate = false;
  let isColored = "alpha";
  let isBold = false;
  let isItalic = false;
  let isUnderline = false;
  let isLineThrough = false;

  let resultsCodes = [];
  chars = getDescriptors(stringName, [...colors, ...functionalDescriptors]);
  
  

  chars.forEach(char => {
    let lastCode = resultsCodes[resultsCodes.length - 1];

    if (!lastCode) {
      resultsCodes.push({
        value: '',
        isObfuscate,
        isUnderline,
        isLineThrough,
        isItalic,
        isBold,
        color: null
      });

      lastCode = resultsCodes[resultsCodes.length - 1];
    }

    if (colors.indexOf(char[1]) !== -1 && char[0] === DESCRIPTOR_PREFIX) { // Update color
      if (lastCode.color && lastCode.color !== getColorName(char)) {
        // Setting up new code
        resultsCodes.push({
          value: '',
          color: getColorName(char),
          isObfuscate,
          isUnderline,
          isLineThrough,
          isItalic,
          isBold
        });
      } else {
        lastCode.color = getColorName(char);
        resultsCodes[resultsCodes.length - 1] = lastCode;
      }
    } else if (functionalDescriptors.indexOf(char[1]) !== -1 && char[0] === DESCRIPTOR_PREFIX) {
      // Update descriptor
      switch (char[1]) {
        case 'l':
          isBold = true;
          break;
        case 'm':
          isLineThrough = true;
          break;
        case 'n':
          isUnderline = true;
          break;
        case 'o':
          isItalic = true;
          break;
        case 'k':
          isObfuscate = true;
          break;
      }
      
      lastCode = {
        ...lastCode,
        isObfuscate,
        isUnderline,
        isLineThrough,
        isItalic,
        isObfuscate,
        isBold
      }

      resultsCodes[resultsCodes.length - 1] = lastCode;

      if (char === RESET_DESCRIPTOR) {
        isObfuscate = false;
        isUnderline = false;
        isLineThrough = false;
        isItalic = false;
        isObfuscate = false;
        isBold = false;
        isColored = "alpha";
        
        resultsCodes.push({
          value: '',
          isObfuscate,
          isUnderline,
          isLineThrough,
          isItalic,
          isBold,
          color: getColorName(isColored)
        });
      }

    } else {
      // Update value
      lastCode.value += char;
      resultsCodes[resultsCodes.length - 1] = lastCode;
    }
  })


  return resultsCodes;
}

module.exports.getColorTag = getColorTag;
module.exports.getColorName = getColorName;
module.exports.getColoredStringData = getColoredStringData;
module.exports.getDescriptors = getDescriptors;


module.exports.functionalDescriptors = functionalDescriptors;
exports.descriptorsClasses = descriptorsClasses;
exports.colors = colors;

exports.DESCRIPTOR_PREFIX = DESCRIPTOR_PREFIX;
exports.RESET_DESCRIPTOR = RESET_DESCRIPTOR;
exports.OBFUSCATE_DESCRIPTOR = OBFUSCATE_DESCRIPTOR;

exports.default = getColoredStringData;


