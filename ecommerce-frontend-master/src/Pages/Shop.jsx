import React from 'react'
import Hero from '../Components/Hero/Hero.jsx';
import Popular from '../Components/Popular/Popular.jsx';
import Offers from '../Components/Offers/Offers.jsx';
import NewCollections from '../Components/NewCollections/NewCollections.jsx';
import NewLetter from '../Components/NewLetter/NewLetter.jsx';
const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      {/* <Offers/> */}
      <NewCollections/>
      <NewLetter/>
    </div>
  )
}

export default Shop;