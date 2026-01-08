import { useEffect, useState } from 'react'
import './App.css'
import Nav from './components/nav'
import QuizMasterHomepage from './page/homepage'
import Footer from './components/footer'
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom'
import AuthPages from './page/authPage'
import TeacherDashboard from './page/teacherDashboard'
import ForgotPassword from './page/forgetPasswordPage'
import ResetPassword from './page/resetPasswordPage'
import StudentQuizPage from './page/testPage'
import QuizResultsDetailPage from './page/quizResultDetailPage'
import ContactFeedbackPage from './page/contactPage'
import { ToastContainer } from 'react-toastify'

const Home = ()=>{
  const navigate = useLocation()
  return(
    <section>
      <Nav/>
      {
        navigate.pathname == "/" ? <QuizMasterHomepage/> : <Outlet/>
      }
      <Footer/>
      <ToastContainer />
    </section>
  )
}

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home />,
    children:[{
      path:"/auth",
      element:<AuthPages/>
    },
    {
      path:"/dashboard",
      element:<TeacherDashboard/>
    },
    {
      path:"/auth/forget-password",
      element:<ForgotPassword/>
    },
    {
      path:"/auth/reset-password",
      element:<ResetPassword/>
    },
    {
      path:"/quiz/:id",
      element:<QuizResultsDetailPage />
    },
    {
      path:"/contact",
      element:<ContactFeedbackPage/>
    }
  ]},
  {
    path:"/test/:id",
    element:<StudentQuizPage/>
  }
])
function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
