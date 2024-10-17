import React, { useState } from 'react' ;

interface Props {
initialValue: number;
}
const ComponentA = (props: Props ) =>  {
  const [count, setcount] = useState(props.initialValue);

const handleClick = () => {
setcount (count + 1);
};

return (
<div>
<p>Count: {count}</p>
<button onClick={handleClick}>Increment</button>
</div>
);
};

export default ComponentA;