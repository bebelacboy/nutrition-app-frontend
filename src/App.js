import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { HomePage } from './pages/home';
import { WorkoutPlanPage } from './pages/workout-plan';
import { LoginPage } from './pages/login';
import { Navbar } from './components/navbar';
import { RegisterPage } from './pages/register';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/workout-plan" element={<WorkoutPlanPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
