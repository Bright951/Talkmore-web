const { StreamChat } = require('stream-chat');
const Client = StreamChat.getInstance('q9c62gfapz9y','32bbtzd9ryha5qgpghyhp47f85jfybfsb3byts7r8xw4daawbhrn2wt55bep5593');
const { v4: uuidv4 } = require('uuid');
// console.log(Client);

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

const CreateChannel= async (req, res)=>{
    const id = uuidv4();
    const uid = id.toString()
    const {name, LoggedInUserId, SelectedUserId, description, ChannelType} = req.body;
    console.log(req.body)

    try {
        const channel = Client.channel(ChannelType, uid, {
            name: name,
            members:[LoggedInUserId, SelectedUserId],
            description: description,
        })
        await channel.watch();
        res.status(200).send('channel created')
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    CreateUserToken,
    CreateChannel
}