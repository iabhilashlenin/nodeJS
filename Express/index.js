import express from 'express'

const app = express();
const port = 4000;

app.use(express.json())

let userData =[]
let userId =1


app.post('/user',(req,res)=>{
    const {name,price} = req.body;
    const newUser = {id: userId++,name,price}
    userData.push(newUser)
    res.status(201).send(newUser)
})

app.get('/user',(req,res)=>{
   res.status(200).send(userData);
})
app.get('/user/:id',(req,res)=>{
    const user = userData.find(u => u.id === parseInt(req.params.id));
    if(!user){
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(user)
})

app.put('/user/:id',(req,res)=>{
    const user = userData.find(u => u.id === parseInt(req.params.id));
    if(!user){
        return res.status(404).send('User not found')
    }
    const {name,price} = req.body;
    user.name = name ;
    user.price = price;
    res.status(200).send(user)
})

app.delete('/user/:id',(req,res)=>{
    const index = userData.findIndex(u => u.id === parseInt(req.params.id));
    if(index == -1){
        return res.status(404).send("User not find");
    }
    userData.splice(index,1)
    return res.status(204).send('user deleted')
})

app.listen(port,()=>{
    console.log(`Server stated at port :${port}`)
})