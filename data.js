const mongoose = require("mongoose");
const { recruiter } = require("./models/schema");

async function seedRecruiters() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/jobportal");
    console.log("Database connected");
    
    const recruiterData = [
      {
        jobname: "Software Engineer",
        jobDescription: "Develop and maintain web applications.",
        keyResponsibilities: "Write clean, maintainable code, Debug issues.",
        requiredSkills: "JavaScript, Node.js, React",
        whoCanApply: "Graduates with 2+ years experience",
        otherRequirements: "Good problem-solving skills",
        salary: 80000,
      },
      {
        jobname: "Data Analyst",
        jobDescription: "Analyze and interpret complex data.",
        keyResponsibilities: "Build dashboards, Analyze trends.",
        requiredSkills: "SQL, Python, Data Visualization",
        whoCanApply: "Graduates with a background in data science",
        otherRequirements: "Experience in Excel preferred",
        salary: 70000,
      },
      {
        jobname: "Product Manager",
        jobDescription: "Lead product development efforts.",
        keyResponsibilities: "Define product roadmap, Lead cross-functional teams.",
        requiredSkills: "Agile, Project Management, Communication",
        whoCanApply: "3+ years experience in product development",
        otherRequirements: "Knowledge of user research techniques",
        salary: 100000,
      },
      {
        jobname: "Marketing Specialist",
        jobDescription: "Develop marketing strategies.",
        keyResponsibilities: "Social media campaigns, Content creation.",
        requiredSkills: "SEO, SEM, Content Marketing",
        whoCanApply: "Marketing professionals",
        otherRequirements: "Excellent communication skills",
        salary: 60000,
      },
      {
        jobname: "HR Manager",
        jobDescription: "Manage recruitment and HR processes.",
        keyResponsibilities: "Recruit, onboard, and retain talent.",
        requiredSkills: "HR processes, Communication",
        whoCanApply: "HR professionals with 3+ years of experience",
        otherRequirements: "Experience with HR software",
        salary: 90000,
      },
    ];
    await recruiter.insertMany(recruiterData);
    console.log("Recruiter data inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seedRecruiters();
