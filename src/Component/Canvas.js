import React, { Component } from 'react'
import cytoscape from 'cytoscape'
export default class Canvas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    componentDidMount(){
        this.cy = cytoscape(
            {
                container: document.getElementById('cy'),
                boxSelectionEnabled: false,
                autounselectify: true,
                style:[
                    {
                    selector: 'node',
                        style: {
                            'content': 'data(label)',
                            'background-color': 'data(warna)',
                            "width": '30px',
                            "height": '30px',
                            'text-margin-y':'-10px',
                        }
                    },
                    {
                        selector: 'edge',
                        style: {
                            'content': 'data(label)', // maps to data.label
                            'curve-style': 'bezier',
                            'target-arrow-shape': 'triangle',
                            "control-point-distance": 30,
                            "control-point-weight": 0.5,
                            "font-family": "FreeSet,Arial,sans-serif",
                            "font-size": 12,
                            "font-weight": "bold",
                            "text-background-opacity": 1,
                            "text-background-color": "#ffffff",
                            "text-background-padding": 3,
                            "text-background-shape": "roundrectangle",
                            "width": 1
                        }
                    },
                ],
                elements: [ // list of graph elements to start with
                    { // node a
                      data: { id: 'a' , label:'a'}
                    },
                    { // node b
                      data: { id: 'b' , label:'b'}
                    },
                    { // edge ab
                      data: { id: 'ab', source: 'a', target: 'b' }
                    }
                  ],
                layout: {
                    name: 'random',
                }
            }
        );
    }

    render() {
        const cyStyle = {
            width: "100%",
            height: "93vh",
        };
        return (
            <div>
                <div style={cyStyle} id="cy"/>
            </div>
        )
    }
}
