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
 * Returns colored string object information, Where child - is a functionsl descriptorts and full body of a string 
 * @param {*} stringName minecraft colored string 
 */
function getColoredStringData (stringName="") {

  let chars = [];
  let resultsCodes = [];


  chars = getDescriptors(stringName, colors);
  chars.forEach(chars => {
    if (chars[0] === DESCRIPTOR_PREFIX && colors.indexOf(chars[1]) !== -1) {
      resultsCodes.push({
        value: '',
        color: chars,
        colorName: getColorName(chars[1]),
        childs: [],
        isObfuscate: false
      });
    } else {
      let resultCode = resultsCodes[resultsCodes.length - 1];
      if (!resultCode) {
        resultsCodes.push({
          value: '',
          color: '',
          colorName: getColorName(''),
          childs: [],
          isObfuscate: false
        });
        resultCode = resultsCodes[resultsCodes.length - 1];
      }

      let childs = [];

      resultCode.value = chars;
      chars = getDescriptors(chars, functionalDescriptors);

      for (let i = 0; i < chars.length; i++) {
        let char = chars[i];
        if (char[0] === DESCRIPTOR_PREFIX & functionalDescriptors.indexOf(char[1]) !== -1) {
          // is a functional descriptor, check "&r" (reset descriptor)
          let child = childs[childs.length - 1];
          if (child && !child.isCompiled) {
            if (char === RESET_DESCRIPTOR) {
              child.classes = []
              child.isObfuscate = false;
            } else if (char === OBFUSCATE_DESCRIPTOR) {
              child.isObfuscate = true;
            } else {
              child.classes.push(descriptorsClasses[functionalDescriptors.indexOf(char[1])]);
            }
          } else {
            let classes = [];
            let isObfuscate = false;
            
            if (char === OBFUSCATE_DESCRIPTOR) {
              isObfuscate = true;
            } else if (char !== RESET_DESCRIPTOR) {
              classes = [descriptorsClasses[functionalDescriptors.indexOf(char[1])]];
            }

            childs.push({
              color: char === RESET_DESCRIPTOR ? RESET_DESCRIPTOR : resultCode.color,
              colorName: char === RESET_DESCRIPTOR ? getColorName(RESET_DESCRIPTOR) : resultCode.colorName,
              classes: [...classes],
              isObfuscate: isObfuscate,
              isCompiled: false
            });

          }
        } else {
          // Is a value, checking that is not a begin of string
          if (i === 0) {
            childs.push({
              color: resultCode.color,
              colorName: resultCode.colorName,
              classes: [],
              isObfuscate: false,
              value: char,
              isCompiled: true
            });
          } else {
            childs[childs.length - 1].value = char;
            childs[childs.length - 1].isCompiled = true;
          }
        }
      }

      resultCode.childs = childs;
    }
  });

  return resultsCodes;
}



exports.getColorName = getColorName;
exports.getColoredStringData = getColoredStringData;
exports.getDescriptors = getDescriptors;

exports.functionalDescriptors = functionalDescriptors;
exports.descriptorsClasses = descriptorsClasses;
exports.colors = colors;

exports.DESCRIPTOR_PREFIX = DESCRIPTOR_PREFIX;
exports.RESET_DESCRIPTOR = RESET_DESCRIPTOR;
exports.OBFUSCATE_DESCRIPTOR = OBFUSCATE_DESCRIPTOR;

exports.default = getColoredStringData;


