import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonials from '../components/Testimonials'
import NewsLetter from '../components/NewsLetter'
import RecommendedHotels from '../components/RecommendedHotels'

const Home = () => {
  return (
    <>
      <Hero/>
      <RecommendedHotels/>
      <FeaturedDestination/>
      <ExclusiveOffers/>
      <Testimonials/>
      <NewsLetter/>
    </>
  )
}

export default Home
