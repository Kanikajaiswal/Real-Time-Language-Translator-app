// src/components/Translator.js

import React, { useState } from 'react';
import axios from 'axios';
import './Translator.css';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
  // Add more languages as needed
];

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    if (inputText.trim() === '') {
      alert('Please enter text to translate.');
      return;
    }

    try {
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: inputText,
          langpair: `${sourceLang}|${targetLang}`,
        },
      });
      setTranslatedText(response.data.responseData.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
      alert('An error occurred while translating the text.');
    }
  };

  return (
    <div className="translator-container">
      <h2>Real-Time Language Translator</h2>
      <div className="translator-form">
        <textarea
          rows="4"
          placeholder="Enter text to translate..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <div className="language-selectors">
          <div>
            <label>From:</label>
            <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>To:</label>
            <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={handleTranslate}>Translate</button>
      </div>
      {translatedText && (
        <div className="translation-result">
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Translator;
