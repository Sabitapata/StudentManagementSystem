import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Students from './Students';
import About from './About';
import './App.css';
 
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Student Portal</h1>
 
        {/* Navigation links - clicking these changes the page WITHOUT a full reload */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
          <Link to="/students" style={{ marginRight: '15px' }}>Students</Link>
          <Link to="/about">About</Link>
        </nav>
 
        {/* Routes: each path renders a different component in the same page */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
 
export default App;