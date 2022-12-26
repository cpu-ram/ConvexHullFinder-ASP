import React, { Component } from 'react';
import { useEffect, useState } from 'react';

function ConvexHullFinderInterface() {
    const [pointsEntered, setPointsEntered] = useState([]);
    const [stash, setStash] = useState([]);
    const [convexHull, setConvexHull] = useState([]);
    const [currentStatus, setCurrentStatus] = useState("enteringPoints");
    const [polygons, setPolygons] = useState([[]]);
    const [mousePos, setMousePos] = useState({});

    const [extraPolygon, setExtraPolygon] = useState([]);

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
    function Polygons(props) {
        const result = polygons.map((polygon) => Polygon(polygon)).reduce((a, b) => a.concat(b));
        return result;
    }
    function Polygon(points) {
        const polygonPointsString =
            points.map((point) => point.x + "," + point.y + " ")
                .reduce((a, b) => a.concat(b));
        console.log(polygonPointsString);
        return (
            <>
                <polygon points=
                    {polygonPointsString}
                    style={{ fill: "none", stroke: "green", strokeWidth: 1 }} />
            </>
        )
    }
    function CreatePolygon(jsonString) {
        const pointsArray = JSON.parse(jsonString);
        const polygon = Polygon(pointsArray);
        return polygon;
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
        let entryData = props.entryData;
            return (
                <>
                    {currentStatus == "enteringPoints" &&
                        <button onClick={findConvexHull}>Submit</button>}
                    <button onClick={clearBoard}>Clear</button>
                    <button onClick={stashUp}>Stash points</button>
                    {stash.length>0 &&
                        <button onClick={popStash}>Pop stash</button>}
                    <br /><br />
                    
                </>
            )
        
    }
    function ExtraPolygon(props) {
        let bool = false;
        let pointsJson = "[{\"x\":379,\"y\":493},{\"x\":449,\"y\":445},{\"x\":489,\"y\":336},{\"x\":96,\"y\":8},{\"x\":3,\"y\":211}]";

        if (bool) {
            let points = JSON.parse(pointsJson);
            let extraPolygon = new Polygon(points);
            return extraPolygon;
        }
        else return " ";
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

    function handleBoardClick(e) {
        if (currentStatus != "enteringPoints") return;

        let enteredViewPortCoordinates = { x: e.clientX, y: e.clientY };
        let boardPosition = document.querySelector('#board').getBoundingClientRect();
        let boardRelativeClickCoordinates = {
            x: enteredViewPortCoordinates.x - boardPosition.left,
            y: enteredViewPortCoordinates.y - boardPosition.top
        }
        setPointsEntered([...pointsEntered, boardRelativeClickCoordinates]);
    }
    

    useEffect(() => {
        const handleMouseMove = (e) => {
            let enteredViewPortCoordinates = { x: e.clientX, y: e.clientY };
            let boardPosition = document.querySelector('#board').getBoundingClientRect();
            let boardRelativeMouseCoordinates = {
                x: enteredViewPortCoordinates.x - boardPosition.left,
                y: enteredViewPortCoordinates.y - boardPosition.top
            }

            setMousePos({ x: boardRelativeMouseCoordinates.x, y: boardRelativeMouseCoordinates.y });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);

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
                <svg id="board" onClick={handleBoardClick}
                    xmlns="http://www.w3.org/2000/svg" width="500px" height="500px"
                        style={{
                            display: "block", margin: "0",
                            boxSizing: "content-box", padding: "0", outline: "1px solid blue"
                        }}>
                    <BoardContents currentStatus={currentStatus} ></BoardContents>
                    <ExtraPolygon></ExtraPolygon>
                </svg>
            </div>
            <div>
                The mouse is at position{' '}
                <b>
                    ({mousePos.x}, {mousePos.y})
                </b>
            </div>
            <Buttons stash={stash} currentStatus={currentStatus}></Buttons>

        </>
    );
}

export default ConvexHullFinderInterface;
