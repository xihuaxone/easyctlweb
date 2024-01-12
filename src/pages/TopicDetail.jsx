import {Button, Col, Divider, Row} from 'antd';
import {useLocation} from "react-router-dom";


export default function TopicDetail(props: any) {
    let location = useLocation();
    let topicDetail = location.state;
    if (Object.keys(topicDetail).length !== 1) {
        throw Error("data size error, data: " + JSON.stringify(topicDetail));
    }
    let topicStr = Object.keys(topicDetail)[0];
    let apiList = topicDetail[topicStr];

    return (
        <p style={{marginBottom: "3rem", marginTop: "0rem"}}>
            <Divider orientation="center">{topicStr}</Divider>
            <Row justify={"start"} style={{marginLeft: "2rem", marginTop: "2rem", textAlign: "left", fontWeight: "bold"}}>
                <Col span={6}><p style={{fontSize: "1rem"}}>Api</p></Col>
                <Col span={8}><p style={{fontSize: "1rem"}}>Params</p></Col>
                <Col span={6} ><p style={{textAlign: "center", fontSize: "1rem", width: '8rem'}}>Action</p></Col>
            </Row>
            {apiList.map((apiInfo) => {
                let api = apiInfo["api"];
                let params = apiInfo["params"];
                let actionName = apiInfo["actionName"];
                return (
                    <Row justify={"start"} style={{marginLeft: "2rem", marginTop: "5rem", color: "#bebebe", textAlign: "left", fontStyle: "italic"}}>
                        <Col span={6}><p>{api}</p></Col>
                        <Col span={8}><p>{params}</p></Col>
                        <Col span={6}><Button style={{
                            color: '#ffffff',
                            backgroundColor: '#1676FDFF',
                            borderRadius: '2rem',
                            height: '3rem',
                            width: '8rem',
                        }}>{actionName}</Button></Col>
                    </Row>
                );
            })}
        </p>
    )
}