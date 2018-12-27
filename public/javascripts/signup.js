$(function(){
    $('input:not(.button)').blur(function(){
        if(validator.isFieldValid(this.id, $(this).val())){
            $(this).parent().find('.error').text('').hide();
        }else{
            $(this).parent().find('.error').text(validator.form[this.id].errorMessage).show();
        }
    });

    $('input.button').click(function(){
        $('input:not(.button)').blur();
        if(!validator.isFormValid())return false;
    });
});

function allClear()
{
    var user = document.getElementById("username");
    user.value = "";
    var password = document.getElementById("password");
    password.value = "";
    var repassword = document.getElementById("repassword");
    repassword.value = "";
    var sid = document.getElementById("sid");
    sid.value = "";
    var phone = document.getElementById("phone");
    phone.value = "";
    var email = document.getElementById("email");
    email.value = "";
}
