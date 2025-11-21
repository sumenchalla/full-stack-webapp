import React from 'react'
import { PayPalButtons,PayPalScriptProvider } from '@paypal/react-paypal-js'

const PayPalButton = ({amount,onSuccess,onError}) => {
  return (
    <PayPalScriptProvider options={{"clientId":"AXZdWprPZsal2OiyVEduiWNHCxoiQmChl-BBG9nIda4A3BxZJOmA8C1KWYRT0HfUHNkBfHD0jirtOjc3"}}>
        <PayPalButtons style ={{layout:"vertical"}} creatOrder = {(data,actions)=>{
            return actions.order.create({
                purchase_units:[{amount:{value:amount}}]
            })
        }}
        onApprove={(data,actions)=>{
            return actions.order.capture().then(onSuccess)
        }}
        onError={onError}
        />  

        
    </PayPalScriptProvider>
  )
}

export default PayPalButton