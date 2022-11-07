import { LineItem } from '@calculator/common/model/line-item'
import { useLocalStorage } from '@vueuse/core'

export const itemSettings = useLocalStorage<LineItem[]>('line-item-settings', [])