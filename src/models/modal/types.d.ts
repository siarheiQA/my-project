export type ModalScreen = {
  SuccessfulOrder
  MakeOrder
}

export type ModalType = keyof ModalScreen
export type ActiveModal<T extends ModalType> = {
  type: T
  payload?: ModalScreen[T]
}
