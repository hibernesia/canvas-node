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
                    farItems={_farItems}
                    ariaLabel="Use left and right arrow keys to navigate between commands"
                />
            </div>
        )
    }
}

const _items= [
  {
    key: 'newItem',
    text: 'New',
    cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
    iconProps: { iconName: 'Add' },
    subMenuProps: {
      items: [
        {
          key: 'node',
          text: 'Node',
          iconProps: { iconName: 'Circle' },
        },
        {
          key: 'edge',
          text: 'Edge',
          iconProps: { iconName: 'Arrow' },
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


const _farItems = [
  {
    key: 'tile',
    text: 'Grid view',
    // This needs an ariaLabel since it's icon-only
    ariaLabel: 'Grid view',
    iconOnly: true,
    iconProps: { iconName: 'Tiles' },
    onClick: () => console.log('Tiles'),
  },
  {
    key: 'info',
    text: 'Info',
    // This needs an ariaLabel since it's icon-only
    ariaLabel: 'Info',
    iconOnly: true,
    iconProps: { iconName: 'Info' },
    onClick: () => console.log('Info'),
  },
];

