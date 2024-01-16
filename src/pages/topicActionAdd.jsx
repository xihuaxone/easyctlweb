import React, {useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Image, Input, Layout, Space, Tooltip} from "antd";
import {Content, Footer, Header} from "antd/lib/layout/layout";
import DefaultHeader from "../components/DefaultHeader";
import TopicActionAddButton from "../components/TopicActionAddButton";


export default function TopicActionAdd() {
    const navigate = useNavigate();

    const [api, setApi] = useState("");
    const [params, setParams] = useState("");
    const [actionName, setActionName] = useState("");

    const [errMsgTip, setErrMsgTip] = useState("");
    const [tipOpen, setTipOpen] = useState(false);

    let location = useLocation();
    let data = location.state;
    const topic = Object.valueOf("topic");

    const onSuccess = isSuccess => {
        if (isSuccess) {
            navigate('/topicList');
        }
    }

    const onErrMsg = errMsg => {
        if (errMsg !== null && errMsg.length > 0) {
            setErrMsgTip(errMsg);
            setTipOpen(true);
        } else {
            setErrMsgTip("");
            setTipOpen(false);
        }

    }

    return (
        <Layout className={"defaultLayout"}>
            <DefaultHeader navigate={navigate}/>
            <Content className={"defaultContent"}>
                <Space direction="vertical" size="large" style={{display: 'flex'}}>
                    <Input id="api" placeholder="Enter api"
                           onInput={() => {
                               setApi(document.getElementById('api').value);
                           }}
                    />
                    <Input id="params" placeholder="Enter params"
                           onInput={() => {
                               setParams(document.getElementById('params').value);
                           }}
                    />
                    <Input id="actionName" placeholder="Enter actionName"
                           onInput={() => {
                               setActionName(document.getElementById('actionName').value);
                           }}
                    />
                </Space>

            </Content>
            <Footer className={"defaultFooter"}>
                <div>
                    <Tooltip title={errMsgTip} trigger="click" open={tipOpen}>
                        <TopicActionAddButton
                            topic={topic}
                            api={api}
                            params={params}
                            actionName={actionName}
                            onSuccess={onSuccess}
                            onErrMsg={onErrMsg}/>
                    </Tooltip>
                </div>
            </Footer>
        </Layout>
    )
}

