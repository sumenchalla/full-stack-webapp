import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'

const SearchBar = () => {
    const [searchTerm, setSearchTerm]=useState("")
    const [isOpen, setIsOpen]=useState(false)

    const handleSearchToggler = ()=>{
        setIsOpen(!isOpen)
    }
    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Search Term"  , searchTerm);
        setIsOpen(false);
    }
  return (
    /* for dynamic styling we have to use `` instead of '' */
    <div className={`flex items-center justify-center w-full transition-all duration-300
     ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50":"w-full"}`}>
        {/* This will enable use to display form when is isOpen is true otherwise a serach button, we set the 
        default state of this to false and when we click on that button it's state will change */}
        {isOpen ? (
            <form
            onSubmit={handleSearch}
             className='relative flex items-center justify-center w-full'>
                <div className="relative w-1/2">
                <input type="text" placeholder='Search'
                value={searchTerm}
                onChange={(e)=>{setSearchTerm(e.target.value)}}
                className='bg-gray-100 px-4 py-2 pl-1 pr-12 rounded-lg focus:outline-none w-full
                placeholder:text-gray-700' />

                {/*Search button*/}
                <button type='submit' className='absolute right-2 top-2 transform -translate-y-0.5
                text-gray-600 hover:text-gray-800'>
                    <HiMagnifyingGlass className='h-6 w-6'/>
                </button>
                </div>

                {/* close button */}
                <button onClick={handleSearchToggler} type="button" className='absolute right-4 top-0.5 transform -translate-y-0.5
                 text-gray-600 hover:text-gray-800'>
                    <HiMiniXMark className='h-6 w-6'/>
                </button>
            </form>) : (
            <button onClick={handleSearchToggler}>
            <HiMagnifyingGlass className='h-6 w-6'/>
        </button>)}
    </div>
  )
}

export default SearchBar