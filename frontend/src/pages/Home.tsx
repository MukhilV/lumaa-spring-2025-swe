import { useLocation } from "react-router-dom";
import Login from "../components/tsx/Login";
import Register from "../components/tsx/Register";
import './styles/Home.css';
import Navigation from "../components/tsx/Navigation";

function Home() {
    return (
      <>
      <Navigation  onLogin={() => {}} onLogout={() => {}} onRegister={() => {}} />
      <div>
        <div className="app-title">
          <h1>Task Management App</h1>
        </div>
        
        <div className="home-container">
          <div className="form-container">
            <Login />
          </div>
          <div className="form-container">
            <Register />
          </div>
        </div>
      </div>
      </>
    );
  }
  
  export default Home;





