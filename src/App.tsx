import { Navigate, Route, Routes, BrowserRouter}  from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CreateCourse from './pages/CreateCourse';
import CourseDetail from './pages/CourseDetail';

function RoleHome(){
  const {user} = useAuth();
  if(!user) return <Navigate to="/login" replace />;
  return <Navigate to="/dashboard" replace />;
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RoleHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/courses/new" element={<ProtectedRoute><CreateCourse /></ProtectedRoute>} />
        <Route path="/courses/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
