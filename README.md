# E Commerce Web Application 
An Online Book Store which is free, reliable, secure and fast management system providing features like CRUD operations on products, purchasing a product, adding to cart, proceeding with a payment gateway, etc. 

**Stack:** MERN
**Reference:** [Udemy Course](https://www.udemy.com/course/react-node-ecommerce/)
<br>
### The website has the following features: 

 - Search Product
 - New Arrivals and Best Sellers
 - Product Information
 - Product Stock/Out of Stock
 - View Product and Related Products
 - Add to Cart
 - Remove Product/Adjust Quantity
 - Sign In to checkout the Cart
 - User/Admin Dashboard
 - Public/Private/Admin Routes
 - Shopping Cart
 - Payment Gateway Integration
 - Check out with delivery Address
 - Success/Failure Message
 - Update Message
 - Search Products using Filters
 - Create Category/Product
 - View/Manage Orders
 - Product Update/Delete
 - Role Based Access
 
Upcoming Features:
 - E-Mail alert to User on placing an Order
 - Contact Us 
 - Order Updates to User
 - Social Media Links
 - Improved UI
 - Mobile Application API 

 ## Demo
 The Application will be hosted soon. 

## Installation

    git clone https://github.com/tombstoneghost/ecommerce-MERN
    cd ecommerce-MERN
    npm install

 
## Configuration
**Server:**
Create a file with name `.env` in the Server folder and add the following code. 

    DATABASE= 'Enter your MongoDB Link here'
    PORT=8000
    JWT_SECRET=ajkbjbfknkhjannkabdwk
    BRAINTREE_MERCHANT_ID=XXXXXXXXXXXXXXXXXXXX
    BRAINTREE_PUBLIC_KEY=XXXXXXXXXXXXXXXXXXXXXXX
    BRAINTREE_PRIVATE_KEY=XXXXXXXXXXXXXXXXXXXXXXX
    
**Front-End:**
Create a file with name `.env` in the `ecommerce-front` folder and add the following. 

    REACT_APP_API_URL=http://localhost:8000/api
