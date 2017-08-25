/**
 * User.js
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
    
  	login: {
  		type: 'string',
  		unique: true,
  		required: true,
  	},

    password: {
      type: 'string',
      required: true
    },

  	name: {
  		type: 'string',
  		required: true,
  		notNull: true,
  	},

    events_shared : {
      collection: 'event',
      via: 'guests'
    },

  	events: {
  		collection: 'event',
  		via: 'owner'
  	}
  }
};

