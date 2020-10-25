import React, { Component } from 'react'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

export default class MenuBar extends Component {
    render() {
        return (
            <div>
                <CommandBar
                    items={_items}
                />
            </div>
        )
    }
}

const _items= [
  {
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
    onClick: () => console.log('Download'),
  },
];

