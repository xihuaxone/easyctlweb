import {Col, Row} from 'antd';
import axiosClient from "../utils/axiosClientJs";
import {useEffect, useState} from "react";
import {KeyOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

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

const topicOnlineColor = "#1676FDFF";
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
        <>
            <Row justify={"start"}
                 style={{marginLeft: "2rem", marginTop: "2rem", textAlign: "center", fontWeight: "bold"}}>
                <Col span={8} offset={3}><p>Topic</p></Col>
            </Row>
            <Row justify={"start"}
                 style={{marginLeft: "2rem", marginTop: "2rem", textAlign: "center", fontWeight: "bold"}}>
                {topicsInfo.map((topicInfo) => {
                    let topic = topicInfo["topic"];
                    let apiList = topicInfo["topicApiDTOList"];
                    return (
                        <Col span={8} offset={3} style={{color: topicsColorMap[topic]}} onClick={() => {
                            openTopicDetail(topic, apiList);
                        }}>
                            <KeyOutlined style={{fontSize: "5rem"}}/><br/>
                            <p>{topic}</p></Col>
                    );
                })}
            </Row>
        </>
    )
}