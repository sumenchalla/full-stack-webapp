import React from 'react'

const SortOptions = () => {
  return (
    <div className='mb-4 flex items-center justify-end'>
      <select name="" id="sort" className='border p-2 rounded-md focus:outline-none'>
        <option value="">Default</option>
        <option value="priceAsc">Price : Low to High</option>
        <option value="priceDesc">Price : High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  )
}

export default SortOptions