const  express = require('express')
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();

app.use(cors())


app.get("/", (req, res)=>{
    res.send("The Api is working")
})

app.post("/payment/create", async (req, res) => {
    const total = parseInt (req.query.total);
    if (total > 0) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      console.log(paymentIntent);
      res.status(201).json({
        clientSecret:paymentIntent.client_secret,
      });
    } else {
      res.status(403).json({
        message: "total must be greater than 0",
      });
    }
  });

app.listen(5001, ()=>console.log("listening on port 5001"))