import './App.css';
// import '@ckeditor/ckeditor5-build-classic/build/styles.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from './Main';
import DocTemplate from './DocTemplate';
import CreatePresentation from './CreatePresentation';
import "./style.css";
import EditPresentation from './EditPresentation';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/view" element={<DocTemplate />}/>
        <Route path="/create" element={<CreatePresentation />}/>
        <Route path="/edit/:id" element={<EditPresentation />}/>
      </Routes>
    </div>
  );
}

export default App;
