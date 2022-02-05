import { createEffect } from 'effector'
import { createGate } from 'effector-react'

export const AppGate = createGate()

export const traceErrorFx = createEffect((err: Error) => {
  console.log(err)
})
