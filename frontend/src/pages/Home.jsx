import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollection from '../components/Products/GenderCollection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollections from '../components/Products/FeaturedCollections'
import FeaturesSection from '../components/Products/FeaturesSection'
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios'
import { fetchProductsByFilters } from '../redux/slices/productSlice'


const Home = () => {
    const dispatch = useDispatch();
    const {products,loading, error} = useSelector((state)=> state.products);
    const [bestSellerProducts,setBestSellerProducts] = useState(null);

    useEffect(()=>{
        // Fetch products for a specific collection
        dispatch(fetchProductsByFilters({
            gender : "Women",
            category : "Bottom Wear",
            limit : 8
        }));

        // Fetch the best seller product
        const fetchBestSeller = async()=>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
                setBestSellerProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBestSeller();
    },[dispatch]);
  return (
    <div>
        <Hero/>
        <GenderCollection/>
        <NewArrivals />
        {/* Best seller component */}
        <h2 className="text-3xl text-center font-bold mb-4">Best Sellers</h2>
        {bestSellerProducts ? (<ProductDetails productId = {bestSellerProducts._id}/>): 
        (<p className='text-center'>Loading best seller product...</p>)}

        {/* Top women wear */}
        <div className="container mx-auto">
          <h2 className="text-3xl text-center font-bold mb-">Top Wear For Women</h2>
          <ProductGrid products={products} loading={loading} error={error}/>
        </div>

      {/* Featured products */}
      <FeaturedCollections/>

      <FeaturesSection/>
    </div>
  )
}

export default Home