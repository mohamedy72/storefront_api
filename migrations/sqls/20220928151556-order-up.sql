CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id integer References products(id),
    quantity integer,
    user_id integer References users(id),
    order_status VARCHAR(50)
);