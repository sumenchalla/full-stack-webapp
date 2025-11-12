import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollection from './GenderCollection'
import NewArrivals from './NewArrivals'

const Home = () => {
  return (
    <div>
        <Hero/>
        <GenderCollection/>
        <NewArrivals />
    </div>
  )
}

export default Home