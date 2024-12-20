import { useState } from 'react';
import './App.css';
import Input from './components/Input';
import Output from './components/Output';

function App() {
  const [inputData, setInputData] = useState([]);
  return (
    <div className="App">
        <Input  />
        <Output Data={inputData}/>
    </div>
  );
}

export default App;
