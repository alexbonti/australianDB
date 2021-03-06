module.exports = function() {

    var mongo = require('mongodb');
    var nodemailer = require("nodemailer");
    var monk = require('monk');
    var db = monk('localhost:27017/australiaStudySolutionsDB');
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "australianssdb@gmail.com",
            pass: "australia2014"
        }
    });

    var mailOptions = {
        from: "AustralianSS_DB ✔ <australianssdb@gmail.com>", // sender address
        to: "alexbonti83@hotmail.com", // list of receivers
        subject: "Australian Study Solutions DB Reminder ✔", // Subject line
        text: "Hello world ✔", // plaintext body
        html: "<b>Hello world ✔</b>" // html body
    };


	

	
	return {

        startReminder:function(){
            var self=this;
            var todayDate='2014-04-26';

            /*var dt = new Date();
            var month = parseInt(dt.getUTCMonth())+1;
            month='0'+month;
            var day = dt.getUTCDate();
            var year = dt.getUTCFullYear();
            todayDate = year + "-" + month + "-" + day;
            */


            var id = setInterval(function() {
                var dt = new Date();
                var month = parseInt(dt.getUTCMonth()) + 1;
                month = '0' + month;
                var day = dt.getUTCDate();
                var year = dt.getUTCFullYear();
                var newdate = year + "-" + month + "-" + day;
                if (todayDate != newdate) {
                    //console.log('IS A NEW DAY');
                    todayDate = newdate;
                    self.startChecking();

                } else {
                    //console.log('is not a  new day');
                }

            },10000);
            //}, 30000000);

        },



        startChecking:function(){
            var self=this;
            console.log('CHECKING');

            var collection = db.get('students');
            var dt = new Date();
            var month = parseInt(dt.getUTCMonth())+1;
            month='0'+month;
            var day = dt.getUTCDate();
            var year = dt.getUTCFullYear();
            var newdate = year + "-" + month + "-" + day;
            console.log(newdate);

            collection.find({reminder:newdate},{},function(e,docs){
                //console.log(docs);
                //docs=JSON(docs);
                if(docs.length>0){
                    console.log('[REMINDER] - some reminders found');
                    self.sendEmail(docs);

                }else{
                    console.log('[REMINDER] - no reminders today');
                }




            });


        },

        sendEmail:function(content){
            var text='<b>The following have a reminder today : </b>';
            content.forEach(function(item){
                text=text+'<br> '+item.name+' '+item.lastName+'<br>Notes'+item.note+'<br>'
            });

            mailOptions.html=text;
            mailOptions.text='New Reminder';
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                }else{
                    console.log("Message sent: " + response.message);
                }

                // if you don't want to use this transport object anymore, uncomment following line
                //smtpTransport.close(); // shut down the connection pool, no more messages
            });

        }



	}






		
		



};
