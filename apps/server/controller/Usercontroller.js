const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT = require('jsonwebtoken');


const createUser = async(req, res, next) =>{
    const {username, password, email} = req.body;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    var validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    try{
        if(!validate.test(email)){
            return res.status(401).json({ error: "invalid email address" })
        }
        const existedEmail = await prisma.user.findFirst({ where: {email: email}, select:{email:true} });
        if (existedEmail) {
            return res.status(401).json({ error: "Email is registered" })
        }
        const existUser = await prisma.user.findFirst( {where: {username: username}, select:{username:true} });
        if (existUser) {
            return res.status(401).json({ error: "User Exists" })
        }
        if (username === "" || password === "") {
            return res.status(401).json({ error: "Invalid" })
        }
        const user = await prisma.user.create({
            data:{
            username: username,
            password: encryptedPassword,
            email: email
        }
        })
        console.log()
        if (user)
            res.status(200).json({
            msg: 'ok',
            username: user.username,
            password: user.password,
            email: user.email,
            // token: generateToken(user.id)
        })
        
    }
    catch (error) {
        res.status(401).json('error')
    }
}

const getAllUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
    }
  };

const SearchAllUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
    }
  };

const getUserByID = async (req, res, next) => {
    const num = req.params.id
    const id = (parseInt(num))
    try {
        const user = await prisma.user.findMany({
            where: {
                iduser: id
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


const UserLogin = async (req, res, next) => {
    console.log(req.body)
    // const token = jwt.sign({ _id: user._id.toString() }, SECRET, { expiresIn: '1 day' })
    // console.log(token)
    const { email, password} = req.body;
    // User.findById()
    const user = await prisma.user.findFirst({ where: {email: email} });
    if (user === null) {
      res.status(401).json({ msg: "no user" })
      return;
    }
    // const token = JWT.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1 day' })
    const token = JWT.sign({user}, process.env.JWT_SECRET, { expiresIn: '1 days' })
    const refresh = JWT.sign({user}, process.env.JWT_SECRET, { expiresIn: "1 days" });

    await prisma.user.findUnique( 
        
       { where:{
            iduser: user.iduser
        }},
            
    );
    console.log(refresh)
    res.cookie('accessToken', refresh,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }); 

    const file = {
        iduser: user.iduser,
        email: user.email,
        username: user.username,
    }
    const hash = user.password
    const loginPass = bcrypt.compareSync(password, user.password);
    if (loginPass) {
      res.status(200).json({ msg: "Login route", token, user});
    } else {
      res.status(401).json({ msg: "Not ok" })
    }
}


const deleteUser = async(req, res) =>{
    const user = await prisma.user.findFirst({
        where: {
            iduser: parseInt(req.params.id)
        }
    });
    if(!user) return res.status(404).json({msg: "no user"});
    try {
        await prisma.user.delete({
            where:{
                iduser: parseInt(req.params.id)
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

const updateUser = async(req, res) =>{
    const user = await prisma.user.findFirst({
        where: {
            iduser: parseInt(req.params.id)
        }
    });
    if(!user) return res.status(404).json({msg: "no users"});
    const {username, email, password} = req.body;
    const Encypassword = await bcrypt.hash(password, saltRounds);
    try {
        await prisma.user.update(
        {
            where:{
                iduser: user.iduser
            },
            data:{
            username: username,
            email: email,
            password: Encypassword,
        }});
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

const Logout = async(req, res) => {

    //console.log(req,cookies.refreshToken)
    // res.clearCookie('refreshToken');
    // return res.sendStatus(200);

    const refreshToken = req.cookies.accessToken;
    console.log("Hi")
    console.log(refreshToken)
    res.clearCookie(refreshToken)
    console.log('ok')
    return res.sendStatus(200);
    //console.log(refreshToken)
    //if(refreshToken) return res.json({refreshToken});
    // const user = await User.findAll({
    //     where:{
    //         refresh_token: refreshToken
    //     }
    // });
    // console.log(user[0])
    // return res.status(200).json(user)
    // console.log(user)
    // if(!user[0]) return res.sendStatus(204);
    // const userId = user[0].id;
    // await User.update({refresh_token: null},{
    //     where:{
    //         id: userId
    //     }
    // });
    // res.clearCookie('refreshToken');
    // return res.sendStatus(200);
}

const SearchFriendProfile = async(req, res) =>{
    try {
        const user = await prisma.user.findMany({
            where: {
                username: req.params.id
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


module.exports = {
    createUser,
    getAllUsers,
    getUserByID,
    UserLogin,
    deleteUser,
    updateUser,
    Logout,
    SearchAllUsers,
    SearchFriendProfile
}