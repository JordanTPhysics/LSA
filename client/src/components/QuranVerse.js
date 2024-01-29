import React from 'react';

const QuranVerse = ({ verseData }) => {
  if (!verseData || !verseData.verse || !verseData.verse.words) {
    return null;
  }

  const words = verseData.verse.words;

  return (
    <div>
      <h3>Ayat of the Day</h3>
      {words.map((word, index) => (
        <div key={index}>
          <p>
            Original Text: {word.text} | Translation: {word.translation.text} | Transliteration: {word.transliteration.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuranVerse;
