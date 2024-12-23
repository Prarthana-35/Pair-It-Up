export const fetchWords = async () => {
    const response = await fetch('https://random-word-api.com/word?number=10');
    return response.json();
  };
  