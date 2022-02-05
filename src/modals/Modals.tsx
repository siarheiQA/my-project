import { Dialog, Transition } from '@headlessui/react'
import { useStore } from 'effector-react'
import modal from 'models/modal'
import { Fragment } from 'react'
import { MakeOrder, OrderSuccessful } from '.'

export default () => {
  const activeModal = useStore(modal.$active)
  let modalContent: JSX.Element | null = null

  switch (activeModal) {
    case 'SuccessfulOrder':
      modalContent = <OrderSuccessful />
      break
    case 'MakeOrder':
      modalContent = <MakeOrder />
      break
  }

  return <>{modalContent}</>
}

interface ModalBodyProps {
  children: React.ReactNode
  show: boolean
}
export function ModalBody({ children, show }: ModalBodyProps) {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => modal.close()}
      >
        <div className="px-4 min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <span
            className="inline-block align-middle h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block align-middle my-8 p-6 w-full max-w-md text-left bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
