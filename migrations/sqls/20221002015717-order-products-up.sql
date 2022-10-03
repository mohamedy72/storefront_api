CREATE TABLE IF NOT EXISTS order_products (
    orderProducts_id SERIAL PRIMARY KEY,
    quantity INTEGER,
    product_Key INTEGER REFERENCES products(product_id) on delete cascade on update cascade,
    order_Key INTEGER REFERENCES orders(order_id) on delete cascade on update cascade
)