'use strict';
const mailer = require('nodemailer');
const redis = require('redis');
const _ = require('lodash');
const Mailgun = require('mailgun-js');
const mailTemplate = require('../../config/templates/Email');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const client = redis.createClient({ host: global.config.connection.redis.host });
let transporter;

client.on('error', function (err) {
  throw new Error(err);
});

if (process.env.NODE_ENV === 'development') {
  transporter = mailer.createTransport(global.config.connection.mailDevelopment);
} else {
  transporter = new Mailgun({ apiKey: global.config.connection.mailgun.key, domain: global.config.connection.mailgun.domain });
}

class Email {
  constructor (emails) {
    this.options = {
      from: 'red-key@hotmail.com'
    };

    if (_.isArray(emails)) {
      this.options.bcc = emails;
      this.options.to = emails[0];
    } else {
      this.options.to = emails;
    }
    return this;
  }

  __send () {
    return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV === 'development') {
        transporter.sendMail(this.options, err => {
          if (err) return reject(err);
          return resolve();
        });
      } else {
        transporter.messages().send(this.options, err => {
          if (err) return reject(err);
          return resolve();
        });
      }
    });
  }
  async AddingNotif(name, password){

    const context = `username: ${entities.encode(name)}<br />
                     password: ${entities.encode(password)}<br />
    `;
    this.options.subject = `Welcome to Sponteous: ${entities.encode(name)}`;
    this.options.text = `${context}`;
    this.options.html = mailTemplate(context);

    return this.__send();


  }
  async clientOrder (order, invoiceLink) {
    const hours = {
      arrival: {
        start: ('0' + new Date(order.date.arrival.start).getHours()).slice(-2),
        end: ('0' + new Date(order.date.arrival.end).getHours()).slice(-2),
      },
      departure: {
        start: ('0' + new Date(order.date.departure.start).getHours()).slice(-2),
        end: ('0' + new Date(order.date.departure.end).getHours()).slice(-2),
      }
    };
    const context = `
    Hey ${order.buyer.name.split(' ')[0]} <br /><br />
    Thanks for your purchase.<br />
    We are now bookign your tickets for ${order.finalDestination}.<br />
    <strong>You will receive them within 24 hours</strong>
    <br /><br />
    Departure : ${new Date(order.date.arrival.start).toDateString()}. Between ${hours.arrival.start} and ${hours.arrival.end}<br />
    Return : ${new Date(order.date.departure.start).toDateString()}. Between ${hours.departure.start} and ${hours.departure.end}<br />
    (Your tickets will show the exact time of departure / return)
    <br /><br />
    Here is your invoice: <a style="color:#b7b7e3;text-decoration:none" href="${invoiceLink}">Invoice</a>
    `;
    this.options.subject = `Sponteous: Enjoy your trip to ${order.finalDestination}`;
    this.options.text = `${context}`;
    this.options.html = mailTemplate(context);

    return this.__send();
  }

  async adminOrder (order) {
    const timeSelectedText = order.arrivalTimePrice || order.departureTimePrice ? '(include time select price)' : '';
    const context = `
    Client name: ${entities.encode(order.buyer.name)} <br />
    Client email: ${entities.encode(order.buyer.email)} <br />
    Date: ${new Date(order.date.start)} to ${new Date(order.date.end)} <br />
    Destination: ${order.finalDestination} <br />
    Quantity: ${order.quantity} <br />
    Tickets price: £${order.ticketPrice} ${timeSelectedText}<br />
    Deselection price: £${order.deselectionPrice} <br />
    Total price: £${order.totalPrice} <br />
    `;
    this.options.subject = `New sale: ${entities.encode(order.buyer.name)} bougth a trip`;
    this.options.text = `${context}`;
    this.options.html = mailTemplate(context);

    return this.__send();
  }

  async support ({ firstName, lastName, email, phone, message }) {
    const context = `${entities.encode(message)} <br /><br />
    -------------------------------------------- <br />
    ${entities.encode(firstName)} ${entities.encode(lastName)}<br />
    <a style="text-decoration:none;color:#fefefe" href="mailto:${email}">${email}</a><br />
    ${phone}
    `;
    this.options.subject = `Support: ${entities.encode(firstName)} ${entities.encode(lastName)}`;
    this.options.text = `${context}`;
    this.options.html = mailTemplate(context);

    return this.__send();
  }

}

module.exports = {
  async clientOrder (order, invoiceLink) {
    return new Email(order.buyer.email).clientOrder(order, invoiceLink);
  },
  async adminOrder (admin, order) {
    return new Email(admin.email).adminOrder(order);
  },
  async AddingNotif(name, email, password){ // remplacer les parametres par {name, email, password} destructuration
    return new Email(email).AddingNotif(name, password);
  },
  async support (data) {
    return new Email(global.config.custom.supportEmail).support(data);
  }
};
