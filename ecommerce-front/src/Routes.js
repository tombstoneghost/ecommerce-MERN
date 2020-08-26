import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './core/Home';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';

import Signup from './user/Signup';
import Signin from './user/Signin';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import Profile from './user/Profile';

import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';

import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Orders from './admin/Orders';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/shop" exact component={Shop}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path='/product/:productId' exact component={Product}/>
                <Route path='/cart' exact component={Cart}/>

                <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
                <PrivateRoute path="/profile/:userId" exact component={Profile}/>

                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
                <AdminRoute path="/create/category" exact component={AddCategory}/>
                <AdminRoute path="/create/product" exact component={AddProduct}/>
                <AdminRoute path="/admin/orders" exact component={Orders}/>
                <AdminRoute path='/admin/products' exact component={ManageProducts}/>
                <AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;