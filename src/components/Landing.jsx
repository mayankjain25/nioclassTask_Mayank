import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useAppContext } from '../context'
import { useNavigate } from 'react-router-dom'
import { MathJax } from 'better-react-mathjax'
import { HashLoader } from 'react-spinners'

const Landing = () => {
  const [userName, setUserName] = useState('')
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
//   const [questions, setQuestions] = useState([])
    const questions = []
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

    // const { userData, setUserData } = useAppContext();

    // const startTest = (userName, selectedQs, testTime) => {
    //     // Update the global state using the setUserData function
    //     setUserData({ name: userName, selectedQuestions: selectedQs, totalTime: testTime });
    //   };

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

  const apiURL = 'https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID='


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

  const getQuestionFromQuestionID = async (questionID)=>{
    // console.log(questionID)
    let receiveQuestion = await fetch(apiURL + questionID)
    receiveQuestion = await receiveQuestion.json()
    // console.log(String.raw`${receiveQuestion[0].Question}`)
    questions.push(receiveQuestion[0].Question)
    // setQuestions([...questions, receiveQuestion[0].Question])
    // console.log(receiveQuestion[0].Question)
  }

  const handleStartTest = async () => {
    if (userName && selectedQuestions.length > 0) {
      // Calculate total time based on the number of selected questions
      const calculatedTotalTime = selectedQuestions.length * 5; // 5 minutes per question
      setTotalTime(calculatedTotalTime);
    //   setUserData({ name: userName, selectedQuestions: selectedQuestions, totalTime: totalTime });
    setLoading(true)

    
    selectedQuestions.map((questionID)=>{
        getQuestionFromQuestionID(questionID)
    })
    setTimeout(()=>{
        setLoading(false)
        // console.log(questions)
        const data = {name: userName, selectedQuestions: selectedQuestions, totalTime: totalTime, questions: questions}
        navigate('/test', {state: data}) 
        }, 3000)
        // setLoading(false)
    //   navigate('/test', {state: data}) 
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
    <button onClick={handleStartTest}>Start Test <span>
        <HashLoader color={'#000'} loading={loading} size={20} />
        </span></button>
    </div>

  </div>
  )
}

export default Landing