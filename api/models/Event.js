/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	id: {
  		type: 'integer',
  		primaryKey: true,
  		autoIncrement: true
  	},

  	description: {
  		type: 'string',
  		required: true,
  		notNull: true
  	},

  	initTime: {
  		type: 'string',
  		required: true,
  		notNull: true
  	},

  	endTime: {
  		type: 'string',
  		required: true,
  		notNull: true
  	},

    guests : {
      collection : 'user',
      via : 'events_shared',
    },
  
  	owner: {
  		model: 'user',
  		required: true,
  		notNull: true
  	}
  }
};

