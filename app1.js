const express=require("express");
const app=express();
const port=8080;
const ejsMate=require("ejs-mate");
const path=require("path");
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));  
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
const mongoose=require("mongoose");
const { user, recruiter, candidate } = require('./models/schema.js');
main().then(()=>{
    console.log("db is connected");
})
.catch((err)=>{
console.log(err);
});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/jobportal');
}    
app.get("/jobportal",async (req,res)=>{
    const {recruiter}=require("./models/schema");
    const jobs=await recruiter.find({});
    res.render("home.ejs",{jobs});
});
app.get("/jobportal/signup",(req,res)=>{
    res.render("signup.ejs");
});
app.post("/jobportal/signup", async (req, res) => {
      const { category, name, email, password, bio, phone, resume } = req.body;
      const newUser = new jobportal({
        category,
        name,
        email,
        password,
        bio: category === 'candidate' ? '' : bio,
        phone,
        resume: category === 'candidate' ? resume : null,
      });
  
      await newUser.save();
      res.redirect("/jobportal");
  });
  app.get("/jobportal/login",(req,res)=>{
    res.render("login.ejs",{error:null,success:null});
  });
  app.post("/jobportal/login",async(req,res)=>{
    let {email,password}=req.body;
    const founduser=await user.findOne({email});
    if (!founduser || founduser.password !== password) {
        return res.render("login.ejs", { error: "Invalid email or password" });
    }
        res.redirect("/jobportal");   
  });
app.listen(port,()=>{
    console.log("port is listening");
});