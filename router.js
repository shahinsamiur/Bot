const router =require("express").Router()

router.get("/",(req,res)=>{
res.send("hello world")
})
router.post("/signup")
router.post("/signin")
router.get("/Dashbord")
router.get("/profile")
router.post("/sendOTp")
router.post("/checkOTp")
router.post("/updatePassword")







module.exports=router