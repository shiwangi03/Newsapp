import './App.css';
import React, { Component } from 'react';
import NavBar from './component/NavBar';
import News from './component/News';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={<News key="general" pageSize={9} country="us" category="general" />}
            />
            <Route
              path="/business"
              element={<News key="business" pageSize={9} country="us" category="business" />}
            />
            <Route
              path="/entertainment"
              element={<News key="entertainment" pageSize={9} country="us" category="entertainment" />}
            />
            <Route
              path="/health"
              element={<News key="health" pageSize={9} country="us" category="health" />}
            />
            <Route
              path="/science"
              element={<News key="science" pageSize={9} country="us" category="science" />}
            />
            <Route
              path="/sports"
              element={<News key="sports" pageSize={9} country="us" category="sports" />}
            />
            <Route
              path="/technology"
              element={<News key="technology" pageSize={9} country="us" category="technology" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
