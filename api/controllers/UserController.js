	/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getUserInfo: function (req, res) {
		User.findOneById (req.session.userId).populate ('events').populate('events_shared').exec (function (error, user) {
			if (error) {
				return res.json ({error: error});
			}
			return res.json ({user: user});
		}) 
	},
	logout : function (req, res) {
		req.session.userId = false;
		return res.json();
	},
};

