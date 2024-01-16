import {Button} from "antd";
import React, {useState} from "react";
import axiosClient from "../utils/axiosClientJs";

const buttonDefaultColor = "#1676FDFF";
const buttonBusyColor = "#595959";
const buttonErrorColor = "#f5b235";

export default function TopicActionAddButton({topic, api, params, actionName, onSuccess, onErrMsg}) {
    const [registerState, setRegisterState] = useState(0);
    const [buttonColor, setButtonColor] = useState(buttonDefaultColor);

    function handleClick() {
        onErrMsg(null);
        setRegisterState(1);
        setButtonColor(buttonBusyColor);
        if (topic.length <= 0 || api.length <= 0) {
            setRegisterState(3);
            onErrMsg("topic and api can not be null!");
            setButtonColor(buttonErrorColor);
            return;
        }
        axiosClient({
            method: 'post',
            url: '/topic/addAction',
            data: {
                "topic": topic,
                "api": api,
                "params": params,
                "actionName": actionName
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
        }}>提交新动作</Button>
    );
}