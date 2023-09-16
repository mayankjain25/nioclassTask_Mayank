import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [userName, setUserName] = useState('')
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [totalTime, setTotalTime] = useState(0);

  const questionIDs = [
    'AreaUnderTheCurve_21',
    'BinomialTheorem_13',
    'BinomialTheorem_24',
    'AreaUnderTheCurve_15',
    'AreaUnderTheCurve_2',
    'BinomialTheorem_3',
    'BinomialTheorem_4',
    'AreaUnderTheCurve_5',
  ];
  useEffect(() => {
    const calculatedTotalTime = selectedQuestions.length * 5; // 5 minutes per question
    setTotalTime(calculatedTotalTime);
  }, [selectedQuestions]);
  const handleCheckboxChange = (e) => {

    const { value, checked } = e.target;

    if (checked) {
      setSelectedQuestions((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedQuestions((prevSelected) =>
        prevSelected.filter((id) => id !== value)
      );
    }
  };

  const handleStartTest = () => {
    if (userName && selectedQuestions.length > 0) {
      // Calculate total time based on the number of selected questions
      const calculatedTotalTime = selectedQuestions.length * 5; // 5 minutes per question
      setTotalTime(calculatedTotalTime);

      // Pass the user's name, selected questions, and total time to the parent component
      onStartTest(userName, selectedQuestions, calculatedTotalTime);
    } else {
      alert('Please enter your name and select at least one question.');
    }
  };

  return (
    <div>

      <div style={{display: 'flex'}}>

        <h2>Enter your name</h2>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          ></input>
      </div>

      <div style={{display:'flex', flexDirection: 'column'}}>
        <p>Select Questions:</p>
        <div>
          {questionIDs.map((questionID) => (
            <label key={questionID} style={{display: 'flex', alignItems: 'center'}}>
              <input
                type="checkbox"
                value={questionID}
                checked={selectedQuestions.includes(questionID)}
                onChange={handleCheckboxChange}
                style={{marginRight: '20px'}}
              />
              {questionID}
            </label>
          ))}
        </div>

        <p>Total Time for the Test: {totalTime} minutes</p>
      <button onClick={handleStartTest}>Start Test</button>
      </div>

      
    </div>
  )
}

export default App
