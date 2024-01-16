import {Button} from "antd";
import React, {useEffect, useState} from "react";
import axiosClient from "../utils/axiosClientJs";

const buttonDefaultColor = "#1676FDFF";
const buttonBusyColor = "#595959";
const buttonErrorColor = "#f5b235";

export default function LoginButton({autoLogin, loginAccount, password, onLoginSuccess, onErrMsg}) {
    // 0=wait login; 1=logging in; 2=login success; 3=login failed;
    const [loginState, setLoginState] = useState(0);
    const [loginButtonColor, setLoginButtonColor] = useState(buttonDefaultColor);

    function loggingIn() {
        onErrMsg(null);
        setLoginState(1);
        setLoginButtonColor(buttonBusyColor);
    }

    function loginSuccess() {
        setLoginState(2);
        onLoginSuccess(true);
        onErrMsg(null);
        setLoginButtonColor(buttonDefaultColor);
    }

    function loginError(e: Error) {
        setLoginState(3);
        onErrMsg(e.message);
        setLoginButtonColor(buttonErrorColor);
    }

    function handleClick() {
        loggingIn();
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
                loginSuccess();
                return;
            }
            throw Error("unknown error");

        }).catch(function (e) {
            console.log(e);
            loginError(e);
        }).finally(() => {
        });
    }

    async function execDelay(func, delaySeconds) {
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        await sleep(delaySeconds * 1000);
        func();
    }

    useEffect( () => {
        if (autoLogin) {
            loggingIn();
            execDelay(handleClick, 1);
        }
    }, [autoLogin]);

    return (
            <Button size="large" loading={loginState===1} block={true} onLoad={() => {
                if (autoLogin) {
                    loggingIn();
                    execDelay(handleClick, 1);
                }
            }}
                    onClick={handleClick} style={{fontWeight: 'bold', fontSize: 'large', color: "#ffffff",backgroundColor: loginButtonColor}}>登录</Button>
    );
}