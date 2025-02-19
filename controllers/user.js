const User = require("../models/user");


module.exports.renderSignupForm =(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup = async(req,res)=>{
   try{
    let {username ,email, password} = req.body ; 
    const newUser =  new User({email,username});
    const registeredUser =await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next();
        }
        req.flash("success","Welcome to WanderLust!");
        res.redirect("/listings"); 
    });
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
   }
};



module.exports.Login = async(req,res)=>{
    req.flash("success","Welcome to WanderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
   
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
} ; 

module.exports.logout= (req,res)=>{
    req.logout((err)=>{
        if(err){
        return next(err);
    }
    req.flash("success","logged out from WanderLust!!");
    res.redirect("/listings");

})};


module.exports.renderLogoutForm = (req,res)=>{
    res.render("users/signup.ejs");
} ; 

