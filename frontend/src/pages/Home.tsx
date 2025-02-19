import { useLocation } from "react-router-dom";
import Login from "../components/tsx/Login";
import Register from "../components/tsx/Register";
import './styles/Home.css';

function Home() {
    return (
      <div className="home-container">
        <div className="form-container">
          <Login />
        </div>
        <div className="form-container">
          <Register />
        </div>
      </div>
    );
  }
  
  export default Home;





