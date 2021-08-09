import express from "express";
import imagesRoute from "./routes/images";

const app = express();
const port = "3000";

app.get("/", (req, res) => {
  res.send("Hello from " + req.headers.host);
});

app.use("/image", imagesRoute);

app.listen(port, () =>
  console.log("server started at http://localhost:" + port)
);


export default app;