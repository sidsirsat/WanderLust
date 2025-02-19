const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const Listing = require('../models/listing.js'); 
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
 

router.route("/").get(wrapAsync(listingController.index)).post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));
    
// new Route
router.get("/new",isLoggedIn,listingController.new);

router.route("/:id").get( wrapAsync(listingController.show)).put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.update)).delete(isLoggedIn,isOwner,wrapAsync(listingController.delete)); 

//Edit Route 
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.edit));
module.exports = router ; 


//Show Route 
//  router.get("/:id",wrapAsync(async(req,res)=>{
//      let {id} = req.params ;
//      const listing =await Listing.findById(id).populate({path:"reviews", populate:{path:"author"}}).populate("owner");
//      if(!listing){
//         req.flash("error","Listing you requested for does not exist !");
//         res.render("/listings",{listing});  
//     }
//      res.render("listings/show.ejs",{listing});
//  }));
