import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Login from "../pages/login";
import Topics from "../pages/topics";
import Index from "../pages";


export default function routerConfig() {
    return (
        <Routes>
            <Route path="/" element={<Index />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/topics" element={<Topics />}></Route>
        </Routes>
    )
}
