import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Login from "../pages/login";
import Index from "../pages";
import TopicList from "../pages/TopicList";
import TopicDetail from "../pages/TopicDetail";
import Register from "../pages/register";
import TopicRegister from "../pages/topicRegister";
import ApplyExistsTopic from "../pages/applyExistsTopic";
import TopicActionAdd from "../pages/topicActionAdd";


export default function routerConfig() {
    return (
        <Routes>
            <Route path="/" element={<Index />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/topicList" element={<TopicList />}></Route>
            <Route path="/topic/register" element={<TopicRegister />}></Route>
            <Route path="/topic/applyExistsTopic" element={<ApplyExistsTopic />}></Route>
            <Route path="/topicDetail" element={<TopicDetail />}></Route>
            <Route path="/topic/addAction" element={<TopicActionAdd />}></Route>
        </Routes>
    )
}
