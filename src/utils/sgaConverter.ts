
// Standard Galactic Alphabet mapping
const englishToSGA: { [key: string]: string } = {
  'a': 'ᔑ', 'b': 'ʖ', 'c': 'ᓵ', 'd': '↸', 'e': 'ᒷ', 'f': '⎓', 'g': '⊣', 'h': '⍑',
  'i': '╎', 'j': '⋮', 'k': 'ꖌ', 'l': 'ꖎ', 'm': 'ᒲ', 'n': 'リ', 'o': '𝙹', 'p': '!¡',
  'q': 'ᑑ', 'r': '∷', 's': 'ᓭ', 't': 'ℸ', 'u': '⚍', 'v': '⍊', 'w': '∴', 'x': '̇/',
  'y': '||', 'z': '⨅'
};

const sgaToEnglish: { [key: string]: string } = Object.fromEntries(
  Object.entries(englishToSGA).map(([english, sga]) => [sga, english])
);

export const convertToSGA = (text: string): string => {
  return text.toLowerCase().split('').map(char => {
    if (englishToSGA[char]) {
      return englishToSGA[char];
    }
    return char; // Keep spaces, punctuation, numbers as-is
  }).join('');
};

export const convertToEnglish = (text: string): string => {
  let result = '';
  let i = 0;
  
  while (i < text.length) {
    let matched = false;
    
    // Try to match SGA characters (some are multi-character)
    for (const [sga, english] of Object.entries(sgaToEnglish)) {
      if (text.substr(i, sga.length) === sga) {
        result += english;
        i += sga.length;
        matched = true;
        break;
      }
    }
    
    if (!matched) {
      result += text[i]; // Keep spaces, punctuation, numbers as-is
      i++;
    }
  }
  
  return result;
};

export const isValidSGA = (text: string): boolean => {
  const sgaChars = Object.keys(sgaToEnglish);
  return text.split('').some(char => sgaChars.includes(char));
};
