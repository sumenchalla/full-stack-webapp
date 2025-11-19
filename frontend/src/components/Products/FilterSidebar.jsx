import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
  const [searchParams,setSearchParams]=useSearchParams();
  const [filters,setFilters] = useState({
    category:"",
    gender:"",
    color:"",
    size:[],
    materials:[],
    brand:"",
    minPrice:0,
    maxPrice:100
  });
  const [priceRange,setPriceRange] = useState([0,100]);

  // this filters variables can also be fetched from DB but simplicity we are deifing them here
  
  return (
    <div>FilterSidebar</div>
  )
}

export default FilterSidebar