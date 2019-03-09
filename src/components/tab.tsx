import { TabObject, Entry } from '../interfaces/recovery';

export interface IDataPersistentId {
    id: string;
    tabId: number;
}

export interface IFavIcon {
    url: string;
    favIconUrl: string;
}

export class Tab {
    readonly CurrentEntry: Entry;
    readonly DataPersistentId: IDataPersistentId;
    readonly FavIcon?: IFavIcon;

    readonly Children: string[];
    readonly Ancestors: string[];
    readonly ChildrenTabs: Tab[] = [];

    constructor(tab: TabObject) {
        this.CurrentEntry = tab.entries[tab.index - 1];
        this.DataPersistentId = JSON.parse(tab.extData["extension:treestyletab@piro.sakura.ne.jp:data-persistent-id"]);
        this.Children =
            tab.extData["extension:treestyletab@piro.sakura.ne.jp:children"]
                ? JSON.parse(tab.extData["extension:treestyletab@piro.sakura.ne.jp:children"])
                : [];
        this.Ancestors =
            tab.extData["extension:treestyletab@piro.sakura.ne.jp:ancestors"]
                ? JSON.parse(tab.extData["extension:treestyletab@piro.sakura.ne.jp:ancestors"])
                : [];
        this.FavIcon =
            tab.extData["extension:treestyletab@piro.sakura.ne.jp:last-effective-favIcon"]
                ? JSON.parse(tab.extData["extension:treestyletab@piro.sakura.ne.jp:last-effective-favIcon"])
                : null;
    }

    get Root() { return this.Ancestors.length == 0; }
    get HasChild() { return this.Children.length !== 0; }
    get IsCompleted() { return this.Children.length == this.ChildrenTabs.length; }

    SetChild(childTab: Tab, index: number) {
        this.ChildrenTabs[index] = childTab;
    }
}
