const mongoose=require("mongoose");
mongoose.set('strictQuery',true);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/myMongoDb",{useNewUrlParser: true , useUnifiedTopology: true})
.then(()=>
    console.log("connection successful!")
).catch((e)=>{
    console.log(e);
})