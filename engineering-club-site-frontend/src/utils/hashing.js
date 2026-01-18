//hasing the word
const hashWord = (text) => {
  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }

  return hash.toString();
};

// console.log(String(true))
// console.log(hashWord(String(true)))
// console.log(hashWord(String(true)))

// verify hash words
const checkHash = (hashedWord, checkingWordWithouthashing) => {
  const hash1 = hashedWord;
  const hash2 = hashWord(String(checkingWordWithouthashing));
  return hash1 === hash2;
};

exports.hashWord = hashWord;
exports.checkHash = checkHash;

