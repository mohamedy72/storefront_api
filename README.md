# Storefront API

Storefront API is created for a fictional e-commerce organization, its used to store information about the products they sell, store users that use their website and manage different orders.

---

## Table of contents

- [Project Requirements](#requirements)
- [Setup](#setup)
- [Available Scripts](#scripts)
- [Connect to database](#connect)
- [Important notes](#notes)

---

## Requirements

- `yarn`
- `node > 12.0.0`
- Server is running on PORT `3000`
- Database is running on PORT `5432` || you can run this query from `psql` to obtain the port in your environment `SELECT * FROM pg_settings WHERE name='port';`
- When endpoint is marked as `Auth required` that refers to a requirement of JWT token to perform the action

---

## Setup

1. Clone this repo
2. Run `yarn install`
3. This will install all required packages

---

## Scripts

Scripts can be run using `yarn <script-name>`

|     Script     | Function                                                                                                                                                                     |
| :------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    `watch`     | This script runs `typescript` compiler on `watch` mode then runs `nodemon` on our entry point `server.ts` file, any subsequent saves restart the whole process automatically |
|    `build`     | A script to compile our `typescript` into `pure javascript` code                                                                                                             |
|     `test`     | A script to run tests                                                                                                                                                        |
|  `migrate:up`  | Initiate the migrations of the database tables                                                                                                                               |
| `migrate:down` | Reverse the migrations of the database tables                                                                                                                                |

---

## Connect

To be able to connect to the database, please refer to the submission notes for ENV variables to be able to fill `<POSTGRES-XXX>`

1- Create a `.env` file in the root dir then copy-paste the variables from submission notes.

2- `CTRL+SHIFT+T` To open a new terminal window then run `psql postgres`.

3- Create new user using `CREATE ROLE <POSTGRES_USER> WITH SUPERUSER PASSWORD '<POSTGRES_PASSWORD>'`

4- Create a new database using the following query `CREATE DATABASE <name-assigned-to-POSTGRES_DB-in-env-file>;`

5- Next, in the root dir of the project you can find a `database.json` file which contains 2 databases one for `production` and another for `testing`

6- Run `yarn migration:up` script to create required tables.

7- Our database is ready to accept our CRUD operations.

---

## notes ????

1. You have to create 2 databases, one for development and another for testing.

2. While testing, to be able to run tests on `orders` and `order_products` make sure you have:
   - a user in `users` table
   - a product in `products` table

---

Please refer to [REQUIREMENTS](REQUIREMENTS.md) for more information about the database
