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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: 3
        });
        //const data = await response.json();
        const data = await response;
        alert(data.value);
        return data;
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
