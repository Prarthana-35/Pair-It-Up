export const generatePairs = (words) => {
    const pairs = [];
    for (let i = 0; i < words.length; i++) {
      for (let j = i + 1; j < words.length; j++) {
        pairs.push([words[i], words[j]]);
      }
    }
    return pairs;
  };
  