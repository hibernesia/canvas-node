import React, { Component } from 'react'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { initializeIcons } from '@uifabric/icons';
import {saveAs} from "file-saver"
initializeIcons();

class MenuBar extends Component {
	// constructor(props) {
	// 	super(props)
	// }

    exportJPG = ()=>{
		saveAs(this.props.cy.jpg(),"graph download.jpg")
    }
    exportPNG = ()=>{
		saveAs(this.props.cy.png({bg:"white"}),"graph download.png")
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