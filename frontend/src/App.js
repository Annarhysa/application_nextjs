import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://application-nextjs-opal.vercel.app/api', JSON.parse(jsonInput));
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFilterChange = (option) => {
    const index = filterOptions.indexOf(option);
    if (index > -1) {
      setFilterOptions(filterOptions.filter((_, i) => i !== index));
    } else {
      setFilterOptions([...filterOptions, option]);
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;
    const filteredResponse = {};

    if (filterOptions.includes('Numbers')) {
      filteredResponse.Numbers = numbers;
    }
    if (filterOptions.includes('Alphabets')) {
      filteredResponse.Alphabets = alphabets;
    }
    if (filterOptions.includes('Highest Alphabet')) {
      filteredResponse.HighestAlphabet = highest_alphabet;
    }

    return (
      <div>
        {Object.entries(filteredResponse).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {value.join(', ')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Bajaj Finserv Health Ltd. Qualifier 1</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON, eg: {"data": ["A", "B", "1", "2"]}'
        className="json-input"
      />
      <button onClick={handleSubmit} className="submit-button">Submit</button>
      <div className="filter-container">
        <h3>Multi Filter</h3>
        <label>
          <input
            type='checkbox'
            onChange={() => handleFilterChange('Numbers')}
          />
          Numbers
        </label>
        <label>
          <input
            type='checkbox'
            onChange={() => handleFilterChange('Alphabets')}
          />
          Alphabets
        </label>
        <label>
          <input
            type='checkbox'
            onChange={() => handleFilterChange('Highest Alphabet')}
          />
          Highest Alphabet
        </label>
      </div>
      {response && (
        <div className="response-container">
          <h3>Filtered Response</h3>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
};

export default App;
