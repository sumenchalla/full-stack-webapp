import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';


const ProductDetails = ({productId}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {selectedProducts , loading , error, similarProducts } = useSelector((state)=>state.products);
    const {user,guestId} = useSelector((state)=>state.auth);
    const [mainImage, setMainImage] = useState("null"); 
    const [selectedSize, setSelectedSize] =useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisbaled, setIsButtonDisabled]=useState(false);

    const productFetchId = productId || id;

    useEffect(()=>{
        if(productFetchId){
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProducts({id :productFetchId}));
        }
    },[dispatch,productFetchId])

    useEffect(()=>{
        // If there are more the 1 image in images list for selected product then we are displaying the first image
        if(selectedProducts?.images?.length>0){
            setMainImage(selectedProducts.images[0].url)
        }
    },[selectedProducts])

    const handleQuantityChange = (action)=>{
        if(action==="plus"){
            setQuantity((prev)=>prev+1);
        }
        if(action==="minus" && quantity>1){
            setQuantity((prev)=>prev+1);
        }
    }
    const handleAddToCart = ()=>{
        if (!selectedSize || !selectedColor){
            toast.error("Please select a size and color before adding to cart",{
                duration:1000,
            })
            return;
        } 
        setIsButtonDisabled(true);
        
        dispatch(
            addToCart({
                productId : productFetchId,
                quantity,
                size : selectedSize,
                color : selectedColor,
                guestId,
                userId : user?._id
            })
        )
        .then (()=>{
            toast.success("Product added to cart",{duration:1000,})
        })
        .finally(()=>{
            setIsButtonDisabled(false);
        });
    };

  if(loading){
        return <p>Loading...</p>
    }

  if(error){
    return <p>Error : {error}</p>
  }
  return (
    <div className='p-6'>
        {selectedProducts && (
        <div className=" mx-auto bg-white p-8 rounded-lg">
            <div className="flex flex-col md:flex-row">
                {/* Left thubmnail */}
                <div className="hidden md:flex flex-col space-y-4 mr-6">
                    {selectedProducts.images.map((image,index)=>(
                        <img 
                        key={index}
                        src={image.url} 
                        alt={image.altText || `Thumbnail ${index}`}
                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                            mainImage=== image.url ? "border-black" : "border-gray-300"
                        }`} 
                        onClick={()=>setMainImage(image.url)}
                        />
                    ))}
                </div>
                {/* Main image */}
                <div className="md:w-1/2">
                        <div className="mb-4">
                            <img src={mainImage} alt="Main product" 
                            className='w-full h-auto object-cover rounded-2xl'/>
                        </div>
                </div>
                {/* Mobile Thumb nails */}
                <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
                        {selectedProducts.images.map((image,index)=>(
                            <img 
                            key={index}
                            src={image.url} 
                            alt={image.altText || `Thumbnail ${index}`}
                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                            mainImage=== image.url ? "border-black" : "border-gray-300" }`} 
                        onClick={()=>setMainImage(image.url)}
                            />
                        ))}
                </div>
                {/* Right side */}
                <div className='md:w-1/2 ml-10 '>
                        {/* Product name */}
                        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                            {selectedProducts.name}
                        </h1>
                        {/* Original price */}
                        <p className="text-lg text-gray-400 mb-1 line-through">
                            {selectedProducts.originalPrice && `${selectedProducts.originalPrice}`}
                        </p>
                        {/* Discounted price */}
                        <p className="text-xl text-gray-500 mb-2 ">
                            ${selectedProducts.price}
                        </p>
                        {/* Description */}
                        <p className="text-gray-600 mb-4">
                            {selectedProducts.Description}
                        </p>
                        {/* Colors */}
                        <div className="mb-4">
                            <p className="text-gray-700">Color: </p>
                            <div className="flex gap-2 mt-2">
                                {selectedProducts.colors.map((color)=>(
                                    <button key={color}
                                    style={{backgroundColor : color.toLocaleLowerCase(), filter:"brightness(0.5)"}}
                                    onClick={()=> setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full ${selectedColor===color?"border-4 border-black":"border-gray-300"}`}>
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Sizes */}
                        <div className="mb-4">
                            <p className="text-gray-700">Size:</p>
                            <div className="flex gap-2 mt-2">
                                {selectedProducts.sizes.map((size)=>(
                                    <button key={size} 
                                    onClick={()=>setSelectedSize(size)}
                                    className={`px-4 py-2 rounded border ${selectedSize===size? "bg-black text-white":""}`}>{size}</button>
                                ))}
                            </div>
                        </div>
                        {/* Cart quantity items */}
                        <div className="mb-6">
                            <p className="text-gray-700">Quantity:</p>
                            <div className="flex items-center space-x-4 mt-2 ">
                                <button className='px-2 py-1 bg-gray-200 rounded text-lg'
                                onClick={()=>{ if (quantity>1) {setQuantity(quantity-1)}}}>
                                    -
                                </button>
                                <span className='text-lg '>{quantity}</span>
                                <button className='px-2 py-1 bg-gray-200 rounded text-lg'
                                onClick={()=>setQuantity(quantity+1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <button onClick={handleAddToCart} 
                        disabled ={isButtonDisbaled}
                        className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisbaled ? "cursor-not-allowed opacity-50":"hover:bg-gray-950"}`}>
                            {isButtonDisbaled?"Adding...": "Add To Cart"}</button>

                        <div className="mt-10 text-gray-700">
                            <h3 className='text-xl font-bold mb-4'>Charateristics:</h3>
                            <table className='w-full text-left text-sm text-gray-600'>
                                <tbody>
                                    <tr>
                                        <td className='py-1'>Brand</td>
                                        <td className="py-1">{selectedProducts.brand}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1'>Material</td>
                                        <td className="py-1">{selectedProducts.material}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
            <div className="mt-20">
                <h2 className="text-2xl text-center font-medium mb-4"> You may Also Like</h2>
                <ProductGrid products={similarProducts} loading={loading} error={error}/>
            </div>
        </div>
        )}
    </div>
  )
}

export default ProductDetails