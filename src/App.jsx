import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter basename="/projects/little-lemon-restaurant">
      <Header />
      <Main />
      <Footer />
    </BrowserRouter>
  );
}

export default App;