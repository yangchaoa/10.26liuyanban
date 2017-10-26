var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */



router.post('/aa', function(req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  fs.readFile('public/data.txt','utf-8',function(err,data){
    if(err){
        console.log(err)
    }else{
      var body = req.body;
      console.log(body);
      body.id = Date.now();
      var arr = JSON.parse(data);
      arr.push({title:req.body.title,name:req.body.name,id:req.body.id});
      fs.writeFile("public/data.txt",JSON.stringify(arr),function(err){
        fs.readFile('public/data.txt','utf-8',function(err,aa){
          var shu=JSON.parse(aa);
          console.log(aa)
          res.send({name:shu});
        })
      })
    }
    
    
  })
});

function list(fs,res,bol){
  var data = fs.readFileSync("public/data.txt","utf-8");
  data = JSON.parse(data);
  if(!bol) {
      res.send(data)
      return;
  }
  return data;
}

router.post('/list',function(req,res){
  list(fs,res)
});
router.post('/delete',function(req,res){
  var id = req.body.id;
  var data = fs.readFileSync('public/data.txt','utf-8');
  data = JSON.parse(data);
  for(var i in data){
      var d = data[i].id;
      if(d == id){
          data.splice(i,1);
          fs.writeFileSync("public/data.txt",JSON.stringify(data))
          list(fs,res)
      }
  }
  list(fs,res)
})

module.exports = router;
