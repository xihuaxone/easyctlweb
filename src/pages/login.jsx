import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import LoginButton from "../components/LoginButton";
import Password from "antd/lib/input/Password";
import {Input, Tooltip} from "antd";
import Icon from "antd/lib/icon";

export default function Login() {
    const navigate = useNavigate();

    const [loginAccount, setLoginAccount] = useState("");
    const [password, setPassword] = useState("");

    const onLoginSuccess = isSuccess => {
        if (isSuccess) {
            navigate('/topics');
        }
    }

    return (
        <div style={{width: 400, margin: '100px auto'}}>
            <center>
                <span>welcome to easyctl</span><br/><br/><br/>
                <Input
                    placeholder="Enter your login account"
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    suffix={
                        <Tooltip title="Extra information">
                            <Icon type="info-circle" style={{color: 'rgba(0,0,0,.45)'}}/>
                        </Tooltip>
                    }
                    id="loginAccount"
                    onInput={() => {
                        setLoginAccount(document.getElementById('loginAccount').value);
                    }}
                />
                <br/><br/>
                <Password placeholder="input password" id="password" onInput={() => {
                    setPassword(document.getElementById('password').value);
                }}/>
                <br/><br/><br/><br/>
                <div id="errMsg"></div>
                <LoginButton loginAccount={loginAccount}
                             password={password}
                             onLoginSuccess={onLoginSuccess}
                ></LoginButton>
            </center>
        </div>
    )
}

