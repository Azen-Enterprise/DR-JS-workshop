import React, { useState } from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';

const App = () => {

  const [side, setSide] = useState<string>('light');
  const [selectedChar, setSelectedChar] = useState<string>('1');
  const [destroyed, setDestroyed] = useState<boolean>(false);

  const sideHandler = (side: string) => setSide(side);

  const charSelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const charId: string = event.target.value;
    setSelectedChar(charId);
  };

  const destructionHandler = () => setDestroyed(true);

    let content = (
      <React.Fragment>
        <CharPicker
          side={side}
          selectedChar={selectedChar}
          onCharSelect={charSelectHandler}
        />
        <Character selectedChar={selectedChar} />
        <button onClick={() => sideHandler('light')}>
          Light Side
        </button>
        <button onClick={() => sideHandler('dark')}>Dark Side</button>
        {side === 'dark' && (
          <button onClick={() => destructionHandler()}>DESTROY!</button>
        )}
      </React.Fragment>
    );

    if (destroyed) {
      content = <h1>Total destruction!</h1>;
    }
    return content;
}

export default App;
