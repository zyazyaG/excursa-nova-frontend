import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Generate from './pages/Generate/Generate';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Dashboard from './pages/Dashboard/Dashboard'
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header/Header';
import Itineraries from './pages/Itineraries/Itineraries';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <div id="header-trigger" style={{ height: "1px", position: "absolute", top: 0}} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/itineraries"
          element={
            <PrivateRoute>
              <Itineraries />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
