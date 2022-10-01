# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index [GET] (/api/)
- Show [GET] (/api//:productId)
- Create [token required] [POST] (/api/products)
- [OPTIONAL] Top 5 most popular products [GET] (/api/top-5-popular-products)
- [OPTIONAL] Products by category (args: product category) [GET] (/api/products?category=value)

#### Users

- Index [token required] [GET] (/api/users)
- Show [token required] [GET] (/api/users/:userId)
- Create user [POST] (api/users)

#### Orders

- Current Order by user (Active Orders by a user) (args: user id)[token required] [GET] [/users/:userId/orders]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product -> products

- id SERIAL PRIMARY KEY [PK]
- name [VARCHAR(200)]
- price [INTEGER]
- [OPTIONAL] category VARCHAR(100)

#### User -> users

- id SERIAL PRIMARY KEY [PK]
- firstName [VARCHAR(100)]
- lastName [VARCHAR(100)]
- password [INTEGER]

#### Orders

- id SERIAL PRIMARY KEY [PK]
- id of each product in the order [FK] [References products(id)]
- quantity of each product in the order [INTEGER]
- user_id [FK] [References users(id)]
- status of order (active or complete) [VARCHAR(50)]
