import React, { Component } from 'react'
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import cxtmenu from 'cytoscape-cxtmenu';

cytoscape.use( cxtmenu );
cytoscape.use( edgehandles );
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
                    {
                        selector: '.eh-handle',
                        style: {
                          'background-color': 'red',
                          'width': 12,
                          'height': 12,
                          'shape': 'ellipse',
                          'overlay-opacity': 0,
                          'border-width': 12, // makes the handle easier to hit
                          'border-opacity': 0
                        }
                      },
          
                      {
                        selector: '.eh-hover',
                        style: {
                          'background-color': 'red'
                        }
                      },
          
                      {
                        selector: '.eh-source',
                        style: {
                          'border-width': 2,
                          'border-color': 'red'
                        }
                      },
          
                      {
                        selector: '.eh-target',
                        style: {
                          'border-width': 2,
                          'border-color': 'red'
                        }
                      },
          
                      {
                        selector: '.eh-preview, .eh-ghost-edge',
                        style: {
                          'background-color': 'red',
                          'line-color': 'red',
                          'target-arrow-color': 'red',
                          'source-arrow-color': 'red'
                        }
                      },
          
                      {
                        selector: '.eh-ghost-edge.eh-preview-active',
                        style: {
                          'opacity': 0
                        }
                      }
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
                    fit:true,
                    animate:false,
                }
            }
        );

        this.cy.cxtmenu({
            selector: 'node, edge',

            commands: [
                {
                    content: '<span class="fa fa-flash fa-2x"></span>',
                    select: function(ele){
                        console.log( ele.id() );
                    }
                },

                {
                    content: '<span class="fa fa-star fa-2x"></span>',
                    select: function(ele){
                        console.log( ele.data('name') );
                    },
                    enabled: false
                },

                {
                    content: 'Text',
                    select: function(ele){
                        console.log( ele.position() );
                    }
                }
            ]
        });

        this.cy.cxtmenu({
            selector: 'core',

            commands: [
                {
                    content: 'bg1',
                    select: function(){
                        console.log( 'bg1' );
                    }
                },

                {
                    content: 'bg2',
                    select: function(){
                        console.log( 'bg2' );
                    }
                }
            ]
        });
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
