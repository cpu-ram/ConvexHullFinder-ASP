import React, { Component } from 'react';


export class TestView extends Component {
    static displayName = TestView.name;

    constructor(props) {
        super(props);
        this.state = {numbers: 3}
    }

    async FetchStuff() {
        //const response = await fetch('testcontroller');

        const response = await fetch('test', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: null // body data type must match "Content-Type" header
        });
        const data = await response.json();
        return data; // parses JSON response into native JavaScript objects
    }

    render() {
        const data = this.FetchStuff().then((value) => console.log(value));
        return (
            <div>
                {this.state.numbers}
            </div>
        );
    }
}
export default TestView;
