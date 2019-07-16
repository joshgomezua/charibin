'use strict';
const Aggregate = require('./Aggregate');
const Models = require('../models');
const { User } = Models;
const EmailService = require('./EmailService');
const jwToken = require('../services/jwToken');
const faker = require('faker');


module.exports = {
  async login ({ email, password }) {

    const user = await User.findOne({ email });
    if (!user) throw { status: 404, message : 'USER.EMAIL.NOT_FOUND' };

    await User.comparePassword(password, user);

    return {
      token: jwToken.issue({
        id: user._id,
        role: user.role
      }),
      user: user
    };
  },
  async create (data) {
    const user = await User.findOne({ email: data.email});
    if(user) throw { status: 409, message: 'USER.EXIST' };
    data.password = faker.internet.password(6); // à remplacer par des vrais passwords dans add new users
    await User.create(data);
    await EmailService.AddingNotif(data.name, data.email, data.password); //  remplacer par data dans les paramètres et déstructurer la methode signature
    
  },
  async findOne (id) {
    const user = await User.findOne({ _id: id }) ;
    if(!user) throw { status: 404, message: 'USER.NOT.EXIST' };
    
    return user;
  },

  async getListOfUsers () {
    const users = await User.find({ isDeleted: {$all: false}}).select('name email role active ');

    return users;
  },

  async findCRM (page, limit) {
    return User.aggregate([
      {
        $facet: {
          results: [
            {
              $match: {
                isDeleted: false
              }
            },
            
           
            ...Aggregate.skipAndLimit(page, limit)
          ],
          status: Aggregate.getStatusWithSimpleMatch(
            {},
            page,
            limit
          )
        }
      }
    ]).then(Aggregate.parseResults);
  },
  
  async update (id, data) {
    let user = await User.findOne({ _id: id });
    if(!user) throw { status: 404, message: 'USER.NOT.EXIST' };

    if(data.email) {
      user = await User.findOne({ email: data.email});
      if(user) throw { status: 409, message: 'USER.EMAIL.EXIST' };
    }

    return User.findByIdAndUpdate(id, data, { new: true });
},
  
  async updateOne (id, data) {
  return User.findByIdAndUpdate(id, data, { new: true });
},

  async destroy (id) {
    const user = await User.findById(id);
    if(!user) throw { status: 404, message: 'USER.NOT.EXIST' };
      
    await User.findByIdAndDelete(id);
    
    return;
  },

};
