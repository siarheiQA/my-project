import { Cart, PizzaList } from 'components'
import { useGate } from 'effector-react'
import Modals from 'modals/Modals'
import { AppGate } from 'models/app'
import { Link } from 'react-router-dom'

const TITLE_STYLE = 'flex justify-center mx-auto w-full'

export default () => {
  useGate(AppGate)

  return (
    <>
      <Link className={TITLE_STYLE} to="/adminka">
        <img
          className="w-14 h-14"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeaOB8rsBDV-P--u-ykDCOmyS3FRceSVhJGQ&usqp=CAU"
          alt="adminka"
        />
      </Link>
      <div className={`${TITLE_STYLE} text-2xl text-buccaneer font-bold mb-4`}>
        Pizza App
      </div>
      <div className="w-fit grid gap-2 place-content-center ml-60 max-w-max md:grid-cols-2 lg:grid-cols-4">
        <PizzaList />
      </div>
      <Cart />
      <Modals />
    </>
  )
}
