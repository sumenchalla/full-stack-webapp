import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";

const cart = {
  products: [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 1,
      name: "Jeans",
      size: "L",
      color: "Blue",
      quantity: 1,
      price: 25,
      image: "https://picsum.photos/200?random=2",
    },
  ],
};
const Checkout = () => {
  const [checkoutId,setCheckoutId] = useState(false);
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleCreateCheckout =(e)=>{
    e.preventDefault();
    setCheckoutId(123);
  }

  const handlePaymentSuccess = (details)=>{
    console.log("Pyment Sucessful",details);
    navigate("/order-confirmation")
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left section */}
      <div className="bg-white rounded-lg p-6 ">
        <h2 className="text-2xl uppercase mb-6 ">Checkout</h2>
        <form onSubmit={handleCreateCheckout} action="">
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              value="user@example.com"
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4 ">
            <div>
              <label htmlFor="" className="block text-gray-700">
                First Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="" className="block text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">Address</label>
            <input type="text" 
            value={shippingAddress.address} 
            onChange={(e)=>setShippingAddress({...shippingAddress,address:e.target.value})} 
            className="w-full p-2 border rounded"
            required/>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
             <div>
              <label htmlFor="" className="block text-gray-700">
                City
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="" className="block text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">Country</label>
            <input type="text" 
            value={shippingAddress.country} 
            onChange={(e)=>setShippingAddress({...shippingAddress,country:e.target.value})} 
            className="w-full p-2 border rounded"
            required/>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">Phone</label>
            <input type="text" 
            value={shippingAddress.phone} 
            onChange={(e)=>setShippingAddress({...shippingAddress,phone:e.target.value})} 
            className="w-full p-2 border rounded"
            required/>
          </div>
          <div className="mt-6">
            {!checkoutId ? (<button type="submit" className="bg-black text-white w-full h-8 rounded text-center">Continue to Payment</button>):(<div>
                <h3 className="text-lg mb-4">Pay with Paypal</h3>
                {/* Paypal component */}
                <PayPalButton amount={100} onSuccess={handlePaymentSuccess} onError = {(err)=> alert("Payment fialed Try again")}/>
            </div>)}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
