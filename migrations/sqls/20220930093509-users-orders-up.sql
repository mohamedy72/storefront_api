CREATE TABLE IF NOT EXISTS users_orders (
    id SERIAL PRIMARY KEY,
    order_status VARCHAR(50),
    order_id integer References orders(id),
    user_id integer References users(id)
)