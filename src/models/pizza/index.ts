import { createStore } from 'effector'

export const $pizzaList = createStore([
  {
    id: 'uuid-1',
    previewUrl:
      'https://cdn.papajohns.ru//images/catalog/thumbs/full/c6cdcdbbdf8589cbdba96ce9c042fe79.webp',
    description:
      '"The Bee Sting" пицца с пепперони, цветочным медом, острым халапеньо, сыром Моцарелла и фирменным томатным соусом',
    title: 'Пепперони с медом и халапеньо',
  },
  {
    id: 'uuid-2',
    previewUrl:
      'https://cdn.papajohns.ru//images/catalog/thumbs/full/7df3a3bd82bb148e357958ec7cbf0117.webp',
    description:
      'Ура! Она снова вернулась! Ароматные мандарины, нежная куриная грудка с голубым сыром, моцарелла и смесь итальянских сыров',
    title: 'Новогодняя с мандаринами ',
  },
  {
    id: 'uuid-3',
    previewUrl:
      'https://cdn.papajohns.ru//images/catalog/thumbs/full/ca714c7793694fe6d2c59f1b425a4450.webp',
    description:
      'Соус 1000 островов, ароматная ветчина, хрустящий бекон, зеленый перец, шампиньоны, сыр Моцарелла и смесь итальянских трав',
    title: 'Ветчина и бекон',
  },
  {
    id: 'uuid-4',
    previewUrl:
      'https://cdn.papajohns.ru//images/catalog/thumbs/full/1711094649c738772c1859345c1e50b1.webp',
    description:
      'Мясная пицца с пикантной пепперони, альпийскими колбасками, Моцареллой, луком и соусом Барбекю',
    title: 'Мясное барбекю ',
  },
])