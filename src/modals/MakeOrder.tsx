import { Dialog } from '@headlessui/react'
import { useStore } from 'effector-react'
import { onlyNumeric } from 'models/adminka/init'
import { $phoneNumber, $total, phoneNumberChanged } from 'models/cart'
import modal from 'models/modal'
import { ModalBody } from './Modals'

export default () => {
  const show = useStore(modal.$active) === 'MakeOrder'
  const phoneNumber = useStore($phoneNumber)
  const total = useStore($total)

  return (
    <ModalBody show={show}>
      <Dialog.Title
        as="h3"
        className="text-gray-900 text-lg font-medium leading-6"
      >
        {`Заказ на сумму: ${total}₽`}
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-gray-500 text-sm">
          Пожалуйста, укажите ваш контактный номер телефона. С вами свяжется
          оператор для выяснения деталей заказа.
        </p>
      </div>

      <div className="flex flex-col mt-4">
        <label className="leading-loose">Контактный номер</label>
        <input
          value={phoneNumber}
          onChange={(e) => phoneNumberChanged(onlyNumeric(e.target.value))}
          type="text"
          className="px-4 py-2 w-full text-gray-600 border border-gray-300 focus:border-gray-900 rounded-md focus:outline-none focus:ring-gray-500 sm:text-sm"
          placeholder="Введите ваш контактный номер"
        />
      </div>

      <div className="flex items-center pt-4 space-x-4">
        <div
          className="flex items-center justify-center px-4 py-3 w-full text-gray-900 rounded-md focus:outline-none cursor-pointer"
          onClick={() => modal.close()}
        >
          <svg
            className="mr-3 w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          Передумал
        </div>

        <button
          onClick={() => modal.open('SuccessfulOrder')}
          className={`opacity-${
            !!phoneNumber ? '100' : '0'
          } flex items-center justify-center px-4 py-3 w-full text-white bg-blue-500 rounded-md focus:outline-none`}
        >
          Заказать
        </button>
      </div>
    </ModalBody>
  )
}
