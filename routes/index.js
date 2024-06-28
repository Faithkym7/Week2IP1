const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let upload = require('./upload');
const url = require('url')
let Image = require('../models/images');

//test data
const photos = [
    { id: 1, title: 'Photo 1' },
    { id: 2, title: 'Photo 2' },
    { id: 3, title: 'Photo 3' }
];

router.get('/', (req,res)=>{
    
    //test
    res.status(200).json(photos);
    //
    Image.find({}, function(err, images){
        // console.log(images)
        if (err) console.log(err);
        res.render('index',{images:images, msg: req.query.msg })
    })
})

router.post('/upload', (req, res)=>{
    upload(req,res, (err)=>{
        if (err){
            res.redirect(`/?msg=${err}`);
        }else{
            console.log(req.file);
            // res.send("test");
            if (req.file == undefined){
                res.redirect('/?msg=Error: No file selcted!');
            }else{
                // const imageObj = {
                //     id: uuid.v4(),
                //     name: req.file.filename,
                //     path: 'images/' + req.file.filename
                // }
                // db.push(imageObj);
                // console.log(db);

                // create new image
                let newImage = new Image({
                    name: req.file.filename,
                    size: req.file.size,
                    path: 'images/' + req.file.filename
                })

                // save the uploaded image to the database
                newImage.save()

                
                res.redirect('/?msg=File uploaded successfully');
            }
        }
    })
})

module.exports = router;