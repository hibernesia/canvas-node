import React, { Component } from 'react'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { initializeIcons } from '@uifabric/icons';
import {saveAs} from "file-saver"
initializeIcons();

class MenuBar extends Component {
	constructor(props) {
		super(props)
	}

	componentDidUpdate(){
		console.log(this.props.nama)
	}
  	exportJPG = ()=>{
		console.log(this.props.cy)
		saveAs(this.props.cy.jpg(),"graph download.jpg")
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
                      },
                    },
                    {
                      key: 'download',
                      text: 'Download',
                      iconProps: { iconName: 'Download' },
                      onClick: this.exportJPG,
                    }]}
                />
            </div>
        )
    }
}

export default  MenuBar;