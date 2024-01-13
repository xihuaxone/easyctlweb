import {Button} from "antd";
import React, {useState} from "react";
import axiosClient from "../utils/axiosClientJs";

const buttonDefaultColor = "#1676FDFF";
const buttonBusyColor = "#595959";
const buttonErrorColor = "#f5b235";

export default function RegisterButton({nickName, loginAccount, password, confirmPassword, onSuccess, onErrMsg}) {
    // 0=wait login; 1=logging in; 2=login success; 3=login failed;
    const [registerState, setRegisterState] = useState(0);
    const [buttonColor, setButtonColor] = useState(buttonDefaultColor);

    function handleClick() {
        onErrMsg(null);
        setRegisterState(1);
        setButtonColor(buttonBusyColor);
        if (confirmPassword !== password) {
            setRegisterState(3);
            onErrMsg("password input error! please check it.");
            setButtonColor(buttonErrorColor);
            return;
        }
        axiosClient({
            method: 'post',
            url: '/auth/register',
            data: {
                "nickName": nickName,
                "loginAccount": loginAccount,
                "password": password
            },
            withCredentials: true
        }).then(response => {
            if (!response.data.success) {
                throw Error(response.data.errMsg);
            }
            setRegisterState(2);
            onSuccess(true);
            onErrMsg(null);
            setButtonColor(buttonDefaultColor);

        }).catch(function (e) {
            console.log(e);
            setRegisterState(3);
            onErrMsg(e.message);
            setButtonColor(buttonErrorColor);

        }).finally(() => {
        });
    }

    return (
        <Button size="large" loading={registerState === 1} block={true}
                onClick={handleClick} style={{
            fontWeight: 'bold',
            fontSize: 'large',
            color: "#ffffff",
            backgroundColor: buttonColor
        }}>注册</Button>
    );
}