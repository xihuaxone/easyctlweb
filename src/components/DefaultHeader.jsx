import {Button, Image} from "antd";
import {Header} from "antd/lib/layout/layout";
import React from "react";

export default function DefaultHeader({navigate}) {
    return (<Header className={"defaultHeader"}>
        <Button className={"defaultBackButton"} onClick={() => {
            navigate(-1)
        }}>Back</Button>
        <Image style={{width: "15rem", height: "15rem", marginTop: "1.5rem"}} src="imgs/rem.png" preview={false}/>
    </Header>)
}