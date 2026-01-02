import axios from 'axios'
import  { useEffect, useRef, useState } from 'react'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const NewArrivals = () => {
  //  New stuff useRef method in react
  const scrollRef = useRef(null)


  const [isDragging,setisDragging] = useState(false);
  const [startX,setstartX] = useState(0);
  const [scrollLeft,setscrollLeft] = useState(false);
  const [canScrollRight,setCanScrollRight] = useState(true);
  const [canScrollLeft,setCanScrollLeft] = useState(false);
  const [newArrivals , setNewArrivals] = useState([]);

// function to fetch new arrivals
useEffect(()=>{
  const fetchNewArrivals = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
      setNewArrivals(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchNewArrivals();
},[]);

  // function to handle mouse down
  const handleMouseDown = (e)=>{
    setisDragging(true);
    setstartX(e.pageX -  scrollRef.current.offsetLeft);
    setscrollLeft(scrollRef.current.leftScroll);
  }
  const handleMouseMove = (e)=>{
    if (!isDragging) return;
    const x  = e.pageX - scrollRef.current.scrollLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }

  const handleMouseUpOrLeave = () =>{
    setisDragging(false)
  }

//  Function for update scroll button
  const updateScrollButtons = ()=>{
    // geting the detials of the content of scroll as we set the ref = scrollRef
    const container = scrollRef.current;

    if (container){
      // it we give the distance in px the container was moved away from left end
      const leftScroll = container.scrollLeft;
      // we are checking here weather the distance that we scrolled till now + width of current box is greater than toatl scrollable disatnce or not
      const rightScrollable = container.scrollWidth > container.scrollLeft + container.clientWidth;
      // enabling the leftscroll button when it moved away from left
      setCanScrollLeft(leftScroll>0);
      // we are still able to scroll right then rightScrollable will be true else false based on the above condtion
      setCanScrollRight(rightScrollable);
    }

    // The container contains all this details
    // console.log({scrollLeft :container.scrollLeft, ===> it it the distance from left end
    //   clinetWidth : container.clientWidth,     ===> it is the width of each box that we took
    //   containerScrollWidth: container.scrollWidth}); ===>it is the total scrollable width

  }

// function for scroll funcatnality

const scroll = (direction) => {
  const scrollAmount = direction === "left" ? -300 :300;
  // scrollBy is a inbuilt function which takes in input aguments left or right with value and behabiour while scrolling
  scrollRef.current.scrollBy({left:scrollAmount,behaviour:"smooth"});
} // we have to activatethis funcion when a person click the left scroll button so link it there

// useEffect 
useEffect(()=>{
  const container = scrollRef.current;
  if(container){
    container.addEventListener("scroll",updateScrollButtons);
    updateScrollButtons();
    return () => container.removeEventListener("scroll",updateScrollButtons)
  }
},[newArrivals])
  return (
    <section className='py-16 px-4 lg:px-0'>
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4 ">
          Explore new arivals
        </h2>
        <p className='text-lg text-gray-600 mb-8'>
          Discover the latest styles staright off the runway. freshly added to keep 
          your wardrobe on the cutting edge of fashion
        </p>

        {/* Scroll buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          {/* Just check the syntax how functions are passed as arguments */}
          <button onClick={()=>scroll("left")} disabled={!canScrollLeft} className={`p-2 rounded border ${canScrollLeft ? " bg-white text-black":"bg-gray-200 cursor-not-allowed"}`}>
            <FiChevronsLeft className='text-2xl'/>
          </button>
          <button onClick={()=>scroll("Right")} disabled={!canScrollRight} className={`p-2 rounded border ${canScrollRight ? " bg-white text-black":"bg-gray-200 cursor-not-allowed"}`}>
            <FiChevronsRight className='text-2xl'/>            
          </button>

        </div>
      </div>

      {/* Scroll content */}
      <div ref={scrollRef} className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing": "cursor-grab" }` }
      onMouseDown = {handleMouseDown}
      onMouseUp = {handleMouseUpOrLeave}
      onMouseMove = {handleMouseMove}
      onMouseLeave = {handleMouseUpOrLeave}
      >
        
        {newArrivals.map((product)=>(
          <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
            <img src={product.images[0]?.url} alt={product.images[0]?.altText || product.name }
            className='w-full h-[500px] object-cover rounded-2xl' draggable ={false}/>
            <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white
              p-4 rounded-b-lg'>
                <Link to ={`/products/${product._id}`} className='block'>
                  <h4 className='font-medium'>
                      {product.name}
                  </h4>
                  <p className='mt-1'>${product.price}</p>
                </Link>
            </div>
          </div>

        ))}
      </div>
    </section>
  )
}

export default NewArrivals