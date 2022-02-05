import { sample } from 'effector'
import { AppGate } from 'models/app'
import { $pizzaList, getAllPizzasFx } from '.'

// Fetch all Pizzas on the First App Render
sample({
  source: AppGate.open,
  target: getAllPizzasFx,
})

// Store Pizzas from getAllPizzasFx
sample({
  source: getAllPizzasFx.doneData,
  target: $pizzaList,
})
