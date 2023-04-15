import { useState } from "react";
import Navbar from "./layout/Navbar";
import Post from "./component/Post";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className=" bg-pr text-white min-h-screen">
      <Navbar />
      <div className="container p-20">
        <Post />
      </div>
    </div>
  );
}

export default App;
