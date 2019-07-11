'use strict';

const _ = require('lodash');
const async = require('async');
const Utilities = require('../services/Utilities');

class Validator {
  constructor (nameOfModel, data, action, permission) {
    global.log.debug(`Validation start:\n\tName of model: ${nameOfModel}\n\tAction: ${action}\n\tPermission: ${permission}\n`);
    this.action = action;

    if(global.patterns[nameOfModel] === undefined) {
      global.log.error(`Pattern '${nameOfModel}' was not found`);
      throw { status: 400, message : 'VALIDATION.PATTERN_INVALID%', args : [nameOfModel] };
    }

    this.pattern = global.patterns[nameOfModel];
    this.data = this._prepare(data, permission);
    return this;
  }

  valid (pattern = this.pattern, data = this.data) {
    return new Promise((resolve, reject) => {
      async.eachSeries(Object.keys(pattern), (key, next) => {
        global.log.debug(`valid start for: ${key}`);

        this._checkType(pattern[key], data[key], key)
          .then(() => next())
          .catch(next);
      }, err => {
        if(err)
          return reject({ status: 400, ...err });
        return resolve(data);
      });
    });
  }

  requiredParser (pattern = this.pattern, data = this.data) {
    return new Promise((resolve, reject) => {
      async.eachSeries(Object.keys(pattern), (key, next) => {
        global.log.debug(`requiredParser start for: ${key}`);

        if(pattern[key].type === 'object' && data[key] !== undefined){
          this._requiredNodeParser(pattern[key].attributes, data[key], key)
            .then(next)
            .catch(next);
        } else if (data[key] === undefined && pattern[key].required) {
          global.log.debug(`\trequired: ${key}`);

          if(pattern[key].default !== undefined) {
            if (typeof pattern[key].default === 'function') data[key] = pattern[key].default();
            else data[key] = pattern[key].default;
            next();
          } else {
            next({ message: 'VALIDATION.FIELD_REQUIRED%', args: [key] });
          }

        } else {
          if(data[key] === undefined && !pattern[key].required)
            delete pattern[key];


          next();
        }
      }, err => {
        if(err) {
          global.log.debug(err);
          return reject({ status: 400, ...err });
        }

        return resolve(this);
      });
    });
  }

  _requiredNodeParser (pattern, data, mainKey) {
    return new Promise((resolve, reject) => {
      async.eachSeries(Object.keys(pattern), (key, next) => {

        global.log.debug(`\t\t_requiredNodeParser start for: ${key}`);

        if (data[key] === undefined && pattern[key].required) {
          if(pattern[key].default !== undefined) data[key] = pattern[key].default;

          else next({ message : 'VALIDATION.FIELD_REQUIRED_NESTED%', args : [mainKey, key] });

          next();
        } else if(data[key] === undefined && !pattern[key].required) {
          delete this.pattern[mainKey].attributes[key];
          next();
        } else {
          next();
        }
      }, err => {
        if(err) return reject(err);

        return resolve();
      });
    });
  }

  _prepare (data, permission) {
    const listToOmit = [];
    const listToOmitForPattern = [];

    for (const attribute in this.pattern) {
      global.log.debug(`Has permission on ${attribute}: ${this.pattern[attribute].permission[this.action].includes(permission)}`);

      if (data[attribute] === null || data[attribute] === undefined || !this.pattern[attribute].permission[this.action].includes(permission)) {
        global.log.debug('\x1b[41m%s\x1b[0m ', attribute);
        listToOmit.push(attribute);

        if(this.action === 'update') listToOmitForPattern.push(attribute);
      }

      if (this.pattern[attribute].permission[this.action].includes(permission) && _.isPlainObject(data[attribute])) {
        this._prepareNode(data[attribute], listToOmit, listToOmitForPattern, this.pattern[attribute].attributes, attribute, permission);
      }

      if(typeof data[attribute] === 'string') data[attribute] = data[attribute].trim(); // remove whitespace
    }

    this.pattern = _.omit(this.pattern, listToOmitForPattern);

    global.log.debug('After _prepare');

    return _.omit(data, listToOmit);
  }

