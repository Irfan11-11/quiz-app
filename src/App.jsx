import './App.css'
import { jsQuizz } from './Questions'
import Quiz from './Quiz'

function App() {

  return (
    <>
      <div className='container'>
        <h1 className='text-center'>Quiz App</h1>
      </div>
  
  <Quiz questions={jsQuizz.questions}/>
    </>
  )
}

export default App
