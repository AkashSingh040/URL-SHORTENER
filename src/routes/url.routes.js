// it's job is to decide when an HTTP request comes which controller should handle it

const express=require("express");

const {
    createShortUrl,redirectToOriginalUrl
}=require("../controllers/url.controller");

const router=express.Router();//lets us create a modular group of routes.

router.post('/api/v1/urls',createShortUrl);
router.get('/:shortCode',redirectToOriginalUrl);

module.exports=router;