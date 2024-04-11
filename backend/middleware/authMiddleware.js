import jwt from 'jsonwebtoken'


const verifyToken = (req, res, next) => {
try {
    const token = req.headers.authorization.split(' ')[1]

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.userId = decoded.userId
    next()
} catch (err) {

    res.status(401)
    let message = 'Access restricted Please login!'

    if(err.name === 'TokenExpiredError') {
        message = 'Session expired, please login'
    }
   throw new Error(message)
}
}




export {verifyToken}


// fetch('blabla', {
//     method:'POST',
//     headers:{
//         'Authorization': 'Bearer kajdfkljakldjfakljf'
//     }
// })