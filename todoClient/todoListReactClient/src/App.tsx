
import { userStatus } from './assets/firebaseconfig/firebaseconfig'
import LoginPage from "./components/LogInHandler/LogInHandler"
import './App.css'
import { ToDoHandler } from './components/ToDoHandler/ToDoHandler';


function App() {
  const [user] = userStatus();
  console.log(user)
  return (
    <main className='main'>
    {user ? <ToDoHandler/> : <LoginPage/>}
    </main>
  )
}

export default App
