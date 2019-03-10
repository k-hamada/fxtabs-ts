import React from 'react'
import { Tab } from './tab'
import Item from './item'

type Props = {
  tab: Tab
}

const ListItem: React.FunctionComponent<Props> = ({ tab }: Props) => (
  <li>
    <Item
      url={tab.CurrentEntry.url}
      title={tab.CurrentEntry.title}
      favIcon={tab.FavIcon ? tab.FavIcon.favIconUrl : null}
    />
    <ul>
      {tab.ChildrenTabs.map(child => (
        <ListItem tab={child} key={child.DataPersistentId.id} />
      ))}
    </ul>
  </li>
)

export default ListItem
