import axios from 'axios'
import { attach, combine, createEvent, createStore, restore } from 'effector'
import { PizzaItem } from 'models/pizza'
import { v4 as uuidv4 } from 'uuid'

// Edit Pizza card
export const updateClicked = createEvent()
export const editPizzaClicked = createEvent<string>()
export const $pizzaToEdit = createStore<PizzaItem | null>(null)

// Adminka Buttons
export const cancelClicked = createEvent()
export const addClicked = createEvent()

// Triggers to change Pizza Fields
export const titleChandged = createEvent<string>('')
export const descriptionChandged = createEvent<string>('')
export const previewURLChandged = createEvent<string>('')
export const price30Chandged = createEvent<string>('')
export const price35Chandged = createEvent<string>('')
export const price40Chandged = createEvent<string>('')

// Pizza Field Stores
export const $title = restore(titleChandged, '')
export const $description = restore(descriptionChandged, '')
export const $previewURL = restore(previewURLChandged, '')
export const $price30 = restore(price30Chandged, '')
export const $price35 = restore(price35Chandged, '')
export const $price40 = restore(price40Chandged, '')

// Create-Edit Pizza Form to Submit
export const $form = combine(
  $title,
  $description,
  $previewURL,
  $price30,
  $price35,
  $price40
)

export const createPizzaFx = attach({
  source: $form,
  async effect([title, description, previewURL, price30, price35, price40]) {
    // Check for Nullish Data
    if (!(title && description && previewURL && price30 && price35 && price40))
      throw new Error('provide data to create pizza')

    // Post Request
    const { status } = await axios.post('http://localhost:3033/pizzas', {
      id: uuidv4().replace(/-/g, ''),
      previewURL,
      description,
      title,
      prices: { '30': +price30, '35': +price35, '40': +price40 },
    })

    // Check for Successful Post Request
    if (status !== 201) throw new Error(`Server error; status code: ${status}`)

    return
  },
})

export const updatePizzaFx = attach({
  source: [$form, $pizzaToEdit.map((pizza) => pizza?.id ?? '')],
  async effect([
    [title, description, previewURL, price30, price35, price40],
    id,
  ]) {
    // Check for Nullish Data
    if (
      !(
        title &&
        description &&
        previewURL &&
        price30 &&
        price35 &&
        price40 &&
        id
      )
    )
      throw new Error('provide data to update pizza')

    // Put Request
    const { status } = await axios.put(`http://localhost:3033/pizzas/${id}`, {
      id,
      previewURL,
      description,
      title,
      prices: { '30': +price30, '35': +price35, '40': +price40 },
    })

    // Check for Successful Put Request
    if (status !== 200) throw new Error(`Server error; status code: ${status}`)

    return
  },
})
