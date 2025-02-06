const express=require("express");
const app=express();
const path=require("path");
const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public"))); 
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
const mongoose=require("mongoose");
const listing=require("./models/listing.js");
main().then(()=>{
    console.log("db is connected");
})
.catch((err)=>{
console.log(err);
});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}  
app.get("/",(req,res)=>{
res.send("hi i am root");
});
// app.get("/testlisting",async(req,res)=>{
//     let samplelisting=new listing({
//         title:"my new villa",
//         description:"by the beach",
//         price:1200,
//         location:"colangute,goa",
//         country:"India",       
//     });
//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });
//INDEX ROUTE
app.get("/listings",async (req,res)=>{
    const alllistings=await listing.find({});
    res.render("listings/index.ejs",{alllistings});
});
//NEW ROUTE
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
//SHOW ROUTE
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const list=await listing.findById(id);
    res.render("listings/show.ejs",{list});
});
//CREATE ROUTE
app.post("/listings",async(req,res)=>{
let {title,description,image,price,location,country}=req.body;
const newListing = new listing({
    title,
    description,
    image,
    price,
    location,
    country
});
await newListing.save();
res.redirect("/listings");
});
//EDIT ROUTE
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const list=await listing.findById(id);
    res.render("listings/edit.ejs",{list});
});
//UPDATE ROUTE
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let {title,description,image,price,location,country}=req.body;
    const list=await listing.findByIdAndUpdate(id,{title,description,image,price,location,country}
    );
    res.redirect("/listings");
});
//DELETE ROUTE
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const list=await listing.findByIdAndDelete(id);
    res.redirect("/listings");
});
// Save to database
app.listen(8080,()=>{
    console.log("server is listening at port 8080");
});