import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";

const CollectionsPage = () => {
  const [products, setProducts] = useState([]);
  const sideBarRef = useRef(null);
  const [isSidebarOpen,setIsSidebarOpen] =useState(false);
  const toggleSidebar =()=>{
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleClickOutside = (e)=>{
    //close side bar if clicked outside
    if(sideBarRef.current && !sideBarRef.current.contains(e.target)){
        setIsSidebarOpen(false);
    };
  };
  useEffect(()=>{
    //adding a event lister for clicks
    document.addEventListener("mousedown",handleClickOutside);

    //cleaning the event listner
    document.removeEventListener("mousedown",handleClickOutside);
  });

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Product 1",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500?random=8",
              altText: "product 1",
            },
          ],
        },
        {
          _id: 2,
          name: "Product 2",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500?random=9",
              altText: "product 2",
            },
          ],
        },
        {
          _id: 3,
          name: "Product 3",
          price: 100,

          images: [
            {
              url: "https://picsum.photos/500/500?random=10",
              altText: "product 3",
            },
          ],
        },
        {
          _id: 4,
          name: "Product 4",
          price: 100,

          images: [
            {
              url: "https://picsum.photos/500/500?random=11",
              altText: "product 4",
            },
          ],
        },
        {
          _id: 5,
          name: "Product 5",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500?random=8",
              altText: "product 5",
            },
          ],
        },
        {
          _id: 6,
          name: "Product 6",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500?random=9",
              altText: "product 6",
            },
          ],
        },
        {
          _id: 7,
          name: "Product 7",
          price: 100,

          images: [
            {
              url: "https://picsum.photos/500/500?random=10",
              altText: "product 7",
            },
          ],
        },
        {
          _id: 8,
          name: "Product 8",
          price: 100,

          images: [
            {
              url: "https://picsum.photos/500/500?random=11",
              altText: "product 8",
            },
          ],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center">
        <FaFilter className="mr-2" />Filters
      </button>

      {/* Filter sidebar */}
      <div ref={sideBarRef} className={`${isSidebarOpen?"translate-x-0":"-translate-x-full"}`}>
        <FilterSidebar />
      </div>
    </div>
  );
};

export default CollectionsPage;
