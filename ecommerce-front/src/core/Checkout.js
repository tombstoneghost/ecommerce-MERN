import React, {useState, useEffect} from 'react';
import {getBraintreeClientToken, processPayment, createOrder} from './apiCore';
import {isAuthenricated} from '../auth/index'
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import {emptyCart} from './cartHelpers';

const Checkout = ({products}) => {
    const [data, setData] = useState({
        loading: false,
        success: false, 
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenricated() && isAuthenricated().user._id;
    const token = isAuthenricated() && isAuthenricated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token)
        .then(data => {
            if(data.error) {
                setData({...data, error: data.error});
            } else {
                setData({clientToken: data.clientToken});
            }
        })
    };

    useEffect(() => {
        getToken(userId, token);
    },[]);

    const handleAddress = event => {
        setData({...data, address: event.target.value});
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenricated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to ="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        )
    };

    let deliveryAddress = data.address;

    const buy = () => {
        setData({ loading: true })
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                nonce = data.nonce;

                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };

                processPayment(userId, token, paymentData)
                .then(response => {
                    setData({...data, success: response.success});
                    
                    const createOrderData = {
                        products: products,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount,
                        address: deliveryAddress
                    };

                    createOrder(userId, token, createOrderData)
                    .then(response => {
                        emptyCart(() => {
                            console.log('Payment Success and Empty Cart');
                            setData({loading: false, success: true});
                            window.location.reload();
                        });
                    })
                    .catch(error => {
                        setData({loading: false});
                    });
                })
                .catch(error => {
                    console.log(error)
                    setData({loading: false});
                });
            })
            .catch(error => {
                setData({...data, error: error.message });
            });
    };

    const showDropIn = () => {
        return(
            <div onBlur={() => setData({...data, error: ''})}>
                {data.clientToken !== null && products.length > 0 ? (
                    <div>
                        <div className="gorm-group mb-3">
                            <label className="text-muted">Delivery Address: </label>
                            <textarea onChange={handleAddress} className="form-control" value={data.address} placeholder="Type your delivery address here ..."/>
                        </div>   
                        <DropIn options={{authorization: data.clientToken, paypal: {flow: 'vault'}}} onInstance={instance => (data.instance = instance)}/>
                        <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                    </div>
                ):null}
            </div>
        );
    };

    const showError = error => {
        return(
            <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                {error}
            </div>
        );
    };

    const showSuccess = success => {
        return(
            <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
                Thanks! Your payment was successful.
            </div>
        );
    };

    const showLoading = (loading) => {
        return loading && (
            <h2>Processing...</h2>
        );
    };

    return (
        <div>
            <h2> Total: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
}

export default Checkout;