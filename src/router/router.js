import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Login from "../pages/login";
import Index from "../pages";
import TopicList from "../pages/TopicList";
import TopicDetail from "../pages/TopicDetail";
import Register from "../pages/register";


export default function routerConfig() {
    return (
        <Routes>
            <Route path="/" element={<Index />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/topicList" element={<TopicList />}></Route>
            <Route path="/topicDetail" element={<TopicDetail />}></Route>
        </Routes>
    )
}
