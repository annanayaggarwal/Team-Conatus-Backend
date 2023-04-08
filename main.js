const express = require('express')
const app = express();
const port=process.env.PORT||5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const userRouter=require('./src/router/userrouter')
app.use('/form', userRouter)

app.listen(5000, () => {
    console.log("server running now")
})