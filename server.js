const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const validUrl = require('valid-url');
const crypto = require('crypto');
const sha1 = require('sha1');



const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));


//index Page
//http://localhost:3000

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


//post request
//http://localhost:3000/api/shorturl
//req.body.url:'https://www.google.com'-------------Valid URL
//req.body.url:'www.google.com'----------------------InValid URL

app.post('/api/shorturl', (req, res)=> {
  const url1=req.body.url;

  console.log(url1);
  if(!validUrl.isWebUri(url1)){
    console.log("Invalid URL");
    return res.json({error:'invalid url'});
     
    }

   //const urlCode=Math.floor(Math.random() * 10000);
   //const urlCode=crypto.createHash('sha256').update(url1, 'utf8').digest('hex');
    const urlCode=sha1(url1);

   console.log("url code is: " + urlCode);
   prisma.url.upsert({
    where: {
      'original_url' : url1 ,
    },
    update: {
      
    },
    create: {
      original_url: url1,
      short_url: urlCode,
    },
    })
   .then(response=>{
          res.json({original_url:response.original_url,
          short_url:response.short_url
          })
      })
      .catch(error=>console.log(error));
         
});



//get request
//http://localhost:3000/api/shorturl/:short_url
//http://localhost:3000/api/shorturl/73
//req.params.short_url:73-------------Valid short_url
app.get('/api/shorturl/:short_url', (req, res)=> {
paramUrl=req.params.short_url;

prisma.url.findUnique({
  where:{short_url:paramUrl}})
.then(response=>{
  if(response){
    res.redirect(response.original_url);
  }
  else{
    console.log("URL not Found");
    res.json({"error":"URL not found"});
    }

 }
)
.catch(error=>{
  res.json({"error":"URL not found"});
  console.log("Server Error")}
  );
  
});




//starting point
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

