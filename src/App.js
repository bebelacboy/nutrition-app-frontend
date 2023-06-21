import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { CreateWorkoutPlanPage } from './pages/CreateWorkoutPlan';
import { LoginPage } from './pages/Login';
import { Navbar } from './components/Navbar/Navbar';
import { RegisterPage } from './pages/Register';
import { PrivateRoute } from './components/Authorization/PrivateRoute';
import { ListWorkoutPlanPage } from './pages/ListWorkoutPlan';
import { WorkoutPlanDetailPage } from './pages/WorkoutPlanDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/workout-plan/create" element={
            <PrivateRoute>
              <CreateWorkoutPlanPage />
            </PrivateRoute>} />
          <Route path="/workout-plan" element={
              <ListWorkoutPlanPage />
            } />
          <Route path="/workout-plan/:id" element={
              <WorkoutPlanDetailPage />
            } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
