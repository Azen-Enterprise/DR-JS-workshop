import React, { useState, useEffect } from 'react';

import Summary from './Summary';

interface props {
  selectedChar: string;
}

interface char {
  id: string,
  name: string,
  gender: string,
  height: string,
  colors: {
    hair: string,
    skin: string,
  },
  movieCount: number
}

const Character = (props: props, char: char) => {
  const [loadedChar, setLoadingChar] = useState(char);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== this.props.selectedChar ||
  //     nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
  //     nextState.isLoading !== this.state.isLoading
  //   );
  // }

  useEffect(() => {
    fetchData();

    return () => {
      console.log('Too soon...');
    }

  }, [props.selectedChar]);


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://swapi.dev/api/people/' + props.selectedChar);
      if (!response.ok) {
        throw new Error('Could not fetch person!');
      };
      let data = await response.json()
  
      const loadedCharacter = {
        id: props.selectedChar,
        name: data.name,
        height: data.height,
        colors: {
          hair: data.hair_color,
          skin: data.skin_color
        },
        gender: data.gender,
        movieCount: data.films.length
      };
  
      setLoadingChar(loadedCharacter);
      setIsLoading(false)
    } catch (e) {
      console.log(e);
      throw e;
    }
    
  }

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedChar.id) {
    content = (
      <Summary
        name={loadedChar.name}
        gender={loadedChar.gender}
        height={loadedChar.height}
        hairColor={loadedChar.colors.hair}
        skinColor={loadedChar.colors.skin}
        movieCount={loadedChar.movieCount}
      />
    );
  } else if (!isLoading && !loadedChar.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
}

export default Character;
