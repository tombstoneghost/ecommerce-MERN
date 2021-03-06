import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenricated} from '../auth/index';
import {Link} from 'react-router-dom';
import {listOrders, getStatusValues, updateOrderStatus} from './apiAdmin';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const {user, token} = isAuthenricated();

    const loadOrders = () => {
        listOrders(user._id, token)
        .then(data => {
            if(data.error) {
                console.log(data.errors);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token)
        .then(data => {
            if(data.error) {
                console.log(data.errors);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    },[]);

    const showOrdersLength = () => {
        if(orders.length > 0) {
            return(
                <h1 className="text-danger display-2">Total Orders: {orders.length}</h1>
            );
        } else {
            return(
                <h1 className="text-danger">No Orders</h1>
            );
        }
    };

    const showInput =(key, value) => {
        return(
            <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                    <div className="input-group-text">{key}</div>
                </div>
                <input text="text" value={value} className="form-control" readOnly/>
            </div>
        );
    };

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value)
        .then(data => {
            if(data.error) {
                console.log('Status Update Failed');
            } else {
                loadOrders();
            }
        });
    };

    const showStatus = (o) => {
        return(
            <div className="form-group">
                <h3 className="mark mb-4">Status: {o.status}</h3>
                <select className="form-control" onChange={(e) => handleStatusChange(e, o._id)}>
                    <option>Update Status</option>
                    {statusValues.map((status, i) => (
                        <option key={i} value={status}>{status}</option>
                    ))}
                </select>
            </div>
        );
    };

    return(
        <Layout title="Orders" description={`G'day ${user.name}, you can manage all the orders here`} className="container-fluid">
            {showOrdersLength()}
            {orders.map((o, oIndex) => {
                return(
                    <div className="mt-5" key={oIndex} style={{borderBottom: '5px solid indigo'}}>
                        <h2 className="mb-5">
                            <span className="bg-primary">Order ID: {o._id}</span>
                        </h2>
                        <ul className="list-group mb-2">
                            <li className="list-group-item">{showStatus(o)}</li>
                            <li className="list-group-item">Transaction ID: {o.transaction_id}</li>
                            <li className="list-group-item">Amount: ${o.amount}</li>
                            <li className="list-group-item">Ordered By: {o.user.name}</li>
                            <li className="list-group-item">Ordered on: {moment(o.createdAt).fromNow()}</li>
                            <li className="list-group-item">Delivery Address: {o.address}</li>
                        </ul>
                        <h3 className="mt-4 mb-4 font-italic">Total Products in Order: {o.products.length}</h3>
                        {o.products.map((p, pIndex) => (
                            <div className="mb-4" key={pIndex} style={{padding: '20px', border: '1px solid indigo'}}>
                                {showInput('Product name', p.name)}
                                {showInput('Product price', p.price)}
                                {showInput('Product total', p.count)}
                                {showInput('Product ID', p._id)}
                            </div>
                        ))}
                    </div>
                );
            })}
        </Layout>
    );
}

export default Orders;