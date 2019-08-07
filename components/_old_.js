
/*
//encrypt
var rawStr = "hello world!";
var wordArray = CryptoJS.enc.Utf8.parse(rawStr);
var base64 = CryptoJS.enc.Base64.stringify(wordArray);
console.log('encrypted:', base64);

//decrypt
var parsedWordArray = CryptoJS.enc.Base64.parse(base64);
var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
console.log("parsed:",parsedStr);
*/


const trimCharacter = (string, character) => {
    let left = 0;
    while (left < string.length && string[left] === character)
      left++;
    if (left === string.length)
      return '';
  
    let right = string.length - 1;
    while (string[right] === character)
      right--;
  
    return string.substring(left, right + 1);
  }
  