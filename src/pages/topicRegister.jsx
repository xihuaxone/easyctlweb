import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import Password from "antd/lib/input/Password";
import {Image, Input, Layout, Space, Tooltip} from "antd";
import {InfoCircleOutlined, UserOutlined} from "@ant-design/icons";
import {Content, Footer, Header} from "antd/lib/layout/layout";
import RegisterButton from "../components/RegisterButton";
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
            navigate('/login');
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
                <Image height={"100%"} src="imgs/rem.jpg" preview={false}/>
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

