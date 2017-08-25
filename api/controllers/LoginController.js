/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function (req, res){
		var userName = req.param ("login");
		var userPassword = req.param ("password");
		console.log (userName + ' ' + userPassword);
		User.findOneByLogin (userName, function (error, user){
			if (error){
				return res.json ({error: 'error login'});
			}
			else if (!user){
				return res.json ({error: 'user not found'});
			}
			else if (user.password != userPassword){
				//console.log (user);
				return res.json ({error: 'wrong password'});
			}
			else {
				req.session.userId = user.id;
				console.log (user);
				return res.json ({name: user.name});
			} 
				
		})
	},

	register: function(req, res) {
		var userLogin = req.param ("login");
		var userPassword = req.param ("password");
		var userName = req.param ("name");
		User.create ({name: userName, login: userLogin, password: userPassword}).exec (function callback (error, user){
			if (error) {	
				return res.json ({error: 'Error creating user ' + error});
			} 
			console.log (userName + ' ' + userPassword)
			return res.json (user)
		});
	},

};