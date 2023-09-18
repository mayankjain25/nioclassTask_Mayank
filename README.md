# NioclassTask_Mayank

This is a web application built with React.js that allows users to take a mathematics test. The application records the total time taken to complete the test, the time taken per question, and displays the results upon test completion.

## Features

- User-friendly interface to input your name and select questions.
- Automatic calculation of total test time based on the selected questions.
- Test timer with hours, minutes, and seconds.
- Navigation buttons to move between questions.
- Submission of the test with a summary of results.

## Additional Features
- As soon as the timer reaches less than 1 minute, it starts blinking with red color to simulate a sense of urgency
- The test will auto submit once the timer reaches zero.
- In the finish page, it shows the **actual** questions attempted by the user. Those questions in which the user did not spend time to think won't be counted as a valid question.

## Deployment [![Netlify Status](https://api.netlify.com/api/v1/badges/565cb4f1-28b9-4954-81fe-23780e37bdc3/deploy-status)](https://app.netlify.com/sites/nioclasstask-mayank/deploys)
The project is deployed on Netlify, and can be visited by clicking [here](https://nioclasstask-mayank.netlify.app/)

## Built With
- **React.js** - JavaScript library for building user interfaces.
- **React Router** - Routing library for React applications.
- **Bootstrap** - Front-end framework for styling.
- **Better React MathJax** - Library for rendering MathJax equations in React.
- **React Spinners** - Library for adding loading spinners to components.