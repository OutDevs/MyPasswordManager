// This file will return a random generated password according to certain parameters specified by the users

// Defining constants with the ASCII codes of lowercase and uppercase letters and symbols
const LOWERCASE_A = 97;
const LOWERCASE_Z = 122;
const UPPERCASE_A = 65;
const UPPERCASE_Z = 90;
const SYMBOL_FIRST = 33;
const SYMBOL_LAST = 47;

// Defining the range of ASCII codes that contain each type of input (the three above and the 10 digits)
const LOWERCASE_BOUNDARIES = [LOWERCASE_A, LOWERCASE_Z];
const UPPERCASE_BOUNDARIES = [UPPERCASE_A, UPPERCASE_Z];
const SYMBOL_BOUNDARIES = [SYMBOL_FIRST, SYMBOL_LAST];
const DIGIT_BOUNDARIES = [48, 57];

const replaceAt = (
  originalString,
  index,
  replacement
) => {
  return (
    originalString.substr(0, index) +
    replacement +
    originalString.substr(index + replacement.length)
  );
};

function getRandomInt(min, max) {
  const delta = max - min;
  const temporaryNumber = Math.floor(Math.random() * delta);
  return temporaryNumber + min;
}

const generateLetterInBoundary = (
  lowerBoundary,
  upperBoundary
) => {
  const randomNumber = getRandomInt(lowerBoundary, upperBoundary);
  return String.fromCharCode(randomNumber);
};

const generateCharactersInBoundary = (
  numberOfCharacters,
  boundaryDefinition
) => {
  if (boundaryDefinition.length != 2) {
    throw 'Check that boundary definition please';
  }

  let temporaryCharacters = '';
  for (let letter = 0; letter < numberOfCharacters; letter++) {
    temporaryCharacters += generateLetterInBoundary(
      boundaryDefinition[0],
      boundaryDefinition[1]
    );
  }
  return temporaryCharacters;
};

/**
 * Generates a random string that can be used as a password
 * @param lowerCaseLetters the number of lower case letters
 * @param upperCaseLetters the number of upper case letters
 * @param specialCharacters the number of special characters
 */
export const generatePassword = (
  lowerCaseLetters,
  upperCaseLetters,
  specialCharacters,
  digitCharacters
) => {
  let generatedPassword = '';
  generatedPassword +=
    generateCharactersInBoundary(lowerCaseLetters, LOWERCASE_BOUNDARIES) +
    generateCharactersInBoundary(upperCaseLetters, UPPERCASE_BOUNDARIES) +
    generateCharactersInBoundary(specialCharacters, SYMBOL_BOUNDARIES) +
    generateCharactersInBoundary(digitCharacters, DIGIT_BOUNDARIES);

  const numbersToShuffle = getRandomInt(0, 6);
  for (let i = 0; i < numbersToShuffle; i++) {
    const firstIndexToShuffle = getRandomInt(0, generatedPassword.length);
    const secondIndexToShuffle = getRandomInt(0, generatedPassword.length);

    const firstCharacter = generatedPassword.charAt(firstIndexToShuffle);
    const secondCharacter = generatedPassword.charAt(secondIndexToShuffle);

    generatedPassword = replaceAt(generatedPassword, firstIndexToShuffle, secondCharacter);
    generatedPassword = replaceAt(generatedPassword, secondIndexToShuffle, firstCharacter);

  }

  return generatedPassword;
};
