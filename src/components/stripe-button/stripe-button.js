import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) =>{
    const priceForStripe=price * 100;
    const publishableKey='pk_test_hE3Y1w8NZtnXpvPkISjMKNSg00OWtG1VIP' ;

    const onToken=token=>{
        console.log(token);
        alert('Payment Successful')
    }

    return(
        <StripeCheckout 
        label='Pay Now'
        name='Crown Clothing Pvt Ltd.'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your Total: Rs.${price}`}
        amount={priceForStripe}
            
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        
        />
    )
}

export default StripeCheckoutButton;