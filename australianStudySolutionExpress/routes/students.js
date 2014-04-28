
/*
 * GET users listing.
 */
// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/australiaStudySolutionsDB');



exports.getStudentsById = function(req, res){
    console.log('calling by id');
    var id=parseInt(req.query.id);
    var collection = db.get('students');
    collection.find({id:id},{},function(e,docs){
       //console.log(docs);
        //docs=JSON(docs);
        res.send('Found some shit',docs);

    });

};

exports.updateStudent = function(req, res){

    console.log('calling by id');

    var collection = db.get('students');
    collection.update({_id:req.body.id}, req.body.item,
    function(){
        res.send('RECORD UPODATED');
    });


};

exports.deleteStudent = function(req, res){

    console.log('deleting by id');

    var collection = db.get('students');
    collection.remove({_id:req.body.id},
        function(){
            res.send('RECORD DELETED');
        });


};


exports.getStudentsByName = function(req, res){
    console.log('calling by name');
    var item=req.query.item
    console.log(item);
    var collection = db.get('students');
    collection.find({name: { $regex: ".*"+item+".*"}},{},function(e,docs){
        console.log(docs);
        //docs=JSON(docs);
        res.send('Found some shit',docs);

    });

};

exports.getStudentsByLastName = function(req, res){
    console.log('calling by name');
    var item=req.query.item;
    //console.log(name);
    var collection = db.get('students');
    collection.find({lastName: { $regex: ".*"+item+".*"}},{},function(e,docs){
        //console.log(docs);
        //docs=JSON(docs);
        res.send('Found some shit',docs);

    });

};

exports.getStudentsByPhone = function(req, res){
    console.log('calling by phone');
    var item=req.query.item;
    item=parseInt(item);
    console.log(item);
    var collection = db.get('students');
    collection.find({mobile:item},{},function(e,docs){
        //console.log(docs);
        //docs=JSON(docs);
        res.send('Found some shit',docs);

    });

};




exports.studentslist = function(req, res) {
        var collection = db.get('students');
        collection.find({},{},function(e,docs){
          //  console.log(docs);
          //  docs=JSON(docs);
            res.send('Found some shit',docs);

        });

};



exports.generalSearch = function(req, res) {
    var tag=req.query.tag;
    var collection = db.get('students');
    collection.find({ $text: { $search: tag } } ,{},function(e,docs){
        console.log(docs);
        //console.log(docs);
        //docs=JSON(docs);
        res.send('Found some shit',docs);

    });

};


exports.addStudent = function(req,res){

        // Get our form values. These rely on the "name" attributes
        var student={
            id:req.body.id,
            name:req.body.name,
            lastName:req.body.lastName,
            dob:req.body.dob,
            email:req.body.email,
            address:req.body.address,
            mobile:req.body.mobile,
            note:req.body.note,
            reminder:req.body.reminder,
            referralType:req.body.referralType,
            referralName:req.body.referralName,
            currentVisa:req.body.currentVisa,
            visaExpiry:req.body.visaExpiry,
            interested:req.body.interested



        }


        // Set our collection
        var collection = db.get('students');

        // Submit to the DB
        collection.insert(student, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.send('succefully added');
                //res.location("userlist");
                // And forward to success page
                //res.redirect("userlist");
            }
        });


}