  _prepareNode (data, listToOmit, listToOmitForPattern, subPattern, attributeName, permission) {
    for (let subAttribute in subPattern) {
      global.log.debug(`\tHas permission on ${attributeName}.${subAttribute}: ${subPattern[subAttribute].permission[this.action].includes(permission)}`);

      if(data[subAttribute] === null || data[subAttribute] === undefined || !subPattern[subAttribute].permission[this.action].includes(permission)) {
        global.log.debug('\t\x1b[41m%s\x1b[0m ', subAttribute);

        listToOmit.push(`${attributeName}.${subAttribute}`);

        if(this.action === 'update') listToOmitForPattern.push(`${attributeName}.attributes.${subAttribute}`);
      }
    }
  }

  _checkType (pattern, target, key) {
    return new Promise((resolve, reject) => {
      switch (pattern.type) {
        case 'boolean':
        case 'string':
          if(pattern.type !== typeof target) return reject({
            message : 'VALIDATION.EXPECT_TYPE_FAIL%',
            args : [pattern.type, key, typeof target],
          });
          if(pattern.hasOwnProperty('minLength') && pattern.minLength > target.length) return reject({
            message : 'VALIDATION.EXPECT_MINLENGTH_FAIL%',
            args : [pattern.minLength, key, target.length],
          });
          if(pattern.hasOwnProperty('maxLength') && pattern.maxLength < target.length) return reject({
            message : 'VALIDATION.EXPECT_MAXLENGTH_FAIL%',
            args : [pattern.maxLength, key, target.length],
          });
          if(pattern.hasOwnProperty('pattern') && !pattern.pattern.test(target)) return reject({
            message : 'VALIDATION.EXPECT_PATTERN_MATCH_FAIL%',
            args : [key, pattern.pattern],
          });

          return resolve(target);

        case 'url':
          if('string' !== typeof target) return reject({
            message : 'VALIDATION.EXPECT_TYPE_FAIL%',
            args : [pattern.type, key, typeof target],
          });
          if(pattern.hasOwnProperty('minLength') && pattern.minLength > target.length) return reject({
            message : 'VALIDATION.EXPECT_MINLENGTH_FAIL%',
            args : [pattern.minLength, key, target.length],
          });
          if(pattern.hasOwnProperty('maxLength') && pattern.maxLength < target.length) return reject({
            message : 'VALIDATION.EXPECT_MAXLENGTH_FAIL%',
            args : [pattern.maxLength, key, target.length],
          });
          if(pattern.hasOwnProperty('pattern') && !pattern.pattern.test(target)) return reject({
            message : 'VALIDATION.EXPECT_PATTERN_MATCH_FAIL%',
            args : [key, pattern.pattern],
          });

          return resolve(Utilities.forceToHttp(target));

        case 'id':
          if('string' !== typeof target) return reject({
            message : 'VALIDATION.EXPECT_TYPE_FAIL%',
            args : [pattern.type, key, typeof target],
          });
          if(!Utilities.isMongoId(target)) return reject({
            message : 'VALIDATION.NOT_MONGOID%',
            args : [key],
          });

          return resolve(target);

        case 'number':
          if(!_.isNumber(+target) || !_.isFinite(+target)) return reject({
            message : 'VALIDATION.EXPECT_NUMBER_FAIL%',
            args : [key, target],
          });

          if(pattern.hasOwnProperty('min') && pattern.min > target) return reject({
            message : 'VALIDATION.EXPECT_MIN_FAIL%',
            args : [pattern.min, key, target],
          });

          if(pattern.hasOwnProperty('max') && pattern.max < target) return reject({
            message : 'VALIDATION.EXPECT_MAX_FAIL%',
            args : [pattern.max, key, target],
          });

          return  resolve();

        case 'object':
          if(_.isPlainObject(target)) return this._checkNodeType(pattern.attributes, target).then(resolve).catch(reject);

          return reject({
            message : 'VALIDATION.EXPECT_TYPE_FAIL%',
            args : ['object', key, typeof target],
          });

        case 'array':
          if(pattern.hasOwnProperty('minLen') && pattern.minLen > target.length) return reject({
            message : 'VALIDATION.EXPECT_ARRAY_LENGTH%',
            args : [key, 'least', pattern.minLen, target.length],
          });
          if(pattern.hasOwnProperty('maxLen') && pattern.maxLen < target.length) return reject({
            message : 'VALIDATION.EXPECT_ARRAY_LENGTH%',
            args : [key, 'most', pattern.maxLen, target.length],
          });
          if(!Array.isArray(target)) return reject({
            message : 'VALIDATION.EXPECT_TYPE_FAIL%',
            args : ['array', key, typeof target],
          });

          return this._checkSubType(pattern, target, key)
            .then(resolve)
            .catch(reject);

        case 'password':
          if('string' !== typeof target)
            return reject({
              message : 'VALIDATION.EXPECT_TYPE_FAIL%',
              args : [pattern.type, key, typeof target],
            });
          if(pattern.hasOwnProperty('pattern') && !pattern.pattern.test(target))
            return reject({ message : 'VALIDATION.EXPECT_PATTERN_MATCH_FAIL%', args : ['password', pattern.pattern] });

          return resolve(target);

        case 'email':
          if(pattern.hasOwnProperty('minLength') && pattern.minLength > target.length) return reject({
            message : 'VALIDATION.EXPECT_MINLENGTH_FAIL%',
            args : [pattern.minLength, key, target.length],
          });
          if(pattern.hasOwnProperty('maxLength') && pattern.maxLength < target.length) return reject({
            message : 'VALIDATION.EXPECT_MAXLENGTH_FAIL%',
            args : [pattern.maxLength, key, target.length],
          });
          if(!pattern.pattern.test(target)) return reject({
            message : 'VALIDATION.EXPECT_PATTERN_MATCH_FAIL%',
            args : ['emial', pattern.pattern],
          });

          return resolve();

        case 'timestamp':
          if (!_.isNumber(+target) || !_.isFinite(+target)) return reject({
            message : 'VALIDATION.EXPECT_NUMBER_FAIL%',
            args : [key, typeof target],
          });
          const date = new Date(+target);
          if (date.toString() === 'Invalid Date') return reject({
            message : 'VALIDATION.EXPECT_DATE_FAIL%',
            args : [date],
          });
          return resolve(target);

        case 'buffer':
          if (!Buffer.isBuffer(target)) return reject({
            message : 'VALIDATION.EXPECT_TYPE_FAIL%',
            args : ['buffer', key, `Is buffer: ${Buffer.isBuffer(target)}`]
          });

          return resolve(target);

        default:
          global.log.error(`Can\'t recongize type: ${pattern.type}`);
          throw reject({
            message : 'VALIDATION.TYPE_NOT_RECOGNIZED%',
            args : [pattern.type],
          });
      }
    });
  }

