const { fileLoader } = require("ejs");
const  Listing = require("../models/listing");


module.exports.index = async(req,res)=>{
    const allListing = await Listing.find({});
     res.render("listings/index.ejs",{allListing});    
 };

 module.exports.new =(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.show = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");  // Changed from render to redirect
    }

    res.render("listings/show", { listing });  // Removed .ejs extension
};
 
module.exports.createListing = async(req,res)=>{
    
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url,"..",filename);
    const newlisting =new Listing(req.body.listing);
        newlisting.owner = req.user._id ; 
        newlisting.image ={url,filename};
        console.log(url,filename);
        await newlisting.save();
        req.flash("success","new Listing Created !");
        res.redirect("/listings");
    // let {title,description,image,price,country,locatio} = req.body;
};

//render Edit form 
module.exports.edit = async(req,res)=>{
    let {id} = req.params ;
    const listing =await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist !");
        res.render("/listings",{listing});
    }
    
    let originalImageUrl = listing.image.url;
    originalImageUrl =  originalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};
//update Listing
module.exports.update =async(req,res)=>{
    let {id} = req.params ;
    
   let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing}); 
   if(typeof req.file != "undefined"){
   let url = req.file.path;
   let filename = req.file.filename;
   listing.image = {url,filename};
   await listing.save();
   }
   req.flash("success","Listing Edited !");
    res.redirect(`/listings/${id}`);
};

module.exports.delete=async(req,res)=>{
    let {id} = req.params ;
    console.log(id);
    let deletedlisting =  await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    // res.redirect("/listings");
    req.flash("success","Listing Deleted !");
};