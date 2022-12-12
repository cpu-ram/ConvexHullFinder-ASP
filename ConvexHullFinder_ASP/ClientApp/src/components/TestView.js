import React, { Component } from 'react';

export class TestView extends Component {
    static displayName = TestView.name;

    constructor(props) {
        super(props);
        this.state = {numbers: 3}
    }

    async FetchStuff() {
        const response = await fetch('testcontroller');
        this.setState({ response });
    }

    render() {

        return (
            <div>
                {this.state.numbers}
            </div>
        );
    }
}
export default TestView;