  _checkNodeType (subPatterns, data) {
    return new Promise((resolve, reject) => {
      async.eachSeries(Object.keys(subPatterns), (key, next) => {
        global.log.debug(`\t_checkNodeType start for: ${key}`);

        this._checkType(subPatterns[key], data[key], key)
          .then(() => next())
          .catch(next);
      }, err => {
        if(err) {
          return reject(err);
        }

        return resolve();
      });
    });
  }

  async _checkSubType (pattern, data, key) {
    switch (pattern.subType) {
      case 'number':
        for (let item of data) {
          if(!_.isNumber(item) || !_.isFinite(item)) throw {
            message : 'VALIDATION.EXPECT_NUMBER_FAIL%',
            args : [key, typeof item],
          };

          if(pattern.hasOwnProperty('min') && pattern.min > item) throw {
            message : 'VALIDATION.EXPECT_MIN_FAIL%',
            args : [pattern.min, key, item],
          };

          if(pattern.hasOwnProperty('max') && pattern.max < item) throw {
            message : 'VALIDATION.EXPECT_MAX_FAIL%',
            args : [pattern.max, key, item],
          };
        }

        return;

      case 'string':
        for (let item of data) {
          if (typeof item !== 'string') throw {
            message : 'VALIDATION.EXPECT_TYPE_FAIL%',
            args : [pattern.subType, key, typeof target],
          };

          if (pattern.pattern && !pattern.pattern.test(item))
            throw {
              message : 'VALIDATION.EXPECT_PATTERN_MATCH_FAIL%',
              args : [key, pattern.pattern],
            };

          if (pattern.maxLength && item.length > pattern.maxLength)
            throw {
              message : 'VALIDATION.EXPECT_MAXLENGTH_FAIL%',
              args : [pattern.maxLength, key, item.length],
            };
        }
        return data;

      case 'object':
        for (let item of data) {
          const patternSeed = { ...pattern.attributes };
          item = this._prepArrayNode(item, patternSeed);
          await this.requiredParser(patternSeed, item);
          await this.valid(patternSeed, item, 'create');
        }

        return data;

      case 'id':
        for (const item of data) {
          if('string' !== typeof item) throw {
            message : 'VALIDATION.EXPECT_TYPE_FAIL%',
            args : [pattern.type, key, typeof item],
          };
          if(!Utilities.isMongoId(item)) throw {
            message : 'VALIDATION.NOT_MONGOID%',
            args : [key],
          };
        }
        return data;

      default:
        global.log.error('_checkSubType: can\'t recognize subType');
        throw {
          message : 'VALIDATION.TYPE_NOT_RECOGNIZED',
          args : [pattern.subType],
        };
    }
  }

