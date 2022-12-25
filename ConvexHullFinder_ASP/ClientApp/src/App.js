import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FindConvexHull } from './components/FindConvexHull';
import { FindConvexHullAlt } from './components/FindConvexHullAlt';
import ConvexHullFinderInterface from './components/ConvexHullFinderInterface.js';
import TestView from './components/TestView';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={TestView} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/find-convex-hull' component={FindConvexHull} />
        <Route path='/find-convex-hull-alt' component={FindConvexHullAlt} />
        <Route path='/convex-hull-finder-interface' component={ConvexHullFinderInterface} />
        <Route path='/test-view' component={TestView} />
      </Layout>
    );
  }
}
