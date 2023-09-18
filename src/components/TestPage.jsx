import { MathJax } from 'better-react-mathjax'
import {MathJaxContext} from 'better-react-mathjax'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';

const TestPage = () => {
  // const [questions, setQuestions] = useState([])
  const location = useLocation()
  const data = location.state
  // const questions = location.questions
  // console.log(data)
  // const apiURL = 'https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID='


  // console.log(data.selectedQuestions)
  // console.log(data.questions)
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
  
  const questions = data.questions
  return (
    <MathJaxContext config={config}>

      <div>
        Hi, {data.name}!
      
      
            <Carousel slide={false}>

              {data?.questions?.map((question)=>{
                return <Carousel.Item>

                  <MathJax>{question}</MathJax>
                </Carousel.Item> 
              })}

            </Carousel>
          
        
      </div>
    </MathJaxContext>
  
  )
}

export default TestPage