import React from 'react';

import './Summary.css';

interface IProps {
 name: string,
 gender:string,
 height: number,
 hairColor: string,
 skinColor: string,
 movieCount: number
}

const Summary: React.FC<IProps> = ({ name, gender, height, hairColor, skinColor, movieCount }) => {
  return (
    <div className="summary">
      <h1>{name}</h1>
      <p>
        Gender: <span className="summary__output">{gender}</span>
      </p>
      <p>
        Height: <span className="summary__output">{height}</span>
      </p>
      <p>
        Hair Color / Skin Color:{' '}
        <span className="summary__output">{hairColor}</span> /{' '}
        <span className="summary__output">{skinColor}</span>
      </p>
      <p>
        Appears in # Movies:{' '}
        <span className="summary__output">{movieCount}</span>
      </p>
    </div>
  );
};

export default Summary;
