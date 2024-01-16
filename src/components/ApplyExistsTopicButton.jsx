import {Button} from "antd";
import React, {useState} from "react";
import axiosClient from "../utils/axiosClientJs";

const buttonDefaultColor = "#1676FDFF";
const buttonBusyColor = "#595959";
const buttonErrorColor = "#f5b235";

export default function ApplyExistsTopicButton({topic, onSuccess, onErrMsg}) {
    const [callState, setCallState] = useState(0);
    const [buttonColor, setButtonColor] = useState(buttonDefaultColor);

    function handleClick() {
        onErrMsg(null);
        setCallState(1);
        setButtonColor(buttonBusyColor);
        if (topic.length <= 0) {
            setCallState(3);
            onErrMsg("topic can not be null!");
            setButtonColor(buttonErrorColor);
            return;
        }
        axiosClient({
            method: 'post',
            url: '/topic/applyExistsTopic',
            data: {
                "topic": topic,
            },
            withCredentials: true
        }).then(response => {
            if (!response.data.success) {
                throw Error(response.data.errMsg);
            }
            setCallState(2);
            onSuccess(true);
            onErrMsg(null);
            setButtonColor(buttonDefaultColor);

        }).catch(function (e) {
            console.log(e);
            setCallState(3);
            onErrMsg(e.message);
            setButtonColor(buttonErrorColor);

        }).finally(() => {
        });
    }

    return (
        <Button size="large" loading={callState === 1} block={true}
                onClick={handleClick} style={{
            fontWeight: 'bold',
            fontSize: 'large',
            color: "#ffffff",
            backgroundColor: buttonColor
        }}>共享设备</Button>
    );
}