const authorize = (user_roles) => {
    
    return (req, res, next) => {
        const userRole = req.body.userrole;
        if (user_roles.includes(userRole)) {
            next();
        } else {
            return res.status(401).json({ message: "User is not authorised to this action" });
        };
    };
};

module.exports = authorize;