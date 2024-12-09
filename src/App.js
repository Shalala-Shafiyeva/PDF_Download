import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from './Main';
import DocTemplate from './DocTemplate';
import CreatePresentation from './CreatePresentation';
import "./style.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/view" element={<DocTemplate />}/>
        <Route path="/create" element={<CreatePresentation />}/>
      </Routes>
    </div>
  );
}

export default App;
