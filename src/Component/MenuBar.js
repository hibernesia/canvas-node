import React, { Component } from 'react'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { initializeIcons } from '@uifabric/icons';
import {saveAs} from "file-saver"
import { json2csv } from 'json-2-csv'
initializeIcons();

class MenuBar extends Component {
	constructor(props) {
		super(props)
        this.state = {
            isClosed: true
        }
	}

    exportJPG = ()=>{
		saveAs(this.props.cy.jpg(),"graph download.jpg")
    }
    exportPNG = ()=>{
		saveAs(this.props.cy.png({bg:"white"}),"graph download.png")
	}
    handleCloseDialog = () =>{
        console.log(this.props.isClosed)
    }
    exportCSV = () =>{
        var workspace='', jsondata = []

        this.props.cy.elements().nodes().map((data)=>{
            // console.log(data)
            jsondata.push(data._private.data)
        })
        
        if(this.props.cy.elements().length!==0){
            workspace = 'graph.csv'

            json2csv(jsondata,(err,csv)=>{
                var textEncoder = new TextEncoder('windows-1252'), csvContentEncoded, blob
    
                csvContentEncoded = textEncoder.encode([csv]);
                blob = new Blob([csvContentEncoded], {type: 'text/csv;charset=windows-1252;'});
                saveAs(blob, workspace);
            })
        }
        else{
            alert('node empty')
        }
    }
    render() {
        return (
            <div>
                <CommandBar
                    items={[{
                        key: 'newItem',
                        text: 'New',
                        cacheKey: 'myCacheKey',
                        iconProps: { iconName: 'Add' },
                        subMenuProps: {
                            items: [
                            {
                                key: 'node',
                                text: 'Node',
                                iconProps: { iconName: 'LocationCircle' },
                                onClick: this.props.isClosed
                            },
                            {
                                key: 'edge',
                                text: 'Edge',
                                iconProps: { iconName: 'ArrowTallUpRight' },
                            },
                            ],
                        }},
                        {
                            key: 'export',
                            text: 'Export',
                            cacheKey: 'myCacheKey',
                            iconProps: { iconName: 'Share' },
                            subMenuProps: {
                            items: [
                                {
                                    key: 'jpg',
                                    text: 'JPG',
                                    iconProps: { iconName: 'FileImage' },
                                    onClick : this.exportJPG
                                },
                                {
                                    key: 'png',
                                    text: 'PNG',
                                    iconProps: { iconName: 'FileImage' },
                                    onClick : this.exportPNG
                                },
                                {
                                    key: 'csv',
                                    text: 'CSV',
                                    iconProps: { iconName: 'FileImage' },
                                    onClick : this.exportCSV
                                },
                            ],
                        }}
                    ]
                }
                />
            </div>
        )
    }
}

export default  MenuBar;