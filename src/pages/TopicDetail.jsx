import {Button, Col, Divider, List, Row, Switch} from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import TerminalCtlButton from "../components/TerminalCtlButton";
import React, {useEffect, useRef, useState} from "react";

const terminalCtlButtonStyle = {
    color: '#ffffff',
    backgroundColor: '#1676FDFF',
    borderRadius: '2rem',
    height: '3rem',
    width: '8rem',
};

const logStyle = {
    height: "20rem",
    marginLeft: "2rem",
    marginRight: "2rem",
    overflow: "hidden",
    overflowY: "scroll",
    bordered: true,
    borderStyle: "solid",
    borderWidth: "2px",
    marginTop: "1rem",
};

export default function TopicDetail(props: any) {
    const navigate = useNavigate();
    const logListRef = useRef(null);
    const [logList, setLogList] = useState([]);
    const [logOn, setLogOn] = useState(false);
    let location = useLocation();
    let topicDetail = location.state;
    if (Object.keys(topicDetail).length !== 1) {
        throw Error("data size error, data: " + JSON.stringify(topicDetail));
    }
    let topicStr = Object.keys(topicDetail)[0];
    let apiList = topicDetail[topicStr];

    const addLog = (level: string, msg: string) => {
        let logMsg: string = `[${level}] - ${msg}`;
        setLogList(prevList => {
            return [
                ...prevList,
                logMsg
            ]
        });
    }

    useEffect(() => {
        const current = logListRef.current;
        if (current) {
            current.scrollTop = current.scrollHeight
        }
    }, [logList])

    const onSuccess = (topicApiId, isSuccess) => {
    }

    const onErrMsg = (topicApiId, errMsg) => {
    }

    return (
        <div style={{marginBottom: "3rem", marginTop: "0rem"}}>
            <Button className={"defaultBackButton"} onClick={()=>{navigate(-1)}}>Back</Button>
            <Switch checkedChildren="Log on" unCheckedChildren="Log off" checked={logOn} onChange={() => {
                setLogOn(!logOn);
            }}
                    style={{marginTop: "2rem", marginRight: "1rem", marginBottom: "2rem"}}/>
            <div style={logStyle} ref={logListRef} hidden={!logOn}>
                <Divider orientation="center">Log</Divider>
                <List size="small" bordered={false} dataSource={logList}
                      renderItem={(item) => <List.Item
                          style={{textAlign: "left", fontSize: "0.8rem", lineHeight: "1.1rem"}}
                      >{item}</List.Item>}
                />
            </div>

            <Divider orientation="center">{topicStr}</Divider>
            <Row justify={"start"}
                 style={{marginLeft: "2rem", marginTop: "2rem", textAlign: "left", fontWeight: "bold"}}>
                <Col span={6}><p style={{fontSize: "1rem"}}>Api</p></Col>
                <Col span={8}><p style={{fontSize: "1rem"}}>Params</p></Col>
                <Col span={6}><p style={{textAlign: "center", fontSize: "1rem", width: '8rem'}}>Action</p></Col>
            </Row>
            {apiList.map((apiInfo) => {
                let topicApiId = apiInfo["id"];
                let api = apiInfo["api"];
                let params = apiInfo["params"];
                let actionName = apiInfo["actionName"];
                const getKey = (suffix: string) => {
                    return topicApiId + suffix;
                }
                return (
                    <Row justify={"start"} style={{
                        marginLeft: "2rem",
                        marginTop: "5rem",
                        color: "#bebebe",
                        textAlign: "left",
                        fontStyle: "italic"
                    }} key={getKey("row1")}>
                        <Col span={6}><p>{api}</p></Col>
                        <Col span={8}><p>{params}</p></Col>
                        <Col span={6}>
                            <TerminalCtlButton style={terminalCtlButtonStyle}
                                               actionName={actionName}
                                               topicApiId={topicApiId}
                                               onSuccess={onSuccess}
                                               onErrMsg={onErrMsg}
                                               addLog={addLog}>
                                {actionName}</TerminalCtlButton>
                        </Col>
                    </Row>
                );
            })}
        </div>
    )
}