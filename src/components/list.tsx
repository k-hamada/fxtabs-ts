import * as React from 'react';

import { TabContainer } from '../modules/tab_container';
import ListItem from '../components/list_item';

const List = (prop: TabContainer) => <>
  <ul>
    { prop.Tabs.map(tab => <ListItem tab={ tab } key={ tab.DataPersistentId.id } />) }
  </ul>
</>

export default List