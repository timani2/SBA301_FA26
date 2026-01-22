import { useState } from "react";
import Button from "react-bootstrap/Button";
function TestCount() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}
export default TestCount;
