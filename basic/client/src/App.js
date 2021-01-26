import "./App.css";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

function App() {
  return (
    <div className="container">
      <h1>Create post</h1>
      <PostCreate></PostCreate>
      <hr></hr>
      <h1>Created posts</h1>
      <PostList></PostList>
    </div>
  );
}

export default App;
