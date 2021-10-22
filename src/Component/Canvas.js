import React, { Component } from 'react'
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import cxtmenu from 'cytoscape-cxtmenu';
// import $ from "jquery";
import { v4 as uuidv4 } from 'uuid';
import DialogCustom from './subcomponent/DialogCustom';
import MenuBar from './MenuBar';
import { TextField } from '@fluentui/react';
import { PostData } from './subcomponent/indexedDB';

cytoscape.use( cxtmenu );
cytoscape.use( edgehandles );
export default class Canvas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isClosed: true,
            node_name :'',
            cy:[]
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
                            "width": '20px',
                            "height": '20px',
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
                          'width': 0,
                          'height': 0,
                          'shape': 'ellipse',
                          'overlay-opacity': 0,
                          'border-width': 12, // makes the handle easier to hit
                          'border-opacity': 0
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
                layout: {
                    name: 'random',
                    fit:true,
                    animate:false,
                }
            }
        );

        this.cy.cxtmenu({
            selector: 'node, edge',
            menuRadius: function(ele){ return 85; },
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
        var eh = this.cy.edgehandles()
        this.cy.one('cxttap', function(evt){
            eh.disableDrawMode()
        })

        this.cy.cxtmenu({
            selector: 'core',   
            menuRadius: function(ele){ return 85; },
            indicatorSize: 24,
            minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
            maxSpotlightRadius: 38,
            commands: [
                {
                    content: 'Node',
                    select: this.handleDialogOpen
                },

                {
                    content: 'Edge',
                    select: this.addEdge
                }
            ],
            openMenuEvents: 'cxttapstart',
            atMouse:true
        });

        this.setState({
            cy:this.cy
        })
    }
   
    addEdge =()=>{
        if(this.cy.nodes().length<=0){
            alert('node kosong')
        }
        else if(this.cy.nodes().length===1){
            alert('Node hanya 1, tambahkan lebih banyak node lagi!')
        }
        else{
            var eh = this.cy.edgehandles()
            localStorage.setItem('data', JSON.stringify(this.cy.json().elements.nodes))
            eh.enableDrawMode()
        }
        
    }

    handleDialogOpen = () =>{
        this.setState({
            isClosed : false
        })
        var eh = this.cy.edgehandles()
        this.cy.one('cxttap', function(evt){
            eh.disableDrawMode()
        })
    }

    handleDialogClose = ()=>{
        this.setState({
            isClosed:true
        })
    }

    handleAddNewNode = (e) =>{
        e.preventDefault();
        console.log(e)
        this.setState({Clicked: !this.state.Clicked});
        var data_add = {}, unique_id = uuidv4()
        
        data_add = {
            group: 'nodes',
            data: {
                    id : unique_id,
                    label: this.state.node_name,
                    size:30,
                    warna : "#a36f34"
            },
            renderedPosition: {
                x: 50,
                y: 50,
            },
        }
        this.cy.add([data_add])
        this.setState({
            isClosed:true
        })
        console.log(this.cy.json())
        PostData(data_add.data)
        // // const { data } = this.state
        localStorage.setItem('data', JSON.stringify(this.cy.json().elements.nodes))
    }
    handleNodeName = (e) =>{
        this.setState({
            node_name : e.target.value
        })
    }
    render() {
        const cyStyle = {
            width: "100%",
            height: "93vh",
        };
        return (
            <div>
                <MenuBar cy={this.state.cy} isClosed={this.handleDialogOpen}/>
                <div style={cyStyle} id="cy"/>
                <DialogCustom
                    isOpen={this.state.isClosed}
                    handleClose={this.handleDialogClose}
                    title="tes"
                    handleExecute={this.handleAddNewNode}
                    buttonConfirmTitle="Add"
                    buttonDiscardTitle="Cancel"
                >
                    <TextField autoComplete="off" onChange={this.handleNodeName} placeholder="Name Node" />
                </DialogCustom>
            </div>
        )
    }
}
