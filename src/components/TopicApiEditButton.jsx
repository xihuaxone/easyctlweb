import {Button, Tooltip} from "antd";
import React, {useState} from "react";
import axiosClient from "../utils/axiosClientJs";

const buttonDefaultColor = "#f3f3f3";
const buttonBusyColor = "#595959";
const buttonErrorColor = "#f5b235";

export default function TopicApiEditButton({topicApiId, getApi, getParams, stat, onEditable, onSuccess, onErrMsg, addLog}) {
    // 0=wait ctl; 1=controlling; 2=ctl success; 3=ctl failed;

    const [ctlState, setCtlState] = useState(0);
    const [ctlButtonColor, setCtlButtonColor] = useState(buttonDefaultColor);
    const [errMsgTip, setErrMsgTip] = useState("");
    const [tipOpen, setTipOpen] = useState(false);
    const [editable, setEditable] = useState(false);

    const [buttonContext, setButtonContext] = useState("编辑");

    function handleClick() {
        if (!editable) {
            onEditable(true);
            setEditable(true);
            setButtonContext("保存");
            return
        }

        setErrMsgTip("");
        setTipOpen(false);
        setCtlState(1);
        setCtlButtonColor(buttonBusyColor);

        let data = {
            "topicApiId": topicApiId,
            "api": getApi(),
            "params": getParams(),
            "status": stat
        }

        addLog("info", "post [/topic/update] with " + JSON.stringify(data));
        axiosClient({
            method: 'post',
            url: '/topic/update',
            data: data,
            withCredentials: true
        }).then(response => {
            if (!response.data.success) {
                throw Error(response.data.errMsg);
            }
            setCtlState(2);
            onSuccess(topicApiId, true);
            setCtlButtonColor(buttonDefaultColor);
            addLog("success", "response = " + JSON.stringify(response.data));
            onEditable(false);
            setEditable(false);
            setButtonContext("编辑");

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
                fontWeight: 'normal',
                fontSize: 'small',
                color: "#000000",
                backgroundColor: ctlButtonColor
            }}>{buttonContext}</Button>
        </Tooltip>
    );
}