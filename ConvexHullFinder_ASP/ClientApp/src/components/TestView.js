import React, { Component } from 'react';


export class TestView extends Component {
    static displayName = TestView.name;

    constructor(props) {
        super(props);
        this.state = { numbers: 3 }
    }

    async FetchStuff() {
        const response = await fetch('test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: "ohoho"
        });
        const data = await response;
        return data.text();
    }

    render() {
        const data = this.FetchStuff().then((result) => console.log(result));
        return (
            <div>
                Hello
            </div>
        );
    }
}
export default TestView;