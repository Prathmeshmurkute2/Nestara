export const isLoggedIn = (req, res, next) =>{
    if(!req.user){
        return res.status(401).json({ message: "You must be logged in"})
    }
    next();
}