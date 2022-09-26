import express from "express";
import bodyParser from "body-parser";

import productsRouter from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";

const app: express.Application = express();
const address: string = "http://127.0.0.1:3000";

app.use(bodyParser.json());

app.get("/", (_req, res) => {
  res.send("Homepage");
});

app.use("/api/products", productsRouter);
app.use("/api/users", userRoutes);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
