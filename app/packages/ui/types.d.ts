declare global {
  interface TableHeader<T> {
    text: string
    value: string
    sortable?: boolean
    sort?: (a: T, b: T) => number
    cellClass?: string
    bodyCellClass?: string
  }
}

export {}
