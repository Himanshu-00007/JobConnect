const mongoose=require("mongoose");
const userschema=new mongoose.Schema({
    category:{
        type:String,
        enum:["recruiter","candidate"],
        required:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/.+@.+\..+/, 'Please enter a valid email'],
    },
    password:{
        type:String,
        required:true,
    },
    bio: {
        type: String,
        maxlength: 250,
        default: '',
      },
      phone: {
        type: String,
        required: true,
      },
      resume: {
        type: String, // Store resume file path or URL
        default: null,
      },
});
const recruiterSchema = new mongoose.Schema({
  jobname: { type: String, required: true },
  jobDescription: { type: String, required: true },
  keyResponsibilities: { type: String, required: true },
  requiredSkills: { type: String, required: true },
  whoCanApply: { type: String },
  otherRequirements: { type: String },
  salary: { type: Number, required: true },
});
const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  resumePath: { type: String ,default:null,},
});
const user= mongoose.model("user", userschema);
const recruiter = mongoose.model("recruiter", recruiterSchema);
const candidate=mongoose.model("candidate",candidateSchema);
module.exports = { user,recruiter,candidate};
