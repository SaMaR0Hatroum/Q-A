const express = require('express');
const controllers = require('../controllers/usercontrollers');
const {checkUser} = require('../middelWares/authMiddeleWare')

const router = express.Router();

router.get('/',controllers.getHomePage);
router.get('/allQ&A',controllers.getindex);
router.all('/NewQ',controllers.getnewQ);
router.all('/NewAnswer',controllers.getnewAnswer);
router.get('/showarticle/:id',controllers.ShowOne);
// router.post('/showarticle/:id',controllers. Addanswer);
router.all('/edit/:id',controllers.updateArticle);
router.get('/Delete/:id',controllers.delArticle);
router.all('/login',checkUser,controllers.getlogin);
router.all('/signup',checkUser,controllers.getsignup);
router.get('/logout',checkUser,controllers.getlogout);
module.exports = router;