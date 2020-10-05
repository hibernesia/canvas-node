import React, { Component } from 'react'
import Canvas from './Component/Canvas'
import Header from './Component/Header'
import Toolbox from './Component/Toolbox'
export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Toolbox/>
          <Canvas/>
      </div>
    )
  }
}
