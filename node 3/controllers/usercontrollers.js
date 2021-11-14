const User = require('../models/usermodel');
const  Ask = require('../models/QSchema');
const  Answer= require('../models/Answer');
const jwt = require('jsonwebtoken');

const createToken = id => jwt.sign({ id }, 'Ask',{ expiresIn: 3 * 24 * 60 * 60});

const getlogin = async (req,res) =>{
    if(req.method === 'GET'){
    res.render('login',{title: 'Log in'})
};
    if(req.method === 'POST'){
        const {email, password} = req.body;
         const user = await User.loginCheck (email,password);
         const token = createToken(user._id);
         res.cookie('jwt', token,{httponly:true , maxAge: 3 * 24 * 60 * 60 * 1000 })
         res.redirect('index');
    };
}

const getsignup = async (req,res) =>{
        if(req.method === 'GET'){
        res.render('signup', {pageTitle: 'Sign Up'});
    };

    if(req.method === 'POST'){
        const { userName, email, reEmail, password } = req.body;
         console.log(userName, email, reEmail, password)
        if(email !== reEmail) throw Error('Email is Not Matched');

        try{
            const user = await User.create({ userName, email, password })
            const token = createToken(user.id)
            res.cookie('jwt', token,{httponly:true , maxAge: 3 * 24 * 60 * 60 * 1000 })
            res.redirect('/')
        }
        catch(err){
            console.log(err) 
        }
        
    };

}


const getlogout =(req, res) =>{
    res.clearCookie('jwt');
    res.redirect('/')

}


const getHomePage = function(req,res){
   Ask.find()
    .then (QArr => {
    res.render('Homepage',{pageTitle:'Home', QArr})
    })
    .catch(err=>console.log(err))


}



const getnewQ = function(req,res){
  if(req.method === 'GET'){
     res.render('NewQ' , {errors:null })
  };
  if(req.method === 'POST'){
       console.log(req.body)
       const Question = new Ask(req.body)
       Question.save()
         .then(()=>{
            res.redirect('/')
          })
         .catch(err => {
           const errors = {};
          //  console.log(err.errors.title.properties.message)
            // console.log(Object.values(err.errors));
            Object.values(err.errors).forEach(data =>{
              errors[data.properties.path] = data.properties.message;
            })
               res.render('NewQ' , {errors})
          })
    }

}

/******************************************************** */

//answers

const getindex = function(req,res){
   Answer.find()
    .then (answerArr => {
    res.render('allQ&A',{pageTitle:'allQ&A',answerArr})
    })
    .catch(err=>console.log(err))

}

const getnewAnswer = function(req,res){
  if(req.method === 'GET'){
     res.render('NewAnswer' , {errors:null })
  };
  if(req.method === 'POST'){
       console.log(req.body)
       const answer = new Answer(req.body);
       answer.save()
         .then(()=>{
            res.redirect('/allQ&A')
          })
         .catch(err => {
           const errors = {};
            Object.values(err.errors).forEach(data =>{
              errors[data.properties.path] = data.properties.message;
            })
               res.render('NewAnswer' , {errors})
          })
    }

}

/**************************************************** */


//Ask

const ShowOne = (req, res)=>{
  console.log(req.params.id)
  
  Ask.findById(req.params.id)
    .then(Question =>{
        console.log("test Show one question", Question);
        res.render('ShowQ' ,{title:'Show Q' , Question })
      
    })
    .catch(err => console.log(err));
}




const updateArticle = (req , res) => {
     if (req.method === 'GET'){ 
      console.log(req.params.id)
       Ask.findById(req.params.id )
       .then(result => {
        res.render('updateForm',{title:'updat', result ,errors:null})
        })
        .catch(err => console.log(err));
       };

       if(req.method === 'POST'){
          console.log(req.body, req.params.id)
          Ask.findByIdAndUpdate(req.params.id , req.body ,{runValidators:true})
          .then(() => res.redirect('/') )
          
       .catch(err => {
                const errors = {};
                Object.values(err.errors).forEach( error => {
                    errors[error.properties.path] = error.properties.message;
                })
                Ask.findById(req.params.id)
                    .then( result => {
                        res.render('updateForm', {result, errors})
                    })
                    .catch(err => console.log(err))
            })
       }
       

}


const delArticle = (req, res) => {
  console.log(req.params.id)
   Ask.findOneAndDelete(req.params.id)
   .then(() => res.redirect('/'))
   .catch(err => console.log(err));

}

module.exports = {
    getlogin ,
    getsignup,
    getlogout,
    getHomePage, 
    getnewQ,
    ShowOne,
    updateArticle,
    delArticle,
    getindex,
    getnewAnswer,
}