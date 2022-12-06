import React, { Component } from 'react';

export class FindConvexHull extends Component {
    static displayName = FindConvexHull.name;

    constructor(props) {
        super(props);
        this.state = {};
    }

    useEffect() {
        this.populateWeatherData();
    }

    render() {
        let contents = 'Hello world'

        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        this.setState({});
    }
}
