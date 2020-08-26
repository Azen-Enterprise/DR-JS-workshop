import React, { useState, useEffect } from 'react';

import './CharPicker.css';

interface props {
  onCharSelect: any,
  selectedChar: string,
  side: string,
}

interface char {
  name: string,
  id: string,
}
const CharPicker = (props: props) => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://swapi.dev/api/people');
      if (!response.ok) {
        throw new Error('Failed to fetch.');
      }
      let data = await response.json();

      const selectedCharacters = data.results.slice(0, 5);

      setCharacters(selectedCharacters.map((char: char, index: number) => ({
        name: char.name,
        id: index + 1
      })));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  let content = <p>Loading characters...</p>;

  if (
    !isLoading &&
    characters &&
    characters.length > 0
  ) {
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {characters.map((char: char) => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (
    !isLoading &&
    (!characters || characters.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
}

export default CharPicker;
