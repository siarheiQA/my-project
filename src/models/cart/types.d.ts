import { DoughTypes, PizzaDiameters } from 'models/pizza'

export type CartItemType = {
  complexId: string
  id: string
  title: string
  previewURL: string
  count: number
  price: number
  dough: DoughTypes
  diameter: PizzaDiameters
}
