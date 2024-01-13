import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import LoginButton from "../components/LoginButton";
import Password from "antd/lib/input/Password";
import {Image, Input, Layout, Space, Tooltip} from "antd";
import {InfoCircleOutlined, UserOutlined} from "@ant-design/icons";
import {Content, Footer, Header} from "antd/lib/layout/layout";
import RegisterButton from "../components/RegisterButton";

const headerStyle: React.CSSProperties = {
    color: 'transparent',
    backgroundColor: 'transparent',
    height: '30%',
};

const contentStyle: React.CSSProperties = {
    color: 'transparent',
    backgroundColor: 'transparent',
    paddingTop: '5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',

};

const footerStyle: React.CSSProperties = {
    color: 'transparent',
    backgroundColor: 'transparent',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',

};

const layoutStyle = {
    textAlign: 'center',
    borderRadius: 0,
    overflow: 'scroll',
    position: "absolute",
    width: 'calc(100%)',
    bottom: '0',
    top: '0',
    color: '#f3f3f3',
    backgroundColor: '#f3f3f3',
};

const loginButtonStyle = {}

export default function Register() {
    const navigate = useNavigate();

    const [nickName, setNickName] = useState("");
    const [loginAccount, setLoginAccount] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
        <Layout style={layoutStyle}>
            <Header style={headerStyle}>
                <Image height={"100%"} src="imgs/rem.jpg" preview={false}/>
            </Header>
            <Content style={contentStyle}>
                <Space direction="vertical" size="large" style={{display: 'flex'}}>
                    <Input
                        id="nickName"
                        placeholder="Enter your nick name"
                        prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                        onInput={() => {
                            setNickName(document.getElementById('nickName').value);
                        }}
                    />
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
                    <Password id="cofirmPassword" placeholder="input password again" onInput={() => {
                        setConfirmPassword(document.getElementById('cofirmPassword').value);
                    }}/>
                </Space>

            </Content>
            <Footer style={footerStyle}>
                <div style={loginButtonStyle}>
                    <Tooltip title={errMsgTip} trigger="click" open={tipOpen}>
                        <RegisterButton nickName={nickName}
                                        loginAccount={loginAccount}
                                        password={password}
                                        confirmPassword={confirmPassword}
                                        onSuccess={onSuccess}
                                        onErrMsg={onErrMsg}/>
                    </Tooltip>
                </div>
            </Footer>
        </Layout>
    )
}

