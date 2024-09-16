const { StreamChat } = require('stream-chat');
const Client = StreamChat.getInstance('9p8295bc7zpv','8926gf82n3vp99egt2rtwshstyy5mvfk47urt3z7yq6buprb6bff7fhfxk8qtyk4');

const CreateUserToken= async(req, res)=>{
    const { id } = req.body;

    if(!id){
        return (
            res.status(400).send('User id is required')
        )
    }
    const token = Client.createToken(id);
   return res.json({ token });
}

module.exports={
    CreateUserToken
}