
const { exec } = require('child_process');
const { stdout } = require('process');


const bearer_token = process.env.BEARER_TOKEN
console.log(bearer_token)
const getGithubEventList = async(req,res)=>{
    const {username} = req.body;
    console.log(username)
    if(!username){
        return res.status(400).json({message:"Please enter the username"})
    }
    exec(`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${bearer_token}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/users/${username}/events

        `,(error,stdout,stderr)=>{
            if(error){
                console.error(`error:${error}`)
                return res.status(500).json({ message: "Internal Server Error", error: error.message });
            }
            if (stderr) {
                console.warn(`Curl Warning: ${stderr}`);
            }
            try {
                const data = JSON.parse(stdout)
                if(data.message){
                    console.error(`GitHub API Error: ${data.message}`);
                    return res.status(400).json({ message: "GitHub API Error", error: data.message });
                }
                
                const assembledData = data.map(event => ({
                    eventId: event.id,
                    eventType: event.type,
                    user: event.actor.login,
                    repoUrl: event.repo.url,
                    commitMessage: event.payload?.commits?.[0]?.message || "No commits available"
                }));

                return res.status(200).json({message:"Corrected data received",assembledData})
                
            } catch (error) {
                console.error(`JSON Parse Error: ${error.message}`);
                return res.status(500).json({ message: "Error parsing response from GitHub", error: error.message });
                
            }
        })
    

}

module.exports = {
    getGithubEventList
}