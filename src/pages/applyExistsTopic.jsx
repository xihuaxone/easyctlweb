import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Button, Image, Input, Layout, Space, Tooltip} from "antd";
import {Content, Footer, Header} from "antd/lib/layout/layout";
import TopicRegisterButton from "../components/TopicRegisterButton";
import DefaultHeader from "../components/DefaultHeader";
import TopicShareButton from "../components/ApplyExistsTopicButton";
import ApplyExistsTopicButton from "../components/ApplyExistsTopicButton";


export default function ApplyExistsTopic() {
    const navigate = useNavigate();

    const [topic, setTopic] = useState("");

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
            <DefaultHeader navigate={navigate}/>
            <Content className={"defaultContent"}>
                <Space direction="vertical" size="large" style={{display: 'flex'}}>
                    <Input id="topic" placeholder="Enter topic"
                           onInput={() => {
                               setTopic(document.getElementById('topic').value);
                           }}
                    />
                </Space>

            </Content>
            <Footer className={"defaultFooter"}>
                <div>
                    <Tooltip title={errMsgTip} trigger="click" open={tipOpen}>
                        <ApplyExistsTopicButton
                            topic={topic}
                            onSuccess={onSuccess}
                            onErrMsg={onErrMsg}/>
                    </Tooltip>
                </div>
            </Footer>
        </Layout>
    )
}

