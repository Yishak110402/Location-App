const express = require('express')
const cors = require('cors')
const generationRouter = require("./routes/generationRoutes")

const app = express()

app.use(express.json()) 
app.use(cors())


app.use("/generate", generationRouter)

app.all("/test", (req, res) => { 
    return res.json({
        status:"success",
        message:"Test successfull"
    }) 
 })

app.listen(6969, () => {
    console.log('Server running on port 6969')
})