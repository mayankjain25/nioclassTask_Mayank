import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useAppContext } from '../context'
import { useNavigate } from 'react-router-dom'
import { MathJax } from 'better-react-mathjax'
import { HashLoader } from 'react-spinners'
import Footer from './Footer'
import './styles/Landing.css'

const Landing = () => {
  const [userName, setUserName] = useState('')
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
    const questions = []
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();


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
  }

  const handleStartTest = async () => {
    if (userName && selectedQuestions.length > 0) {
      // Calculate total time based on the number of selected questions
      const calculatedTotalTime = selectedQuestions.length * 5; // 5 minutes per question
      setTotalTime(calculatedTotalTime);

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
    <div className='background' style={{overflow:'hidden', height:'80vh',fontFamily: 'Nunito Sans, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>

    <div>

      <h4>Enter your name</h4>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        // style={{marginLeft: '20px'}}
        ></input>
    </div>

    <div style={{display:'flex', flexDirection: 'column'}}>
      <p style={{marginTop:'10px'}}>Select Questions:</p>
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

      <p style={{marginTop:'10px'}}>Total Time for the Test:<span style={{fontWeight: 'bold'}}> {totalTime} minutes</span> </p>
    <button onClick={handleStartTest}>
        Start Test
        <span style={{marginLeft: '20px'}}>
        <HashLoader color={'rgb(183, 176, 176)'} loading={loading} size={20} />
            
        </span>
    </button>
    </div>

    <Footer />

  </div>
  )
}

export default Landing