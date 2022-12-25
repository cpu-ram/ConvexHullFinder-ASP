import React, { Component } from 'react';
import ConvexHullFinderInterface from './ConvexHullFinderInterface.js';


export class FindConvexHull extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ConvexHullFinderInterface>
                </ConvexHullFinderInterface>
            </div>
        );
    }
}
