import { useList, useStore } from 'effector-react'
import {
  $cart,
  $total,
  $transformedCart,
  cartCleared,
  cartItemDecreased,
  cartItemDeleted,
  cartItemIncreased,
} from 'models/cart'
import { CartItemType } from 'models/cart/types'
import modal from 'models/modal'
import { DoughTypesRu } from 'models/pizza'

export default function Cart() {
  const count = useStore($cart.map((cart) => cart.length))
  return (
    <div className="fixed right-10 top-32 mx-1 my-3 pb-8 pt-2 max-w-xs bg-white rounded-2xl shadow-md">
      <div className="flex content-center justify-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.2 23.2c-1.32 0-2.4 1.08-2.4 2.4 0 1.32 1.08 2.4 2.4 2.4 1.32 0 2.4-1.08 2.4-2.4 0-1.32-1.08-2.4-2.4-2.4zM4 4v2.4h2.4l4.32 9.12-1.68 2.88c-.12.36-.24.84-.24 1.2 0 1.32 1.08 2.4 2.4 2.4h14.4v-2.4H11.68c-.12 0-.24-.12-.24-.24v-.12l1.08-2.04h8.88c.96 0 1.68-.48 2.04-1.2l4.32-7.8c.24-.24.24-.36.24-.6 0-.72-.48-1.2-1.2-1.2H9.04L7.96 4H4zm19.2 19.2c-1.32 0-2.4 1.08-2.4 2.4 0 1.32 1.08 2.4 2.4 2.4 1.32 0 2.4-1.08 2.4-2.4 0-1.32-1.08-2.4-2.4-2.4z"
            fill="#c21313"
            fill-rule="nonzero"
          ></path>
        </svg>
      </div>
      <div className="flex justify-between m-4 space-x-2">
        <div className="text-yellow-900 font-sans font-semibold">
          <span className="mr-1">Корзина</span>
          <span className="text-thatch font-normal">{`(${count})`}</span>
        </div>
        <button className="text-ocean text-xs" onClick={() => cartCleared()}>
          Очистить
        </button>
      </div>
      {!count && <EmptyCart />}
      <CartContentList />
      <Total />
      <Checkout />
    </div>
  )
}

function EmptyCart() {
  return (
    <div className="mx-16 text-center">
      <img
        className="mx-auto"
        width={146}
        src="https://papajohns.ru/assets/empty@2x.bb9cc7f4.jpg"
        alt="empty cart"
      />
      <p className="text-thatch text-sm">
        Корзина пуста. Выберите пиццу из меню или повторите предыдущий заказ
      </p>
    </div>
  )
}

function Checkout() {
  const isTotal = useStore($total.map((total) => !!total))
  if (!isTotal) return null

  return (
    <div className="flex content-center justify-center mt-4">
      <button
        className="p-2 bg-green-600 rounded-full"
        onClick={() => modal.open('MakeOrder')}
      >
        <p className="text-sans text-white font-semibold">Оформить</p>
      </button>
    </div>
  )
}

function Total() {
  const total = useStore($total)

  return (
    <div
      className={`${
        !!total ? 'flex' : 'hidden'
      }  justify-between mx-4 text-yellow-900 font-sans font-bold  pt-2`}
    >
      <div>Сумма заказа:</div>
      <div>{total}₽</div>
    </div>
  )
}

function CartContentList() {
  return useList(
    $transformedCart,
    ({ id, complexId, title, count, price, previewURL, dough, diameter }) => {
      return (
        <CartItem
          complexId={complexId}
          id={id}
          previewURL={previewURL}
          title={title}
          count={count}
          price={price}
          dough={dough}
          diameter={diameter}
        />
      )
    }
  )
}

function CartItem({
  complexId,
  title,
  dough,
  diameter,
  previewURL,
  count,
  price,
}: CartItemType) {
  return (
    <div className="mb-4 mx-4 border-b">
      <div className="row flex justify-between space-x-2">
        <img
          className="w-16 object-contain"
          src={previewURL}
          alt="cart item preview"
        />
        <p className="w-full text-yellow-900">
          <p className="text-sm font-bold">{title}</p>
          <p className="text-xs">{`${DoughTypesRu[dough]} тесто, ${diameter} см`}</p>
        </p>
        <button className="flex" onClick={() => cartItemDeleted(complexId)}>
          <svg
            className="w-3 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 14 14"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95 1.414 1.414L8.414 7z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="row flex">
        <div className="row flex my-4 space-x-4">
          <button
            className="w-6 h-6 text-center text-white bg-green-600 rounded-full"
            onClick={() => cartItemDecreased(complexId)}
          >
            -
          </button>
          <p className="text-yellow-900 font-semibold opacity-70">{count}</p>
          <button
            className="w-6 h-6 text-white bg-green-600 rounded-full"
            onClick={() => cartItemIncreased(complexId)}
          >
            +
          </button>
        </div>
        <div className="self-center ml-auto">
          <p className="text-yellow-900 font-sans font-semibold">{price}₽</p>
        </div>
      </div>
    </div>
  )
}
