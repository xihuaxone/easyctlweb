import {Button} from "antd";
import React, {useState} from "react";
import axiosClient from "../utils/axiosClientJs";

const buttonDefaultColor = "#1676FDFF";
const buttonBusyColor = "#595959";
const buttonErrorColor = "#f5b235";

export default function LoginButton({loginAccount, password, onLoginSuccess, onErrMsg}) {
    // 0=wait login; 1=logging in; 2=login success; 3=login failed;
    const [loginState, setLoginState] = useState(0);
    const [loginButtonColor, setLoginButtonColor] = useState(buttonDefaultColor);

    function handleClick() {
        onErrMsg(null);
        setLoginState(1);
        setLoginButtonColor(buttonBusyColor);
        axiosClient({
            method: 'post',
            url: '/auth/login',
            data: {
                "loginAccount": loginAccount,
                "password": password
            },
            withCredentials: true
        }).then(response => {
            if (!response.data.success) {
                throw Error(response.data.errMsg);
            }
            if (response.headers.authorization) {
                localStorage.setItem('Authorization', response.headers.authorization);
                setLoginState(2);
                onLoginSuccess(true);
                onErrMsg(null);
                setLoginButtonColor(buttonDefaultColor);
                return;
            }
            throw Error("unknown error");

        }).catch(function (e) {
            console.log(e);
            setLoginState(3);
            onErrMsg(e.message);
            setLoginButtonColor(buttonErrorColor);

        }).finally(() => {
        });
    }

    return (
            <Button size="large" loading={loginState===1} block={true} value="登录"
                    onClick={handleClick} style={{fontWeight: 'bold', fontSize: 'large', color: "#ffffff",backgroundColor: loginButtonColor}}>登录</Button>
    );
}