# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

| Endpoint | Route                  | Method | Function                | Auth required      |
| -------- | ---------------------- | ------ | ----------------------- | ------------------ |
| Index    | `/products`            | `GET`  | List all products       | :x:                |
| Show     | `/products/:productId` | `GET`  | List a specific product | :x:                |
| Create   | `/products`            | `POST` | Create a new product    | :heavy_check_mark: |

##### Not implemented yet

- [OPTIONAL] Top 5 most popular products [GET] (/api/top-5-popular-products)
- [OPTIONAL] Products by category (args: product category) [GET] (/api/products?category=value)

#### Users

| Endpoint | Route            | Method | Function             | Auth required      |
| -------- | ---------------- | ------ | -------------------- | ------------------ |
| Index    | `/users`         | `GET`  | List all products    | :heavy_check_mark: |
| Show     | `/users/:userId` | `GET`  | List a specific user | :heavy_check_mark: |
| Create   | `/users`         | `POST` | Create a new product | :x:                |

#### Orders

| Endpoint    | Route             | Method | Function                                        | Auth required      |
| ----------- | ----------------- | ------ | ----------------------------------------------- | ------------------ |
| OrderByUser | `/:userId/orders` | `GET`  | Get `active` order/s related to a specific user | :heavy_check_mark: |

##### Not implemented yet

- [OPTIONAL] Completed Orders by user (args: user id)[token required]

---

## Data Shapes

### Product

```sql

products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    price integer,
    category VARCHAR(100)
);

```

---

### User

```sql

 users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(150) NOT NULL,
    password VARCHAR NOT NULL UNIQUE
 )

```

---

### Order

```sql

 orders(
    id SERIAL PRIMARY KEY,
    product_id integer References products(id),
    quantity integer,
    user_id integer References users(id),
    order_status VARCHAR(50)
 )

```
