import React from 'react'
import Home from './Home/Home'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import QuestionList from './QuestionList/QuestionList'
import Question from './Question/Question'
import AddQuestion from './admin/QuestionInfo/AddQuestion'
import PrivatePages from './components/PrivatePages'
import ProfilePage from './userProfile/Profile'
import './App.css';
import AddTestCases from './admin/AddTestCases'
import DashBoard from './admin/DashBoard';
import PageNotFound from './components/PageNotFound'
import AdminQuestionList from './admin/AdminQuestionList'

const App = () => {
  return (
    <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/question-list" element={ <QuestionList/> } />
        <Route path='/profile/:user' element={<ProfilePage/>}/>
        <Route path="/question" element={ <Question/> } />
        <Route path="/pnf" element={<PageNotFound/>} />
        <Route path="/admin2023" element={<PrivatePages />}>
            <Route path="" element={<DashBoard/>} />
            <Route path="add-question" element={<AddQuestion/>}/>
            <Route path="add-testcases" element={<AddTestCases/>}/>
            <Route path="question-list" element={<AdminQuestionList/>}/>
            <Route path="update-question" element={<AddQuestion/>}/>
        </Route>
        <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App