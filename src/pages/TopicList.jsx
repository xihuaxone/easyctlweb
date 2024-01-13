import {Button, Col, Image, Layout, Row} from 'antd';
import axiosClient from "../utils/axiosClientJs";
import React, {useEffect, useState} from "react";
import {KeyOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {Content, Footer, Header} from "antd/lib/layout/layout";

function listTopics(onSuccess) {
    axiosClient({
        method: 'get',
        url: '/topic/list',
        withCredentials: true
    }).then(response => {
        console.log(response.data);
        if (!response.data.success) {
            throw Error("request /topic/list failed");
        }
        onSuccess(response.data.data);
    }).catch(function (e) {
        console.log(e);
        alert(e.message);
    });
}

const topicOnlineColor = "#2aa834";
const topicOfflineColor = "#bebebe";

export default function TopicList() {
    const navigate = useNavigate();
    const [topicsInfo, setTopicsInfo] = useState([]);
    const [topicsColorMap, setTopicsColorMap] = useState({});

    function openTopicDetail(topicStr: string, apiList) {
        let data = {};
        data[topicStr] = apiList;
        navigate('/topicDetail', {state: data});
    }

    const onSuccess = (topicsInfo) => {
        let topicsColorMapTmpl = {};
        for (let i = 0; i < topicsInfo.length; i++) {
            topicsColorMapTmpl[topicsInfo[i]["topic"]] = topicsInfo[i]["stat"] === 0 ? topicOfflineColor : topicOnlineColor;
        }
        setTopicsColorMap(topicsColorMapTmpl);
        setTopicsInfo(topicsInfo);
    }

    useEffect(() => {
        listTopics(onSuccess);
    }, []);

    return (
        <Layout className={"defaultLayout"}>
            <Header className={"defaultHeader"}>
                <Image height={"70%"} src="imgs/rem.jpg" preview={false}/>
            </Header>
            <Content className={"defaultContent"}>
                <Row justify={"center"}
                     style={{textAlign: "center", fontWeight: "bold"}}>
                    {topicsInfo.map((topicInfo) => {
                        let topic = topicInfo["topic"];
                        let apiList = topicInfo["topicApiDTOList"];
                        return (
                            <Col span={6} style={{color: topicsColorMap[topic]}} onClick={() => {
                                openTopicDetail(topic, apiList);
                            }}>
                                <KeyOutlined style={{fontSize: "5rem"}}/><br/>
                                <p>{topic}</p></Col>
                        );
                    })}
                </Row>
            </Content>
            <Footer className={"defaultFooter"}>
                <Button type={"primary"} onClick={() => {
                    navigate('/topic/register')
                }} size="large" block={true}
                        style={{fontWeight: 'bold', fontSize: 'large', marginTop: "0.5rem"}}>新增设备</Button>
            </Footer>
        </Layout>
    )
}