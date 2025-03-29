const express = require("express")
const app = express()
const port = 4243
// micro api pour conversion de valeurs
app.use(express.json())
// celsius -> fahrenheit -> celsius
app.get("/c/t", (req, res)=>{
    const {val , from, to} = req.query
    if(!val || isNaN(val)){
        return res.status(400).send("Error: value must be a number")
    }

    let result

    if(from === "Celsius" && to === "Fahrenheit"){
        result = (val * 9/5) + 32
    } else if (from === "Fahrenheit" && to ==="Celsius"){
        result = (val - 32) * 5/9
    } else {
        return res.status(400).send("invalid convertion")
    }

        res.json({ result})
        res.status(200).send("test passed")
})
// kilometers -> miles -> kilometers
app.get("/c/d", (req,res)=>{
    const { val , from, to } = req.query
    if(!val || isNaN(val)){
        return res.status(400).send("Error: value must be a number")
    }

    let result
    if(from === "Kilometers" && to === "Miles"){
        result = val * 0.621371
    } else if (from === "Miles" && to === "Kilometers"){
        result = val / 0.621371
    } else {
        return res.status(400).send("invalid convertion")
    }
    res.json({ result})
    res.status(200).send("test passed")

})

// kilogrammes -> livres -> kilogrammes
app.get("/c/w", (req, res)=>{
    const { val, from, to} = req.query
    if(!val ||isNaN(val)){
        return res.status(400).send("Error: value must be a number")
    }

    let result

    if (from === "Kilograms" && to === "Pounds"){
        result = val * 2.20462
    } else if (from === "Pounds" && to === "Kilograms"){
        result = val / 2.30462
    } else {
        return res.status(400).send("invalid convertion")
    }

    res.json({ result })
    res.status(200).send("test passed")

})
// newton -> Kilogram-force -> Newton
app.get("/c/f", (req, res) => {
    const { val, from, to } = req.query
  
    if (!val || isNaN(val)) {
      return res.status(400).send("Error: value must be a number")
    }
  
    let result
  
    if (from === "Newtons" && to === "KilogramForce") {
      result = val * 0.10197
    } else if (from === "KilogramForce" && to === "Newtons") {
      result = val / 0.10197
    } else {
      return res.status(400).send("invalid convertion")
    }
  
    res.json({ result })
    res.status(200).send("test passed success!")

})
/*
app.listen(port, ()=>{
    console.log(`The server was is up and running on http://localhost:${port}`)
})
*/
module.exports = app
