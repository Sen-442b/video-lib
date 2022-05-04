import "./App.css";
import Nav from "./components/Nav/Nav";
import logo from "./logo.png";
import AllRoutes from "./routes/AllRoutes";
import Home from "./screens/Home/Home";

function App() {
  return (
    <div>
      <Nav />
      <AllRoutes />
    </div>
  );
}

export default App;
