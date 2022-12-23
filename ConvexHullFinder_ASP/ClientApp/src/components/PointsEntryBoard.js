import React, { Component } from 'react';
import { useEffect, useState } from 'react';

function PointsEntryBoard() {
    const [pointsEntered, setPointsEntered] = useState([]);

    function PointsDisplayed(props) {
        return (
            <>
                {pointsEntered.map((point, index) => (<circle key={index} cx={point.x} cy={point.y} r='5' />))}
            </>
        )
    }
    function handleClick(e) {
        console.log("e", e);

        let enteredViewPortCoordinates = { x: e.clientX, y: e.clientY };
        let boardPosition = document.querySelector('#board').getBoundingClientRect();
        let boardRelativeClickCoordinates = {
            x: enteredViewPortCoordinates.x - boardPosition.left,
            y: enteredViewPortCoordinates.y - boardPosition.top
        }
        setPointsEntered([...pointsEntered, boardRelativeClickCoordinates]);
    }
    async function submitPointSet() {

        const response = await fetch('test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: "hello"
        });
        const data = await response;
        const text = await data.text();
        console.log(text);
    }

    return (
        <>
            <div id="entryBoard" style={{
                display: "block", boxSizing: "border-box", width: "530px", height: "530px",
                margin: "0", paddingTop: "15px", paddingRight: "15px",
                paddingLeft: "15px", paddingBottom: "15px", outline: "1px solid red"
            }}>
                <svg id="board" onClick={handleClick} xmlns="http://www.w3.org/2000/svg" width="500px" height="500px"
                    style={{
                        display: "block", margin: "0",
                        boxSizing: "content-box", padding: "0", outline: "1px solid blue"
                    }}>
                    <PointsDisplayed></PointsDisplayed>
                </svg>
            </div>
            <button onClick={submitPointSet}>Submit</button>
        </>
    );
}

export default PointsEntryBoard;
