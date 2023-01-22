const jwt = require ('jsonwebtoken');
const {jwtSecret} = require ('../config/keys');


exports.authenticatateJWT = (req , res , next) =>{
        const token = req.cookies.token;
        console.log(token);

        if (!token) { 
            return res.status(401).json({
                errorMessage: 'No Token Authorization has been denied. ',

            });
        }
        
        try {
            const decoded  = jwt.verify(token, jwtSecret);

            req.user = decoded.user;


            next()
        } catch (err) {
            console.log('jwt error', err);
            res.status(401).json({
                errorMessage: 'Invalid Token!',
            })
            
        }
}