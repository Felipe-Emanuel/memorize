import { TBookPerformanceProperty } from '@shared/types'
import { ElementType } from 'react'

export type TTab = {
  id: number
  icon: ElementType
  label: string
  amount: string | number
  value: TBookPerformanceProperty
}
