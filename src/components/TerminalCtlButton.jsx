import {Button, Tooltip} from "antd";
import React, {useState} from "react";
import axiosClient from "../utils/axiosClientJs";

const buttonDefaultColor = "#1676FDFF";
const buttonBusyColor = "#595959";
const buttonErrorColor = "#f5b235";

export default function TerminalCtlButton({actionName, topicApiId, onSuccess, onErrMsg, addLog}) {
    // 0=wait ctl; 1=controlling; 2=ctl success; 3=ctl failed;

    const [ctlState, setCtlState] = useState(0);
    const [ctlButtonColor, setCtlButtonColor] = useState(buttonDefaultColor);
    const [errMsgTip, setErrMsgTip] = useState("");
    const [tipOpen, setTipOpen] = useState(false);

    function handleClick() {
        setErrMsgTip("");
        setTipOpen(false);
        setCtlState(1);
        setCtlButtonColor(buttonBusyColor);

        let data = {
            "topicApiId": topicApiId,
        }

        addLog("info", "post [/terminal/call] with " + JSON.stringify(data));
        axiosClient({
            method: 'post',
            url: '/terminal/call',
            data: data,
            withCredentials: true
        }).then(response => {
            if (!response.data.success) {
                throw Error(response.data.errMsg);
            }
            setCtlState(2);
            onSuccess(topicApiId, true);
            onErrMsg(topicApiId, null);
            setCtlButtonColor(buttonDefaultColor);
            addLog("success", "response = " + JSON.stringify(response.data));
        }).catch(function (e) {
            console.log(e);
            setErrMsgTip(e.message);
            setTipOpen(true);
            setCtlState(3);
            onErrMsg(topicApiId, e.message);
            setCtlButtonColor(buttonErrorColor);
            addLog("error", "errorMessage = " + e.message);
        }).finally(() => {
        });
    }

    return (
        <Tooltip title={errMsgTip} trigger="click" open={tipOpen}>

            <Button size="large" loading={ctlState === 1} block={true} onClick={handleClick} style={{
                fontWeight: 'bold',
                fontSize: 'large',
                color: "#ffffff",
                backgroundColor: ctlButtonColor
            }}>{actionName}</Button>
        </Tooltip>
    );
}