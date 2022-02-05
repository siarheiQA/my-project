import { createEvent, restore } from 'effector'
type ModalScreen = 'SuccessfulOrder' | 'MakeOrder'

const close = createEvent<void>()
const open = createEvent<ModalScreen>()
const $active = restore(open, null)

export default {
  $active,
  close,
  open,
}
