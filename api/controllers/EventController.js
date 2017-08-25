/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createEvent: function (req, res) {
		var initTime = req.param ('initTime');
		var endTime = req.param ('endTime');
		var description = req.param ('description');
		var iTime = new Date(initTime);
		var eTime = new Date(endTime);
		
		//verifica se a data final é depois da inicial
		if(iTime > eTime) {
			return res.json({error: 'Initial date is after the end date!'})
		}
		//verifica se o evento nao sobrescreve outro ja existente
		Event.find({owner: req.session.userId}).exec (function (error, events) {
			for(var i = 0; i < events.length; i++) {

				if(iTime >= new Date(events[i].initTime) && eTime <= new Date(events[i].endTime)) {
					return res.json ({error: 'This event overrides another event'})
				}
			}
			Event.create ({initTime: initTime, endTime: endTime, description: description, owner: req.session.userId}).exec (function (error, event) {
				if (error) {	
					return res.json ({error: 'Error creating event'});
				} 
				return res.json ({event: event})
			})
		})
	},
	deleteEvent: function (req, res) {
		var id = req.param ('id');
		Event.destroy ({id:id}).exec (function (erro, deletedEvent) {
			if (erro) {
				return res.json ({erro: erro});
			}
			return res.json ('Event Deleted!');
		});
	},

	loadEvent: function (req, res) {
		var id = req.param('id');
		Event.findOne ({id: id}).exec (function (error, foundEvent) {
			if (error) {
				return res.json ({error: 'The event was not found'});
			}
			else {
				console.log(foundEvent);
				return res.json ({event: foundEvent});
			}
		});
	},
	editEvent: function (req, res) {
		var initTime = req.param ('initTime')
		var endTime = req.param ('endTime');
		var description = req.param ('description');
		var id = req.param ('id');
		
		Event.update ({id: id}, {initTime: initTime, endTime: endTime, description: description}).exec (function (error, eventupdated) {
			if (error) {
				return res.json ({error: 'Failed to update event'});
			}
			else if (!eventupdated[0]) {
				return res.json ({erro: 'Failed to update event'});
			}
			else {
				return res.json('Event Updated!');
			}
		});
	},

	shareEvent: function (req, res) {
		var id_event = req.param ('id');
		var login_share = req.param ('login');

		User.findOne ({login: login_share}).exec (function (error, user) {
			if (error) {
				return res.json ({error: 'Failed to share event'});
			}
			else if (!user) {
				return res.json({error: 'User not found'})
			}
			else {
				if(login_share == user.owner) {
					res.json({error: 'You can not share the event with yourself'});
				}
				else {
					user.events_shared.add(id_event)
					user.save (function (error) {
						if(error) {
							return res.json({error: 'Event alredy shared with this user'});
						}
						return res.json ({sucess: 'Event shared!'});
					})
				}
			}
		});
	},

	deleteShareEvent: function (req, res) {
		var id_event_shared = req.param ('id');
		var user_id = req.session.userId;

		Event.findOne ({id: id_event_shared}).exec (function (error, event) {
			if (error) {
				return res.json ({error: error});
			}
			else {
				
				event.guests.remove(user_id);
				//commit transação
				event.save (function (error) {
						if(error) {
							return res.json({error: 'You already are not participating in this event.'});
						}
						return res.json ({sucess: 'You do not participate in this event anymore.'});
				})
			}
		});
	},
};

