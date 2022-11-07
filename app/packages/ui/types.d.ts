declare global {
  interface TableHeader<T> {
    text: string
    value: string
    sortable?: boolean
    sort?: (a: T, b: T) => number
    cellClass?: string
    bodyCellClass?: string
  }

  interface ComboboxItem {
    text: string | number | object
    value: string | number | object
    disabled: boolean
    divider: boolean
    header: string
  }
}

export {}
