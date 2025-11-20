import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'


const FilterSidebar = () => {


  const [searchParams,setSearchParams]=useSearchParams();
  //x.com/a=1&b=2 to get this values we use useSearchParams hook

  const navigate =useNavigate();//this hook forms the link based on all filters

  const [filters,setFilters] = useState({
    category:"",
    gender:"",
    color:"",
    size:[],
    material:[],
    brand:"",
    minPrice:0,
    maxPrice:100
  });
  const [priceRange,setPriceRange] = useState([0,100]);

  // this filters variables can also be fetched from DB but simplicity we are deifing them here
  const categories = ["Top Wear","Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    'Gray',
    "White",
    "Pink",
    "Beige",
    "Navy"
  ];

  const sizes = ["XS","S","M","L","XL","XXL"];
  const materials = [
    "Cotton",
    "Whool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece"
  ];
  
  const brands = [
    "Urban Threads",
    "Modern FIt",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle"
  ];

  const genders = ["Men","Women"];
    useEffect(()=>{
      const params = Object.fromEntries([...searchParams]); 
      // This will get the values from url and saves as json 

      // now we will set the filters from the above json key value pairs

      setFilters({
        category : params.category || "",
        gender : params.gender || "",
        color : params.color || "",
        size : params.size ? params.size.split(","):[],
        material : params.material ? params.material.split(","):[],
        brand : params.brand ? params.brand.split(","):[],
        minPrice : params.minPrice || 0 ,
        maxPrice : params.maxPrice || 100

      });
      setPriceRange([0,params.maxPrice||100])
    },[searchParams]);

    // Function to update  filter parameters to user inputs
    const handleFillterChnage = (e)=>{
      const {name, value,checked,type} = e.target;
      
      let newFilters = {...filters};
      if (type==='checkbox'){
        if(checked){
          newFilters[name]=[...(newFilters[name] || []),value]; // it will just append all the selected filters in checkbox
        }
        else{
          //if it is unchecked we have to remove from the array
          newFilters[name]=newFilters[name].filter((item)=> item!==value);
        }
      }
      else{
        // other than checkbox just save filter and corsponding value into newFilter
        newFilters[name]=value;
      }
      // Now set the filters to newFilters
      setFilters(newFilters);
      console.log(newFilters);

      // call the url creater function based on newFilters
      updateURLParams(newFilters);
    }

    // Function to set the URL parameters
    const updateURLParams = (newFilters)=>{
      const params = new URLSearchParams(); // this will make the variable into proper query string which looks like in URL

      // Now our filters are in this format {category:"Top Wear",size:["s","M"]}
      // we have to append all this to our parama variable, to do this we will iterate through entire params object

      Object.keys(newFilters).forEach((key)=>{
        // if the value of key is array we have to add all the elements to same query param itself
        if(Array.isArray(newFilters[key]) && newFilters[key].length>0){
          params.append(key,newFilters[key].join(","));
        }
        else if (newFilters[key]){
          params.append(key,newFilters[key]);
        }
      });

      // Now setting the searchparams to params
      setSearchParams(params);
      navigate(`?${params.toString()}`);      
    }

    const handlePriceChange = (e)=>{
      const newPrice = e.target.value;
      setPriceRange([0,newPrice]);
      const newFiltres = {...filters,minPrice:0,maxPrice:newPrice};
      setFilters(newFiltres);
      updateURLParams(newFiltres);
    }
  return (

    <div className='p-4'>
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category filter */}
      <div className="mb-6">
        <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Categories</label>
        {categories.map((category)=>(
          <div key={category} className='flex items-center mb-1'>
              <input type="radio" name="category" value={category} onChange={handleFillterChnage} 
              className='mr-2 h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-300'
              checked={filters.category===category}/>
              <span className='text-gray-700'>{category}</span>
          </div>
        ))}        
      </div>

      {/* Gender filter */}
      <div className="mb-6">
        <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Genders</label>
        {genders.map((gender)=>(
          <div key={gender} className='flex items-center mb-1'>
              <input type="radio" name="gender" 
              className='mr-2 h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-300'
              value={gender}
              onChange={handleFillterChnage}
              checked={filters.gender===gender}/>
              <span className='text-gray-700'>{gender}</span>
          </div>
        ))}        
      </div>


      {/* Colors filter */}
      <div className="mb-6">
        <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color)=>(
            <button key={color} name='color' 
            className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color===color?"ring-2 ring-blue-500":""}`}
            style={{backgroundColor: color.toLocaleLowerCase()}}
            value={color}
            onClick={handleFillterChnage}
            >
            </button>
          ))}
        </div>
      </div>


      {/* Size filter */}
      <div className="mb-6">
        <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Size</label>
        {sizes.map((size)=>(
          <div key={size} className="flex items-center mb-1">
            <input type="checkbox" name="size" 
            className='mr-2 h-4 w-4 text-blue-50 focus:ring-blue-400 border-gray-300' 
            value={size}
            onChange={handleFillterChnage}
            id="" 
            checked={filters.size.includes(size)}/>
            <span className='text-gray-700'>{size}</span>
          </div>
        ))}
      </div>
      {/* Material filter */}
      <div className="mb-6">
        <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Material</label>
        {materials.map((material)=>(
          <div key={material} className="flex items-center mb-1">
            <input type="checkbox" name="material" 
            className='mr-2 h-4 w-4 text-blue-50 focus:ring-blue-400 border-gray-300' 
            id="" 
            value={material}
            onChange={handleFillterChnage}
            checked={filters.material.includes(material)}/>
            <span className='text-gray-700'>{material}</span>
          </div>
        ))}
      </div>
      {/* brand filter */}
      <div className="mb-6">
        <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Brand</label>
        {brands.map((brand)=>(
          <div key={brand} className="flex items-center mb-1">
            <input type="checkbox" name="brand" 
            className='mr-2 h-4 w-4 text-blue-50 focus:ring-blue-400 border-gray-300' 
            id="" 
            value={brand}
            onChange={handleFillterChnage}
            checked={filters.brand.includes(brand)}/>
            <span className='text-gray-700'>{brand}</span>
          </div>
        ))}
      </div>
        {/* Price range filter */}
        <div className='mb-8'>
          <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Price Range</label>
          <input type="range" name='price range' min={0} max={100}
          className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'
          value={priceRange[1]}
          onChange={handlePriceChange}/>
          <div className='flex justify-between text-gray-600'>
            <span>$0</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

    </div>
  )
}

export default FilterSidebar