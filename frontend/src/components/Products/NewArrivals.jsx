import  { useEffect, useRef, useState } from 'react'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const NewArrivals = () => {
  //  New stuff useRef method in react
  const scrollRef = useRef(null)


  const [isDragging,setisDragging] = useState(false)
  const [startX,setstartX] = useState(0)
  const [scrollLeft,setscrollLeft] = useState(false)
  const [canScrollRight,setCanScrollRight] = useState(true)
  const [canScrollLeft,setCanScrollLeft] = useState(false)
  const newArrivals =[
    {
      _id:"1",
      name: "stylish jacket",
      price:120,
      images:[
        {
          url: "https://picsum.photos/500/500?random=1",
          altText:"Stylish Jacket",
        }
      ],
    },
      {
      _id:"2",
      name: "stylish jacket",
      price:120,
      images:[
        {
          url: "https://picsum.photos/500/500?random=2",
          altText:"Stylish Jacket",
        }
      ],
    },
    {
      _id:"3",
      name: "stylish jacket",
      price:120,
      images:[
        {
          url: "https://picsum.photos/500/500?random=3",
          altText:"Stylish Jacket",
        }
      ],
    },
    {
      _id:"4",
      name: "stylish jacket",
      price:120,
      images:[
        {
          url: "https://picsum.photos/500/500?random=4",
          altText:"Stylish Jacket",
        }
      ],
    },
    {
      _id:"5",
      name: "stylish jacket",
      price:120,
      images:[
        {
          url: "https://picsum.photos/500/500?random=5",
          altText:"Stylish Jacket",
        }
      ],
    },
    {
      _id:"6",
      name: "stylish jacket",
      price:120,
      images:[
        {
          url: "https://picsum.photos/500/500?random=6",
          altText:"Stylish Jacket",
        }
      ],
    },
    {
      _id:"7",
      name: "stylish jacket",
      price:120,
      images:[
        {
          url: "https://picsum.photos/500/500?random=7",
          altText:"Stylish Jacket",
        }
      ],
    },

    {
      _id:"8",
      name: "stylish jacket",
      price:120,
      images:[
        {
          url: "https://picsum.photos/500/500?random=8",
          altText:"Stylish Jacket",
        }
      ],
    },
  ]

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
    // updateScrollButtons();
  }
})
  return (
    <section>
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
          <button onClick={()=>scroll("left")} disabled={!canScrollLeft} className={`p-2 rounded border ${canScrollLeft ? " bg-white text-black":"bg-gray-200"}`}>
            <FiChevronsLeft className='text-2xl'/>
          </button>
          <button className='p-2 rounded border bg-white text-black'>
            <FiChevronsRight className='text-2xl'/>            
          </button>

        </div>
      </div>

      {/* Scroll content */}
      <div ref={scrollRef} className="container mx-auto overflow-x-scroll flex space-x-6 relative">
        {newArrivals.map((product)=>(
          <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
            <img src={product.images[0]?.url} alt={product.images[0]?.altText || product.name }
            className='w-full h-[500px] object-cover rounded-2xl'/>
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