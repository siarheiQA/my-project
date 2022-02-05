import { Dialog } from '@headlessui/react'
import { useStore } from 'effector-react'
import modal from 'models/modal'
import { ModalBody } from './Modals'

export default () => {
  const show = useStore(modal.$active) === 'SuccessfulOrder'

  return (
    <ModalBody show={show}>
      <Dialog.Title
        as="h3"
        className="text-gray-900 text-lg font-medium leading-6"
      >
        Ваш заказ создан!
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-gray-500 text-sm">
          Пожалуйста, ожидайте звонка от оператора.
        </p>
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-blue-900 text-sm font-medium bg-blue-100 hover:bg-blue-200 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => modal.close()}
        >
          OK
        </button>
      </div>
    </ModalBody>
  )
}
