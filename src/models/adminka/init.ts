import { sample } from 'effector'
import { chain } from 'lodash'
import { traceErrorFx } from 'models/app'
import { $pizzaList } from 'models/pizza'
import {
  $description,
  $pizzaToEdit,
  $previewURL,
  $price30,
  $price35,
  $price40,
  $title,
  addClicked,
  cancelClicked,
  createPizzaFx,
  descriptionChandged,
  editPizzaClicked,
  previewURLChandged,
  price30Chandged,
  price35Chandged,
  price40Chandged,
  titleChandged,
  updateClicked,
  updatePizzaFx,
} from '.'

// Create Pizza Card
sample({
  source: addClicked,
  target: createPizzaFx,
})

// Input Fields Zeroing
sample({
  clock: [cancelClicked, createPizzaFx.done, updatePizzaFx.done],
  fn: () => '',
  target: [$title, $description, $previewURL, $price30, $price35, $price40],
})

// Console Log Fail Data from Effect
sample({
  source: createPizzaFx.failData,
  target: traceErrorFx, // todo pop-up with error
})

// Edit pizza
sample({
  clock: editPizzaClicked,
  source: $pizzaList,
  fn: (pizzaList, id) => chain(pizzaList).find({ id }).value(),
  target: $pizzaToEdit,
})

// Fill inputs
sample({
  clock: $pizzaToEdit,
  fn: (pizza) => {
    if (!pizza) return null
    const { title, description, previewURL, prices } = pizza

    titleChandged(title)
    descriptionChandged(description)
    previewURLChandged(previewURL)
    price30Chandged(`${prices[30]}`)
    price35Chandged(`${prices[35]}`)
    price40Chandged(`${prices[40]}`)
  },
})

sample({
  source: updateClicked,
  target: updatePizzaFx,
})

$pizzaToEdit.reset(updatePizzaFx.done)

export const onlyNumeric = (str: string) =>
  str.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1')
