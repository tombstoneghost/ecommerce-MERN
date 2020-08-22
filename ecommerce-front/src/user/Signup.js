import React from 'react';
import Layout from '../core/Layout';
import { API } from '../config';

const Signup = () => {
    return(
        <Layout title="Signup" description="Signup to Node React E-Commerce App">
            {API}
        </Layout>
    );
}

export default Signup;