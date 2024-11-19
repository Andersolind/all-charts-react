
import './App.css'
import Legend from './components/Legend'
import UserSessionChart from './components/UserSession'

function App() {

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <UserSessionChart />
      </div>
      <div><Legend /></div>
    </>
  )
}

export default App
