function wrongSignin(){
	var myvalue = document.getElementById("wrongSignin");
	myvalue.innerHTML="错误的用户名或密码 !";
}


function mySignup(){
	window.location.href = "http://localhost:8000/regist";
}