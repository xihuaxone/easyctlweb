import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import LoginButton from "../components/LoginButton";
import Password from "antd/lib/input/Password";
import {Button, Image, Input, Layout, Space, Tooltip} from "antd";
import {InfoCircleOutlined, UserOutlined} from "@ant-design/icons";
import {Content, Footer, Header} from "antd/lib/layout/layout";

export default function Login() {
    const navigate = useNavigate();

    const [loginAccount, setLoginAccount] = useState("");
    const [password, setPassword] = useState("");
    const [errMsgTip, setErrMsgTip] = useState("");
    const [tipOpen, setTipOpen] = useState(false);

    const onLoginSuccess = isSuccess => {
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
        <Layout className={"defaultLayout"} onLoad={async () => {
            let auth = localStorage.getItem("Authorization");
            if (auth != null && auth.length > 0) {
                const sleep = ms => new Promise(r => setTimeout(r, ms));
                await sleep(1000);
                onLoginSuccess(true);
            }
        }}>
            <Header className={"defaultHeader"}>
                <Button className={"defaultBackButton"} onClick={() => {
                    navigate(-1)
                }}>Back</Button>
                <Image style={{width: "15rem", height: "15rem"}} src="imgs/rem.png" preview={false}/>
            </Header>
            <Content className={"defaultContent"}>
                <Space direction="vertical" size="large" style={{display: 'flex'}}>
                    <Input
                        id="loginAccount"
                        placeholder="Enter your login account"
                        prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                        suffix={
                            <Tooltip title="Extra information">
                                <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                            </Tooltip>
                        }
                        onInput={() => {
                            setLoginAccount(document.getElementById('loginAccount').value);
                        }}
                    />
                    <Password id="password" placeholder="input password" onInput={() => {
                        setPassword(document.getElementById('password').value);
                    }}/>
                </Space>

            </Content>
            <Footer className={"defaultFooter"}>
                <div>
                    <Tooltip title={errMsgTip} trigger="click" open={tipOpen}>
                        <LoginButton loginAccount={loginAccount}
                                     password={password}
                                     onLoginSuccess={onLoginSuccess}
                                     onErrMsg={onErrMsg}/>
                        <Button onClick={() => {
                            navigate('/register')
                        }} size="large" block={true}
                                style={{fontWeight: 'bold', fontSize: 'large', marginTop: "0.5rem"}}>注册</Button>
                    </Tooltip>
                </div>
            </Footer>
        </Layout>
    )
}

