CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id integer References orders(id),
    product_id integer References products(id)
)