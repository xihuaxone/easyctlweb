import {Button} from "antd";
import React, {useState} from "react";
import axiosClient from "../utils/axiosClientJs";

export default function LoginButton({loginAccount, password, onLoginSuccess}) {
    // 0=wait login; 1=logging in; 2=login success; 3=login failed;
    const [loginState, setLoginState] = useState(0);

    function handleClick() {
        setLoginState(1);
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
                return;
            }
            throw Error("unknown error");

        }).catch(function (e) {
            console.log(e);
            setLoginState(3);

        }).finally(() => {
        });
    }

    return (
        <div>
            <Button type="primary" size="large" loading={loginState===1} block={false} value="登录"
                    onClick={handleClick}>登录</Button>
        </div>
    );
}