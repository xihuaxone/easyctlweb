import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Button, Image, Input, Layout, Space, Tooltip} from "antd";
import {Content, Footer, Header} from "antd/lib/layout/layout";
import TopicRegisterButton from "../components/TopicRegisterButton";


export default function TopicRegister() {
    const navigate = useNavigate();

    const [topic, setTopic] = useState("");
    const [api, setApi] = useState("");
    const [params, setParams] = useState("");
    const [actionName, setActionName] = useState("");

    const [errMsgTip, setErrMsgTip] = useState("");
    const [tipOpen, setTipOpen] = useState(false);

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
            <Header className={"defaultHeader"}>
                <Button className={"defaultBackButton"} onClick={()=>{navigate(-1)}}>Back</Button>
                <Image style={{width: "15rem", height: "15rem"}} src="imgs/rem.png" preview={false}/>
            </Header>
            <Content className={"defaultContent"}>
                <Space direction="vertical" size="large" style={{display: 'flex'}}>
                    <Input id="topic" placeholder="Enter topic"
                           onInput={() => {
                               setTopic(document.getElementById('topic').value);
                           }}
                    />
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
                        <TopicRegisterButton
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

