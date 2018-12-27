var validator = {
	form: {
		username:{
			status: false,
			errorMessage: '6~18位英文字母, 数字或下划线, 必须以英文字母开头'
		},
		password:{
			status: false,
			errorMessage: "6~12位数字、大小写字母、中划线、下划线"
		},
		repassword:{
			status: false,
			errorMessage: "错误, 输入与密码不一样"
		},
		sid:{
			status: false,
			errorMessage: '8位数字, 不能以@开头'
		},
		phone:{
			status: false,
			errorMessage: '11位数字, 不能以@开头'
		},
		email:{
			status: false,
			errorMessage: '请输入合法邮箱'
		}
	},

	isUsernameValid: function(username)
	{
		return this.form.username.status = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(username);
	},

	isPasswordValid: function(password){
		return this.form.password.status = /^[a-zA-Z0-9_-]{6,12}$/.test(password);
	},

	isRepasswordValid: function(repassword){
		var password = document.getElementById("password");
		var repassword = document.getElementById("repassword");
		return this.form.repassword.status = (password.value == repassword.value);
	},

	isSidValid: function(sid)
	{
		return this.form.sid.status = /^[1-9]\d{7}$/.test(sid);
	},

	isPhoneValid: function(phone)
	{
		return this.form.phone.status = /^[1-9]\d{10}$/.test(phone);
	},

	isEmailValid: function(email)
	{
		return this.form.email.status = /^[a-zA-Z0-9_\-]+@[a-zA-Z0-9_\-]+\.+[a-zA-Z]{2,4}$/.test(email);
	},

	isFieldValid: function(fieldname, value)
	{
		var capture = fieldname[0].toUpperCase() + fieldname.slice(1, fieldname.length);
		return this["is" + capture + "Valid"](value);
	},

	isFormValid: function()
	{
		return this.form.username.status && this.form.password.status && this.form.repassword.status && this.form.sid.status && this.form.phone.status && this.form.email.status;
	},

	getErrorMessage: function(fieldname)
	{
		return this.form[fieldname].errorMessage;
	},

	isAttrValueUnique: function(registry, user, attr)
	{
		for(var key in registry)
		{
			if(registry.hasOwnProperty(key) && registry[key][attr] == user[attr])
				return false;
		}
		return true;
	}
}

if(typeof module == 'object')
{
	module.exports = validator
}