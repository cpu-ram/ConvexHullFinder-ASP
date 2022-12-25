import React, { Component } from 'react';
import { useEffect, useState } from 'react';

function ConvexHullFinderInterface() {
    const [pointsEntered, setPointsEntered] = useState([]);
    const [stash, setStash] = useState([]);
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
        const polygonPointsString =
            convexHull.map((point) => point.x + "," + point.y + " ")
                .reduce((a,b)=>a.concat(b));
        console.log(polygonPointsString);
        return (
            <>
                <polygon points=
                    {polygonPointsString}
                        style={{fill: "none", stroke:"green", strokeWidth:1}} />
            </>
        )
    }
    function BoardContents(props) {
        let currentStatus = props.currentStatus;
        if (currentStatus == "enteringPoints") {
            return (
                <>
                    <PointsEntered></PointsEntered>
                </>
            );
        }
        else if (currentStatus == "displayingConvexHull") {
            return (
                <>
                    <PointsEntered></PointsEntered>
                    <ConvexHull></ConvexHull>
                </>
            );
        }
        else throw new DOMException();

    }
    function Buttons(props) {
        let currentStatus = props.currentStatus;
        let stash = props.stash;
            return (
                <>
                    {currentStatus == "enteringPoints" &&
                        <button onClick={findConvexHull}>Submit</button>}
                    <button onClick={clearBoard}>Clear</button>
                    <button onClick={stashUp}>Stash points</button>
                    {stash.length>0 &&
                        <button onClick={popStash}>Pop stash</button>}
                </>
            )
        
    }

    function clearBoard() {
        setPointsEntered([]);
        setConvexHull([]);
        setCurrentStatus("enteringPoints");
    }
    function stashUp() {
        setStash(pointsEntered);
    }
    function popStash() {
        if (stash == []) {
            throw new DOMException();
        }
        setPointsEntered(stash);
        setStash([]);
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
        console.log("points entered:" + points);


        const response = await fetch('findconvexhull', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: points
        });
        const data = await response;
        const convexHullJson = await data.text();
        const convexHullReturned = JSON.parse(convexHullJson);
        setConvexHull(convexHullReturned);

        console.log("Convex hull found:" + convexHullJson);
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

            <Buttons stash={stash} currentStatus={currentStatus}></Buttons>

        </>
    );
}

export default ConvexHullFinderInterface;
