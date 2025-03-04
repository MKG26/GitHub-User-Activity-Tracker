
const { exec } = require('child_process');

const bearer_token = process.env.BEARER_TOKEN
const getGithubEventList = async(req,res)=>{
    const username = req.body;
    if(!username){
        return res.status(400).json({message:"Please enter the username"})
    }

}