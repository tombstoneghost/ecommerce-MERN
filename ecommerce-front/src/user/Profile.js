import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {isAuthenricated} from '../auth/index';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {read, update, updateUser} from './apiUser';

const Profile = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const {token} = isAuthenricated();

    const {name, email, password, error, success} = values;

    const init = (userId) => {
        read(userId, token)
        .then(data => {
            if(data.error) {
                setValues({...values, error: true})
            } else {
                setValues({
                    ...values,
                    name: data.name, 
                    email: data.email
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    },[])

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value});
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, {name, email, password})
        .then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                updateUser(data, () => {
                    setValues({...values, name: data.name, email: data.email, success: true});
                    values.success = true;
                });
            }
        })
        .catch(error => {
            console.log("Error", error)
        });
    };

    const redirectUser = (result) => {
        console.log("Success", result);
        if(result) {
            return <Redirect to="/cart" />
        }
    };

    const profileUpdate = (name, email, password) => (
        <form className="mb-4">
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">E-Mail</label>
                <input type="email" onChange={handleChange('email')} className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control" value={password}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );

    return(
        <Layout title="Profile" description="Update your profile" className="container-fluid">
            <h2 className="mb-4">Profile Update</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    );
};

export default Profile;