import "./App.css";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

function App() {
  return (
    <div className="container">
      <h1>Create post!</h1>
      <PostCreate></PostCreate>
      <hr></hr>
      <PostList></PostList>
    </div>
  );
}

export default App;
