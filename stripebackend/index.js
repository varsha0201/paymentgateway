const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51HA8TqIJgrleGsbosBDi7V1PsRniyQ7ftG1iueLUKnIOxTawY6XTAxxsrXRaIpac3cnr6PqXiE4G3aNnrbaeZUDz00tZZOC0Ax");    
const {v4:uuid4} =require('uuid');
const app = express();

//middleware
app.use(express.json())
app.use(cors())


//routes
app.get("/",(req, res)=>{
    res.send("This is learncodeonline.")
})

app.post("/payment", (req, res)=>{
    const {product, token} = req.body;
    console.log("product", product);
    console.log("price", product.price);
    const idempontencyKey = uuid();

    return stripe.customer
    .create({
        email: token.email,
        source: token.id
    }).then(customer =>{
        stripe.charges.create({
            amount: product.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of product.name`,
            shipping:{
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, {idempontencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})


//listen
app.listen(8282, () => console.log("listen at port 8282"))