  _prepArrayNode (item, pattern) {
    for (let pat in pattern) {
      if (item[pat] || !pattern[pat].required || (pattern[pat].required && !pattern[pat].default)) continue;
      const def = pattern[pat].default;
      item[pat] = typeof def === 'function' ? def() : def;
    }
    return item;
  }
}

module.exports = {
  onCreate (data, nameOfModel, permission) {
    return new Promise((resolve, reject) => {
      const validator = new Validator(nameOfModel, data, 'create', permission);
      validator.requiredParser()
        .then(() => {
          return validator.valid();
        })
        .then(resolve)
        .catch(reject);

    });
  },

  onUpdate (data, nameOfModel, permission) {
    return new Promise((resolve, reject) => {
      new Validator(nameOfModel, data, 'update', permission)
        .valid()
        .then(resolve)
        .catch(reject);
    });
  },

  filter (data, nameOfModel, token, { pattern: patternKey, token: tokenKey } = {}) {
    if(!data) return;
    const permission = token.role;
    return new Promise((resolve) => {
      const pattern = global.patterns[nameOfModel];
      const listToOmit = [];
      for (const prop in pattern) {
        if(!pattern[prop].permission.find.includes(permission)) {
          listToOmit.push(prop);
          continue;
        }

        if(pattern[prop].type === 'object') {

          let nestedPropValue;
          for (const nestedProp in pattern[prop].attributes) {
            nestedPropValue = pattern[prop].attributes[nestedProp];
            if(!nestedPropValue.permission.find.includes(permission))
              listToOmit.push(`${prop}.${nestedProp}`);
          }

        }
      }
      if (data && typeof data === 'object' && pattern)
        listToOmit.push(...Object.keys(data).filter((key) => !(key in pattern)));

      if (`${patternKey && getPathValue(data, patternKey)}` !== `${token[tokenKey]}`) {
        listToOmit.push(...pattern[Symbol.for('omitForeign')] || []);
      }

      if(Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          data[i] = deleteKeys(data[i].toObject ? data[i].toObject() : data[i], listToOmit);
        }
        return resolve(data);
      } else {
        data = data.toObject ? data.toObject() : data;
        return resolve(deleteKeys(data, listToOmit));
      }

      function getPathValue (data, path) {
        const parts = path.split('.').filter((chars) => chars.length);
        return parts.reduce((acc, val) => {
          return acc && acc[val];
        }, { ...data });
      }

      function deleteKeys (obj, list) {
        if (!obj) return obj;
        for (const path of list) {
          const keys = path.split('.');
          if (keys.length === 1) delete obj[keys[0]];
          else if (obj[keys[0]]) obj[keys[0]] = deleteKeys(obj[keys[0]], keys.slice(1));
        }
        return obj;
      }
    });
  }
};
