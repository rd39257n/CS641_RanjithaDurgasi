import React from 'react';
import ComponentA from './components/ComponentA';
import ComponentB from './components/ComponentB';

const App = () => {
  return (
    <div>
      <ComponentA initialValue={10} />
      <ComponentB initialValue="Hello" />
    </div>
  );
};

export default App;