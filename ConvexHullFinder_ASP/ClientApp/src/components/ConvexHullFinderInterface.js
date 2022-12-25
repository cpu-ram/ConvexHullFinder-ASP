import React, { Component } from 'react';
import { useEffect, useState } from 'react';

function ConvexHullFinderInterface() {
    const [pointsEntered, setPointsEntered] = useState([]);
    const [convexHull, setConvexHull] = useState([]);
    const [currentStatus, setCurrentStatus] = useState("enteringPoints");

    function PointsEntered(props) {
        return (
            <>
                {pointsEntered.map((point, index) => (<circle key={index} cx={point.x} cy={point.y} r='5' />))}
            </>
        )
    }
    function ConvexHull(props) {
        return <div></div>;
    }
    function BoardContents(props) {
        let currentStatus = props.currentStatus;
        if (currentStatus = "enteringPoints") {
            
            return <><PointsEntered></PointsEntered></>;
        }
        else if (currentStatus = "displayingConvexHull") {
            return (
                <>
                    <PointsEntered></PointsEntered>
                    <ConvexHull></ConvexHull>
                </>
            )
        }
        else throw new DOMException();
    }
    function Buttons(props) {
        let currentStatus = props.currentStatus;

            return (
                <>
                    {currentStatus == "enteringPoints" &&
                        <button onClick={findConvexHull}>Submit</button>}
                    <button onClick={clearBoard}>Clear</button>
                </>
            )
        
    }

    function clearBoard() {
        setPointsEntered([]);
        setConvexHull([]);
        setCurrentStatus("enteringPoints");
    }

    function handleClick(e) {
        if (currentStatus != "enteringPoints") return;

        let enteredViewPortCoordinates = { x: e.clientX, y: e.clientY };
        let boardPosition = document.querySelector('#board').getBoundingClientRect();
        let boardRelativeClickCoordinates = {
            x: enteredViewPortCoordinates.x - boardPosition.left,
            y: enteredViewPortCoordinates.y - boardPosition.top
        }
        setPointsEntered([...pointsEntered, boardRelativeClickCoordinates]);
    }

    async function findConvexHull() {
        const points = JSON.stringify(pointsEntered);


        const response = await fetch('findconvexhull', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: points
        });
        const data = await response;
        const text = await data.text();
        console.log(text);
        setCurrentStatus("displayingConvexHull");
    }


    return (
        <>
            <div id="entryBoard" style={{
                display: "block", boxSizing: "border-box", width: "530px", height: "530px",
                margin: "0", paddingTop: "15px", paddingRight: "15px",
                paddingLeft: "15px", paddingBottom: "15px", outline: "1px solid red"
            }}>
                <svg id="board" onClick={handleClick}
                    xmlns="http://www.w3.org/2000/svg" width="500px" height="500px"
                        style={{
                            display: "block", margin: "0",
                            boxSizing: "content-box", padding: "0", outline: "1px solid blue"
                        }}>
                    <BoardContents currentStatus={currentStatus} ></BoardContents>
                    
                </svg>
            </div>

            <Buttons currentStatus={currentStatus}></Buttons>

        </>
    );
}

export default ConvexHullFinderInterface;
