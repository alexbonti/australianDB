/**
 * Created by alessiobonti on 9/04/2014.
 */

var currentState={
    filter:'name',
    id:null
};

//var BASEURL='alexmac.au.ibm.com';
var baseurl='/students/'


var databaseCall=function(){

    var query=$('#searchBox').val();


    $.get( baseurl+currentState.filter, { item: query },function(data){
        if(data.length==0){

            $('#messageDiv').html('No record found');
            $('#resultsList').empty();
            var liItem=$('<li><a href="#">No results found</a></li>');
            $('#resultsList').append(liItem);
        }else{
            $('#resultsList').empty();

            data.forEach(function(item){

                addItemToList(item);
            })

        }



    });

};
var addUser=function(){
    if(currentState.id=='new'){
        alert('You are already editing one, complete the current one first');
    }else{
        cleanResults();
        $('#messageDiv').html('Adding New Record');
        currentState.id='new';
        enableEditing();

    }


}

var deleteUser=function(){
    //alert('deleting')
    var payload={
        id:currentState.id

    }

    $.ajax({
        url: baseurl,
        type: 'DELETE',
        data: payload,
        success: function() {
            $('#messageDiv').html('Record Deleted');

        }
    });
    $('#myDeleteModal').modal('hide');
    cleanResults();
    databaseCall();
    currentState.id=null;
    disableEditing();

}

var saveUser=function(){
    _saveExistingUser=function(item) {
      //  alert('saving existing');
        var payload={
            id:currentState.id,
            item:item
        }


        console.log(item);
        $.ajax({
            url: baseurl,
            type: 'PUT',
            data: payload,
            success: function(data) {
                $('#messageDiv').html('Record Updated');
            }
        });



    }
    _saveNewUser=function(item){
       // alert('saving new');
        $.post(baseurl, item, function (data) {
            $('#messageDiv').html('New Record Added');
            cleanResults();
            currentState.id=null;
        });

    }

    if(currentState.id==null){
        alert('If you want to add a new student, please click add first');
    }else{
        var currentStudent={
            name:($('#nameInput').val()).toLowerCase(),
            lastName:($('#lastNameInput').val()).toLowerCase(),
            dob:$('#dob').val(),
            mobile:$('#telephone').val(),
            email:$('#exampleInputEmail1').val(),
            address:$('#addressInput').val(),
            referralType:$('#referralTypeInput').val(),
            referralName:$('#referralNameInput').val(),
            interested:$('#interestedInput').val(),
            visaExpiry:$('#expVisa').val(),
            reminder:$('#reminderDate').val(),
            currentVisa:$('#currentVisaSelect').val(),
            note:$('#notes').val()


        };
        console.log('current',currentStudent);

        if(currentState.id=='new'){
            _saveNewUser(currentStudent);
        }else{
            _saveExistingUser(currentStudent);
        }
        $('#mySaveModal').modal('hide');
        databaseCall();
        disableEditing();

    }

}

var openSaveModal=function(){
    if(currentState.id!=null){
        $('#mySaveModal').modal();
    }else{
        alert('there is nothing to save!');
    }

}

var openDeleteModal=function(){
    if(currentState.id!=null){
        $('#myDeleteModal').modal();
    }else{
        alert('there is nothing to Delete!');
    }

}


var addItemToList=function(item){
    //$('#resultsList').empty();
    var liItem=$('<li id='+item._id+'><a href="#">'+item.name+' '+item.lastName+'</a></li>')
    $.data(liItem,'item',item);
    //liItem.data({'data':item});
    $('#resultsList').append(liItem);
    liItem.bind('click',function(){
       // alert(this.id);
        console.log($.data(this,item));
        displayResult(item);
    });



}

var displayResult=function(item){
    currentState.id=item._id;
    $('#nameInput').val(item.name);
    $('#lastNameInput').val(item.lastName);
    $('#dob').val(item.dob);
    $('#telephone').val(item.mobile);
    $('#exampleInputEmail1').val(item.email);
    $('#addressInput').val(item.address);
    $('#referralTypeInput').val(item.referralType);
    $('#referralNameInput').val(item.referralName);
    $('#interestedInput').val(item.interested);
    $('#expVisa').val(item.visaExpiry);
    $('#reminderDate').val(item.reminder);
    $('#currentVisaSelect').val(item.currentVisa);
    $('#notes').val(item.note);





}


var disableEditing=function(){
    $('#resultsDiv :input').attr('readonly', true);

}
var enableEditing=function(){
    if(currentState.id!=null){
        $('#resultsDiv :input').attr('readonly', false);

    }else{
        alert('Choose a record or create a new one first');
    }



}

var cleanResults=function(){
    $('#nameInput').val('');
    $('#lastNameInput').val('');
    $('#dob').val('');

    $('#telephone').val('');
    $('#exampleInputEmail1').val('');
    $('#addressInput').val('');
    $('#referralTypeInput').val('');
    $('#referralNameInput').val('');
    $('#interestedInput').val('');
    $('#expVisa').val('');
    $('#reminderDate').val('');
    $('#currentVisaSelect').val('');


    $('#notes').val('');

}

var chooseFilter=function(filter){
    currentState.filter=filter;
    //alert(filter);
}




$( document ).ready(function() {
    disableEditing();

});



