import React, { useState } from "react";

const Text = () => {
  console.log("Text--updated");
  return <div>Text</div>;
};
const Father = ({ children }: { children: React.ReactNode }) => {
  console.log("About--updated");
  const [count, setCount] = useState(0);
  return (
    <div className=" border-2 border-red-500">
      <h2 onClick={() => setCount(count + 1)}>Father{count}</h2>
      <div className=" border-2 border-blue-500">{children}</div>
    </div>
  );
};
const About: React.FC = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the About page. </p>

      <Father>
        <Text />
      </Father>
    </div>
  );
};

export default About;
