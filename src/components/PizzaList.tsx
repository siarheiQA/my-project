import { useList } from 'effector-react'
import { editPizzaClicked } from 'models/adminka'
import { pizzaToCartAdded } from 'models/cart'
import { $pizzaList } from 'models/pizza'
import { DoughTypes, PizzaDiameters } from 'models/pizza'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { edit } from 'resources'

export default function PizzaCards() {
  return useList($pizzaList, (pizzaData) => {
    return (
      <PizzaCard
        id={pizzaData.id}
        previewURL={pizzaData.previewURL}
        description={pizzaData.description}
        title={pizzaData.title}
      />
    )
  })
}

interface PizzaCardProps {
  id: string
  previewURL: string
  description: string
  title: string
}

function PizzaCard({ id, previewURL, description, title }: PizzaCardProps) {
  const [dough, setDough] = useState<DoughTypes>(DoughTypes.TRADITIONAL)
  const [diameter, setDiameter] = useState<PizzaDiameters>(PizzaDiameters.SMALL)

  return (
    <div className="relative mx-3 my-3 p-2 w-min max-w-sm bg-white rounded-3xl shadow-md">
      <div className="relative rounded-2xl overflow-x-hidden">
        <img
          className="w-full h-40 rounded-2xl object-cover"
          src={previewURL}
          alt="pizza card"
        />
        <p
          onClick={() => pizzaToCartAdded(`${id}-${dough}-${diameter}`)}
          className="group absolute right-2 top-2 p-2 bg-white rounded-full cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 group-hover:opacity-50 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </p>
      </div>
      <div className="flex justify-between mb-4 mt-4 pl-2">
        <div className="text-buccaneer font-sans">
          <p className="mb-2 text-lg font-semibold">{title}</p>
          <p className="text-md mt-0 text-sm">{description}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <DoughPicker dough={dough} setDough={setDough} />
      </div>
      <div className="flex justify-center my-2">
        <DiameterPicker diameter={diameter} setDiameter={setDiameter} />
      </div>
      <div
        onClick={() => editPizzaClicked(id)}
        className="absolute right-2 top-36 w-6 h-6 opacity-0 hover:opacity-70 cursor-pointer"
      >
        <Link to="/adminka">
          <img src={edit} alt="edit pizza" />
        </Link>
      </div>
    </div>
  )
}

interface DoughPickerProps {
  dough: DoughTypes
  setDough: React.Dispatch<React.SetStateAction<DoughTypes>>
}

function DoughPicker({ dough, setDough }: DoughPickerProps) {
  const optionStyle = (d: DoughTypes) =>
    `bg-${dough === d ? 'gray-300' : 'white'} 
    text-${dough === d ? 'gray-900' : 'gray-800'}
    opacity-${dough === d ? '70' : '50'}
    cursor-pointer rounded-lg w-32 text-center 
    `

  return (
    <div className="flex justify-center border-gray-300 rounded-lg select-none">
      <div
        className={optionStyle(DoughTypes.TRADITIONAL)}
        onClick={() => setDough(DoughTypes.TRADITIONAL)}
      >
        Традиционное
      </div>
      <div
        className={optionStyle(DoughTypes.THIN)}
        onClick={() => setDough(DoughTypes.THIN)}
      >
        Тонкое
      </div>
    </div>
  )
}

interface DiameterPickerProps {
  diameter: PizzaDiameters
  setDiameter: React.Dispatch<React.SetStateAction<PizzaDiameters>>
}

function DiameterPicker({ diameter, setDiameter }: DiameterPickerProps) {
  const optionStyle = (d: PizzaDiameters) =>
    `bg-${diameter === d ? 'gray-300' : 'white'} 
    text-${diameter === d ? 'gray-900' : 'gray-800'}
    opacity-${diameter === d ? '70' : '50'}
    cursor-pointer rounded-lg w-20 text-center
    `

  return (
    <div className="flex justify-center border-gray-300 rounded-lg select-none space-x-2">
      <div
        className={optionStyle(PizzaDiameters.SMALL)}
        onClick={() => setDiameter(PizzaDiameters.SMALL)}
      >
        {PizzaDiameters.SMALL}
      </div>
      <div
        className={optionStyle(PizzaDiameters.MEDIUM)}
        onClick={() => setDiameter(PizzaDiameters.MEDIUM)}
      >
        {PizzaDiameters.MEDIUM}
      </div>
      <div
        className={optionStyle(PizzaDiameters.LARGE)}
        onClick={() => setDiameter(PizzaDiameters.LARGE)}
      >
        {PizzaDiameters.LARGE}
      </div>
    </div>
  )
}
