import MetaData from '../layouts/MetaData';
import { Fragment, useEffect, useState } from 'react';
import { validateShipping } from './Shipping';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutStep';
import { createOrder } from '../../actions/orderActions';
import Loader from '../layouts/Loader';

export default function ConfirmOrder () {
    const { shippingInfo, items:cartItems } = useSelector(state => state.cartState);
    const { user } = useSelector(state => state.authState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const itemsPrice = cartItems.reduce((acc, item)=> (acc + item.price * item.quantity),0);
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    let taxPrice = Number(0.05 * itemsPrice);
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
    taxPrice = Number(taxPrice).toFixed(2)
    
    const processPayment = async () => {
        setLoading(true);
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        
        // Create order directly without payment
        const order = {
            orderItems: cartItems,
            shippingInfo,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            paymentInfo: {
                id: 'bypass_payment',
                status: 'succeeded'
            }
        }
        
        dispatch(createOrder(order))
        
        // Wait for 4 seconds before navigating
        await new Promise(resolve => setTimeout(resolve, 4000));
        navigate('/order/success')
    }

    useEffect(()=>{
        validateShipping(shippingInfo, navigate)
    },[shippingInfo, navigate])

    return (
        <Fragment>
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps shipping confirmOrder />
            {loading ? (
                <div className="row justify-content-center">
                    <div className="col-6 mt-5 text-center">
                        <Loader />
                        <h3 className="mt-3">Placing your order...</h3>
                    </div>
                </div>
            ) : (
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-confirm">
                        <h4 className="mb-3">Shipping Info</h4>
                        <p><b>Name:</b> {user.name}</p>
                        <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country} </p>
                        
                        <hr />
                        <h4 className="mt-4">Your Cart Items:</h4>

                        {cartItems.map(item => (
                            <Fragment key={item.product}>
                                <div className="cart-item my-1">
                                    <div className="row">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-6">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>

                                        <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                            <p>{item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </Fragment>
                        ))}
                    </div>
                    
                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
                            <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                            <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                            <hr />

                            <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                            <hr />
                            <button 
                                id="checkout_btn" 
                                onClick={processPayment} 
                                className="btn btn-primary btn-block"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Proceed to Payment'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}