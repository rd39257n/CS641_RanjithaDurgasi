import React, { useState } from 'react';

interface Props {
  initialValue: string;
}

const ComponentB = ( props: Props ) => {
  const [text, setText] = useState(props.initialValue);

  const handleClick = () => {
    setText(text + '!');
  };

  return (
    <div>
      <p>Text: {text}</p>
      <button onClick={handleClick}>Update Text</button>
    </div>
  );
};

export default ComponentB;