const JWT = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if(token == null) return res.sendStatus(401);
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.sendStatus(403)}
        else{
            //req.email = decoded.email;
           return res.json({decoded})
        }
        
    })
}

module.exports={
    verifyToken
}