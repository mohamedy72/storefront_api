CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    product_key integer References products(product_id) on delete cascade on update cascade,
    quantity integer,
    user_key integer References users(user_id) on delete cascade on update cascade,
    order_status VARCHAR(50)
);