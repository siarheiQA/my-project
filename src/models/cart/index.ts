import { createEvent, createStore, restore } from 'effector'
import { chain, get, toNumber } from 'lodash'
import { $pizzaList, DoughTypes, PizzaDiameters } from 'models/pizza'
import { CartItemType } from './types'

// Events-triggers
export const pizzaToCartAdded = createEvent<string>()
export const cartCleared = createEvent()
export const cartItemDeleted = createEvent<string>()
export const cartItemDecreased = createEvent<string>()
export const cartItemIncreased = createEvent<string>()
export const setTotal = createEvent<number>()

// Store
export const $cart = createStore<string[]>([]).reset(cartCleared)
export const $transformedCart = $cart.map((cart) => {
  const cartObj = chain(cart).countBy().value() // {id: count}
  const cartContentIds = Object.keys(cartObj) // unique ids = Set of ids

  const resultArr: CartItemType[] = []
  cartContentIds.forEach((complexId) => {
    const count = get(cartObj, complexId)
    const result = complexId.match(/(\w+)-(\w+)-(\d+)/) // id-dough-diameter

    const id = result?.[1]
    const dough = result?.[2] as DoughTypes
    const diameter = toNumber(result?.[3] ?? '30') as PizzaDiameters

    $pizzaList.map((pizzaList) => {
      const pizzaItem = chain(pizzaList).find({ id }).value()
      const price = pizzaItem.prices[diameter]

      return resultArr.push({
        ...pizzaItem,
        count,
        price,
        dough,
        diameter,
        complexId,
      })
    })
  })

  return resultArr
})

export const $total = $cart.map((cart) => {
  let total: number = 0

  cart.forEach((complexId) => {
    const result = complexId.match(/(\w+)-(\w+)-(\d+)/) // id-dough-diameter

    const id = result?.[1]
    const diameter = toNumber(result?.[3] ?? '30') as PizzaDiameters

    $pizzaList.map((pizzaList) => {
      const pizzaItem = chain(pizzaList).find({ id }).value()
      const price = pizzaItem.prices[diameter]

      total = total + price
      return null
    })
  })

  return total
})

// Order
export const phoneNumberChanged = createEvent<string>()
export const $phoneNumber = restore(phoneNumberChanged, '')
