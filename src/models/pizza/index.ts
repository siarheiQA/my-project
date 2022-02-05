import axios from 'axios'
import { createEffect, createStore } from 'effector'

export enum DoughTypesRu {
  TRADITIONAL = 'Традиционное',
  THIN = 'Тонкое',
}

export enum PizzaDiameters {
  SMALL = 30,
  MEDIUM = 35,
  LARGE = 40,
}

export enum DoughTypes {
  TRADITIONAL = 'TRADITIONAL',
  THIN = 'THIN',
}

export type PizzaItem = {
  id: string
  previewURL: string
  description: string
  title: string
  prices: {
    30: number
    35: number
    40: number
  }
}

export const $pizzaList = createStore<PizzaItem[]>([])
export const getAllPizzasFx = createEffect(async () => {
  const res = await axios('http://localhost:3033/pizzas')

  return res?.data ?? []
})
