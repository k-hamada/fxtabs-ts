export interface TabObject {
  entries: Entry[]
  extData: ExtData
  index: number
  image?: any
}

export interface Entry {
  url: string
  title: string
}

export interface ExtData {
  DataPersistentId: any
  Ancestors: any
  'extension:treestyletab@piro.sakura.ne.jp:data-persistent-id': string
  'extension:treestyletab@piro.sakura.ne.jp:ancestors': string
  'extension:treestyletab@piro.sakura.ne.jp:subtree-collapsed': string

  'extension:treestyletab@piro.sakura.ne.jp:children'?: string
  'extension:treestyletab@piro.sakura.ne.jp:isnert-after'?: string
  'extension:treestyletab@piro.sakura.ne.jp:insert-before'?: string
  'extension:treestyletab@piro.sakura.ne.jp:last-effective-favIcon'?: string
}
