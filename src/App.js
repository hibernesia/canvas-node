import React, { Component } from 'react'
import Canvas from './Component/Canvas'
import MenuBar from './Component/MenuBar'
export default class App extends Component {
  render() {
    return (
      <div>
        {/* <Header/> */}
        {/* <Toolbox/> */}
          <Canvas/>

      </div>
    )
  }
}
