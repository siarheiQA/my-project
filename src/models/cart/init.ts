import { sample } from 'effector'
import { findIndex, remove } from 'lodash'
import {
  $cart,
  cartItemDecreased,
  cartItemDeleted,
  cartItemIncreased,
  pizzaToCartAdded,
} from '.'

// Add product to card
sample({
  clock: [pizzaToCartAdded, cartItemIncreased],
  source: $cart,
  fn: (cart, id) => [...cart, id],
  target: $cart,
})

// Delete product from cart
sample({
  clock: cartItemDeleted,
  source: $cart,
  fn: (cart, id) => remove(cart, (cartItemId) => cartItemId !== id),
  target: $cart,
})

// Decrease item count from cart
sample({
  clock: cartItemDecreased,
  source: $cart,
  fn: (cart, id) =>
    remove(cart, (_, i) => findIndex(cart, (itemId) => itemId === id) !== i), // bug with sorting
  target: $cart,
})
