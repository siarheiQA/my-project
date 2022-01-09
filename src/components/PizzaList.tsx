import { useList } from 'effector-react'
import { $pizzaList } from 'models/pizza'

export default function PizzaCards() {
  return useList($pizzaList, (pizzaData) => {
    return (
      <PizzaCard
        id={pizzaData.id}
        previewUrl={pizzaData.previewUrl}
        description={pizzaData.description}
        title={pizzaData.title}
      />
    )
  })
}

interface PizzaCardProps {
  id: string
  previewUrl: string
  description: string
  title: string
}

function PizzaCard({ previewUrl, description, title }: PizzaCardProps) {
  return (
    <div className="min-w-[340px] relative mx-1 my-3 p-2 max-w-sm bg-white rounded-3xl shadow-md cursor-pointer">
      <div className="relative rounded-2xl overflow-x-hidden">
        <img
          className="w-full h-40 rounded-2xl object-cover"
          src={previewUrl}
          alt="pizza card"
        />
        <p className="group absolute right-2 top-2 p-2 bg-white rounded-full cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 group-hover:opacity-50 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </p>
      </div>
      <div className="flex justify-between mb-2 mt-4 pl-2">
        <div>
          <p className="mb-0 text-gray-900 text-lg font-semibold">{title}</p>
          <p className="text-md mt-0 text-gray-800">{description}</p>
        </div>
        <div className="group flex flex-col-reverse mb-1 mr-4 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 group-hover:opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="gray"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}