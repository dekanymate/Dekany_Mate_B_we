import React, { useEffect, useState } from 'react';
import './Szotar.css'; // Import CSS file for styling
import szotarApi from '../api/szotar-api';

const SzotarList = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [filteredWords, setFilteredWords] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchTopics();
    fetchWords();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await szotarApi.getTemak();
      setTopics(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWords = async () => {
    try {
      const response = await szotarApi.getSzavak();
      setFilteredWords(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    filterWords(event.target.value);
  };

  const filterWords = (topicId) => {
    if (topicId === '') {
      setFilteredWords([]);
    } else {
      const filtered = topicId
        ? filteredWords.filter((word) => word.temaId === parseInt(topicId))
        : [];
      setFilteredWords(filtered);
    }
  };

  const handleTranslationChange = (index, value) => {
    const newWords = [...filteredWords];
    newWords[index].userTranslation = value;
    setFilteredWords(newWords);
  };

  const handleCheckTranslation = (index) => {
    const word = filteredWords[index];
    const isCorrect = word.userTranslation.toLowerCase() === word.angol.toLowerCase();
    const newWords = [...filteredWords];
    newWords[index].isCorrect = isCorrect;
    setFilteredWords(newWords);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setScore((prevScore) => prevScore);
    }

    const updatedWords = [...filteredWords];
    updatedWords[index].isDisabled = true;
    setFilteredWords(updatedWords);
  };

  return (
    <div className="filtered-word-list-container">
      <h2>Szótár</h2>
      <label htmlFor="topic-select">Téma kiválasztása:</label>
      <select id="topic-select" value={selectedTopic} onChange={handleTopicChange}>
        <option value="">All</option>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.temanev}
          </option>
        ))}
      </select>

      <table className="word-table">
        <thead>
          <tr>
            <th>MAGYAR</th>
            <th>ANGOL</th>
            <th>Visszajelzés</th>
          </tr>
        </thead>
        <tbody>
          {filteredWords.map((word, index) => (
            <tr key={word.id}>
              <td><b>{word.magyar}</b></td>
              <td>
                <input
                  type="text"
                  value={word.userTranslation || ''}
                  onChange={(e) => handleTranslationChange(index, e.target.value)}
                  disabled={word.isDisabled}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={word.isCorrect}
                  disabled
                />
              </td>
              <td>
                <button onClick={() => handleCheckTranslation(index)} disabled={word.isDisabled}>
                  Lássuk
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="score-container">
        <h3>Pontszám: {score}</h3>
      </div>
    </div>
  );
};

export default SzotarList;
