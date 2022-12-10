const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const JWT = require('jsonwebtoken');

const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        console.log(refreshToken)
        if(!refreshToken) return res.sendStatus(401);
        const user = await prisma.user.findMany({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = JWT.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    refreshToken
}