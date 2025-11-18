import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollection from '../components/Products/GenderCollection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollections from '../components/Products/FeaturedCollections'

const placeholderProducts=[
  {
        _id : 1,
        name: "Product 1",
        price : 100,
        images : [
            {url:"https://picsum.photos/500/500?random=8",altText:"product 1",},
        ]
    },
    {
        _id : 2,
        name: "Product 2",
        price : 100,
        images : [
            {url:"https://picsum.photos/500/500?random=9",altText:"product 2",
},
        ]
    },
    {
        _id : 3,
        name: "Product 3",
        price : 100,
        
        images : [
            {url:"https://picsum.photos/500/500?random=10",altText:"product 3",},
        ]
    },
    {
        _id : 4,
        name: "Product 4",
        price : 100,
        
        images : [
            {url:"https://picsum.photos/500/500?random=11",altText:"product 4",},
        ]
    },
    {
        _id : 5,
        name: "Product 5",
        price : 100,
        images : [
            {url:"https://picsum.photos/500/500?random=8",altText:"product 5",},
        ]
    },
    {
        _id : 6,
        name: "Product 6",
        price : 100,
        images : [
            {url:"https://picsum.photos/500/500?random=9",altText:"product 6",
},
        ]
    },
    {
        _id : 7,
        name: "Product 7",
        price : 100,
        
        images : [
            {url:"https://picsum.photos/500/500?random=10",altText:"product 7",},
        ]
    },
    {
        _id : 8,
        name: "Product 8",
        price : 100,
        
        images : [
            {url:"https://picsum.photos/500/500?random=11",altText:"product 8",},
        ]
    },
]

const Home = () => {
  return (
    <div>
        <Hero/>
        <GenderCollection/>
        <NewArrivals />
        {/* Best seller component */}
        <h2 className="text-3xl text-center font-bold mb-4">Best Sellers</h2>
        <ProductDetails/>

        {/* Top women wear */}
        <div className="container mx-auto">
          <h2 className="text-3xl text-center font-bold mb-">Top Wear For Women</h2>
          <ProductGrid products={placeholderProducts}/>
        </div>

      {/* Featured products */}
      <FeaturedCollections/>
    </div>
  )
}

export default Home