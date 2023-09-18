import { MathJax } from 'better-react-mathjax'
import {MathJaxContext} from 'better-react-mathjax'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';

const TestPage = () => {
  // const [questions, setQuestions] = useState([])
  const location = useLocation()
  const data = location.state
  const [timer, setTimer] = useState(data.totalTime * 60)
  const questions = data.questions
  const [questionTimers, setQuestionTimers] = useState(new Array(questions.length).fill(0));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
        // Increment time spent on the current question
        const updatedTimers = [...questionTimers];
        updatedTimers[currentQuestionIndex]++;
        setQuestionTimers(updatedTimers);
      } else {
        clearInterval(interval); // Stop the timer when it reaches 0
      }
    }, 1000);
    
    // Update the timer every second

    if(timer==0){
      handleSubmitTest()
    }

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [timer, currentQuestionIndex, questionTimers]);



  const isTimeLessThanOneMinute = timer < 60;

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
    setCarouselIndex(carouselIndex + 1);
  };

  // Function to navigate to the previous question
  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setCarouselIndex(carouselIndex - 1);
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"]
      ]
    }
  };

  const handleCarouselSelect = (selectedIndex) => {
    setCarouselIndex(selectedIndex);
    setCurrentQuestionIndex(selectedIndex); // Update current question index
  };
  
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    let formattedTime = '';
  
    if (hours > 0) {
      formattedTime += `${hours}h `;
    }
  
    if (minutes > 0 || hours > 0) {
      formattedTime += `${minutes}m `;
    }
  
    formattedTime += `${remainingSeconds}s`;
  
    return formattedTime;
  }

  const handleSubmitTest = () => {

    const timeTakenToSubmit = data.totalTime * 60 - timer;
    setLoading(true)

    setTimeout(()=>{
      setLoading(false)
      navigate('/finish', {state: {name: data.name, timeTakenToSubmit: timeTakenToSubmit, totalTime: data.totalTime * 60, questionTimers: questionTimers}})
    },1000)


  }
  return (
    <MathJaxContext config={config}>

      <div>
        Hi, {data.name}!

        <p>Time Remaining: <span className={isTimeLessThanOneMinute ? 'blink' : ''}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span></p>
      
      
            <Carousel interval={null} data-bs-theme="dark" activeIndex={carouselIndex} // Set activeIndex to control the Carousel
          onSelect={handleCarouselSelect} >
              {data?.questions?.map((question)=>{
                return <Carousel.Item>

                  <MathJax>{question}</MathJax>
                </Carousel.Item> 
              })}

            </Carousel>

            <div>
          <button onClick={goToPreviousQuestion} data-slide="prev" disabled={currentQuestionIndex === 0}>
            Previous Question
          </button>
          <button onClick={goToNextQuestion} data-slide="next" disabled={currentQuestionIndex === questions.length - 1}>
            Next Question
          </button>
        </div>
        <div>
        <p>Time Spent on Current Question: {formatTime(questionTimers[currentQuestionIndex])}</p>
      </div>
          
          <button onClick={handleSubmitTest} disabled={timer==0}>Submit Test</button>
        
      </div>
    </MathJaxContext>
  
  )
}

export default TestPage