import {Navigate, Route, Routes} from 'react-router-dom'
import HomePage from "./Pages/HomePage/HomePage"
import AuthPage from "./Pages/AuthPage/AuthPage"
import ProfilePage from './Pages/ProfilePage/ProfilePage'
import PageLayout from './Layout/PageLayout/PageLayout'
import { Toaster } from "./components/ui/toaster"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/firebase'


function App() {
  const [authUser] = useAuthState(auth)
  return (
    <>
    <PageLayout>
      <Routes>
        <Route path = '/' element = {authUser ? <HomePage /> : <Navigate to={"/auth"}/>} />
        <Route path = '/auth' element = {!authUser ? <AuthPage /> : <Navigate to={"/"}/>} />
        <Route path = '/:username' element = {authUser ? <ProfilePage /> : <Navigate to={"/auth"}/>} />
      </Routes>
    </PageLayout>

    <Toaster />
    </>
  )
}

export default App
