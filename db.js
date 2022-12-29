//server - mongo db integration

//1 import mongose
const mongoose=require('mongoose');

//2 state connection string via mongoose
mongoose.connect('mongodb://localhost:27017/bankapp',
{
    useNewUrlParser:true,//to avoid unwanted warning
})

//3 define bank app model
const User=mongoose.model('User',
//schema creation
{
account:Number,
username:String,
password:String,
balance:Number,
transaction:[],
});

//4 export collection
module.exports={
    User,
}