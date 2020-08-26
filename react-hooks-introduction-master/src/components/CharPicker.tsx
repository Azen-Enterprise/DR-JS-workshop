import React, { useState, useEffect } from 'react';

import './CharPicker.css';

interface IProps {
  onCharSelect: any,
  selectedChar: number,
  side: string
}

const CharPicker: React.FC<IProps> = ({ onCharSelect, selectedChar, side }) =>{

  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
    useEffect(()=>{
      setIsLoading(true)
      fetch('https://swapi.dev/api/people')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(charData => {
        const selectedCharacters = charData.results.slice(0, 5);
        setCharacters(
         selectedCharacters.map((char:any, index:number) => ({
            name: char.name,
            id: index + 1
          })),
        );
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err);
      });
    },[])

    let content = <p>Loading characters...</p>;
    if (
      !isLoading &&
      characters &&
      characters.length > 0
    ) {
      content = (
        <select
          onChange={onCharSelect}
          value={selectedChar}
          className={side}
        >
          {characters.map((char:any) => (
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
