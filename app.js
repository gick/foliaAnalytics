let express=require('express')
var expressStaticGzip = require("express-static-gzip");
let app=express()
app.use("/", expressStaticGzip("./public"));
app.listen(80)