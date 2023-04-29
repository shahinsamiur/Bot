const router = require("express").Router();
const fs = require("fs");
// const dd=require("./Bot/PDB/signal.json")


router.get("/", (req, res) => {
  var signal_Data = fs.readFileSync("./Bot/PDB/signal.json", "utf8");
  var signal = JSON.parse(signal_Data);
  console.log("request.got")
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(signal)
});



router.post("/signup");
router.post("/signin");
router.get("/Dashbord");
router.get("/profile");
router.post("/sendOTp");
router.post("/checkOTp");
router.post("/updatePassword");

module.exports = router;
