
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './styles/Landing.css'
import Footer from './Footer'


const FinishPage = () => {
    const location = useLocation()
    const data = location.state
    const navigate = useNavigate()

    const questionTimers = data.questionTimers;
    let totalQuestionsAttempted = 0;

    for (let i = 0; i < questionTimers.length; i++) {
        if (questionTimers[i] > 0) {
            totalQuestionsAttempted++;
        }
    }

    const handleHomeButtonClick = ()=>{
        navigate('/')
    }
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

   
  return (
    <div>

        <h1>Hi, {data.name}, thank you for taking the test</h1>
        <hr></hr>
        <div>
          <h4>Here's a quick summary for you</h4>
          <div className='background' style={{height:'40vh', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
            <div style={{marginTop: '20px'}}>
                <h6>Questions attempted: {totalQuestionsAttempted}</h6>
                <hr style={{width:'100px', margin:'auto', marginBottom: '10px'}}></hr>
                <h6 style={{fontWeight: 'bold', textDecoration: 'underline'}}>Time taken per question</h6>
                <div style={{textAlign: 'left', marginTop:'10px', marginBottom: '10px'}}>

                {
                    data.selectedQuestions.map((question, index)=>{
                        if(questionTimers[index] === 0) return (
                            <h6 key={question}> {question}:<span style={{color:'red'}}> Not attempted</span></h6> )
                            else
                            return (
                        <h6 key={question}> {question}: {formatTime(questionTimers[index])}</h6>
                        )
                    })
                }
                </div>
                <hr style={{width:'100px', margin:'auto', marginBottom: '10px'}}></hr>

                <div style={{textAlign: 'left'}}>
                <h6>Total time taken: {formatTime(data.timeTakenToSubmit)}</h6>
                <h6>Total test duration: {formatTime(data.totalTime)}</h6>

                </div>

                {/* <h6>Questions attempted: {data.selectedQuestions.length}</h6> */}

            </div>
              <button onClick={handleHomeButtonClick}>Home</button>
          </div>

        </div>
        <Footer />
    </div>
  )
}

export default FinishPage