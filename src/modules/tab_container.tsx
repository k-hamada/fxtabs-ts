import { TabObject } from '../interfaces/recovery'
import { Tab } from '../components/tab';

export class TabContainer {
    private map: Map<string, Tab>

    public get Tabs() { 
        return Array.from(this.map.values())
    }

    constructor(tabs: TabObject[]) {
        this.map = new Map<string, Tab>(
            tabs.map(t => new Tab(t))
                .map(t => [t.DataPersistentId.id, t] as [string, Tab])
        )

        for (const tab of this.map.values()) {
            this.crowl(tab)
        }
    }

    crowl(tab: Tab) {
        if (!tab.HasChild) return

        for (const [index, childId] of tab.Children.entries()) {
            this.move(tab, index, childId)
        }
    }

    move(tab: Tab, index: number, childId: string) {
        const childTab = this.map.get(childId);
        if (!childTab) return

        tab.SetChild(childTab, index)
        this.crowl(childTab)
        this.map.delete(childId)
    }
}

