import React from "react";
import axiosClient from "../utils/axiosClientJs";

function listTopics() {
    axiosClient({
        method: 'get',
        url: '/topic/list',
        withCredentials: true
    }).then(response => {
        console.log(response.data);
        if (!response.data.success) {
            alert("api error: " + response.data.errMsg);
            return;
        }

        initTopicView(response.data.data);
    }).catch (function (e) {
        console.log(e);
        alert(e);
    });
}

function initTopicView(topicList) {
    var topicTable = document.createElement("table");

    for (let i = 0; i < topicList.length; i++) {
        const topic = topicList[i];
        const topicRow = document.createElement("tr");
        topicTable.appendChild(topicRow);

        topicRow.style.width = "100px";
        topicRow.style.height = "100px";
        topicRow.style.marginLeft = "auto";
        topicRow.style.marginRight = "auto";
        topicRow.style.marginTop = "auto";
        topicRow.style.marginBottom = "auto";
        topicRow.textContent = topic.topic;

        const apiTable = document.createElement("table");
        topicRow.appendChild(apiTable);

        for (let j = 0; j < topic.topicApiDTOList.length; j++) {
            const api = topic.topicApiDTOList[j];
            const apiRow = document.createElement("tr");
            apiTable.appendChild(apiRow);

            const apiCell = document.createElement("td");
            apiCell.style.width = "100px";
            apiCell.style.height = "100px";
            apiCell.style.marginLeft = "auto";
            apiCell.style.marginRight = "auto";
            apiCell.style.marginTop = "auto";
            apiCell.style.marginBottom = "auto";
            apiCell.textContent = api.api;

            const paramsCell = document.createElement("td");
            paramsCell.style.width = "100px";
            paramsCell.style.height = "100px";
            paramsCell.style.marginLeft = "auto";
            paramsCell.style.marginRight = "auto";
            paramsCell.style.marginTop = "auto";
            paramsCell.style.marginBottom = "auto";
            paramsCell.textContent = api.params;

            apiRow.appendChild(apiCell);
            apiRow.appendChild(paramsCell);
        }
    }
    document.getElementById('topicList').appendChild(topicTable);
}

export default function Topics() {
        try {
            listTopics();
        } catch (e) {
            alert(e.message);
        }

        return (
            <div style={{width: 400, margin: '100px auto'}}>
                <center>
                    <div id="topicList">
                    </div>
                </center>
            </div>
        )
}
