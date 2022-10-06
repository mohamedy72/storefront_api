import app, { address } from "./server";

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
