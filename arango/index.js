'use strict';
const createRouter = require('@arangodb/foxx/router');
const router = createRouter();

module.context.use(router);

router.get('/hi', function (req, res) {
  res.send('γεια');
})
.response(['text/plain'], 'Hi in greek')
.summary('Greek greeting')
.description('Prints the greek greeting.');

const joi = require('joi');
const db = require('@arangodb').db;
const aql = require('@arangodb').aql;
const errors = require('@arangodb').errors;

var objects = ["customers","bookings","payments","interests"]
//const customersCollection = db._collection(objects[0]);
//const bookingsCollection = db._collection(objects[1]);
//const paymentsCollection = db._collection(objects[2]);
var collections = [db._collection(objects[0]),db._collection(objects[1]),db._collection(objects[2]),db._collection(objects[3])]
const DOC_NOT_FOUND = errors.ERROR_ARANGO_DOCUMENT_NOT_FOUND.code;

//[0] CUSTOMERS
//const customersDocSchema = joi.object().keys({
//  email: joi.string().required()
//}).unknown(); // allow additional attributes
//const interestsDocSchema = joi.object().keys({
//  imagePath: joi.string().required()
//}).unknown(); // allow additional attributes


router.post('/'+objects[0], function (req, res) {
  const data = collections[0].save(req.body);
  res.send(data);
})
//.body(customersDocSchema,objects[0]+' to store in the collection.')
.body(joi.object(),objects[0]+' to store in the collection.')
.response(joi.object().required(),objects[0]+' stored in the collection.')
.summary('Store '+objects[0])
.description('Store '+objects[0]);

router.put('/'+objects[0]+"/:key", function (req, res) {
  const data = collections[0].replace(req.pathParams.key,req.body);
  res.send(data)
})
.body(joi.object(),objects[0]+' to update in the collection.')
.response(joi.object().required(),objects[0]+' updated in the collection.')
.summary('Updates '+objects[0])
.description('Updates '+objects[0]);

router.get('/'+objects[0], function (req, res) {
  //FETCH 2 DAYS
  //const in = new Date();
  //in.setDate(in.getDate()-1);
  //const out = new Date();
  //FILTER DATE_TIMESTAMP(n.datetime) > DATE_TIMESTAMP(${in}) AND DATE_TIMESTAMP(n.datetime) < DATE_TIMESTAMP(${in})
  //FILTER DATE_TIMESTAMP(n.datetime) > DATE_TIMESTAMP(DATE_SUBTRACT(DATE_NOW(),1,"day")) AND DATE_TIMESTAMP(n.datetime) < DATE_TIMESTAMP(DATE_NOW())
  const docs = db._query(aql`
    FOR n IN ${collections[0]}
    RETURN n
  `);
  res.send(docs);
})
//.body(joi.array(),'Customers to store in the collection.')
.response(joi.array(),objects[0]+' stored in the collection.')
.summary('List '+objects[0])
.description('List '+objects[0]);

//[1] BOOKINGS
router.post('/'+objects[1], function (req, res) {
  const data = collections[1].save(req.body);
  res.send(data);
})
//.body(interestsDocSchema,objects[1]+' to store in the collection.')
.body(joi.object(),objects[1]+' to store in the collection.')
.response(joi.object().required(),objects[1]+' stored in the collection.')
.summary('Store '+objects[1])
.description('Store '+objects[1]);

router.put('/'+objects[1]+"/:key", function (req, res) {
  const data = collections[1].replace(req.pathParams.key,req.body);
  res.send(data)
})
.body(joi.object(),objects[1]+' to update in the collection.')
//.pathParam('key', joi.string().required(), 'Key of the '+objects[1])
//.body(joi.array(),'Customers to store in the collection.')
.response(joi.object(),objects[1]+' stored in the collection.')
.summary('Store '+objects[1])
.description('Store '+objects[1]);

router.get('/'+objects[1], function (req, res) {
  //FETCH 2 DAYS
  //const in = new Date();
  //in.setDate(in.getDate()-1);
  //const out = new Date();
  //FILTER DATE_TIMESTAMP(n.datetime) > DATE_TIMESTAMP(${in}) AND DATE_TIMESTAMP(n.datetime) < DATE_TIMESTAMP(${in})
  //FILTER DATE_TIMESTAMP(n.datetime) > DATE_TIMESTAMP(DATE_SUBTRACT(DATE_NOW(),1,"day")) AND DATE_TIMESTAMP(n.datetime) < DATE_TIMESTAMP(DATE_NOW())
  const docs = db._query(aql`
    FOR n IN ${collections[1]}
    RETURN n
  `);
  res.send(docs);
})
//.body(joi.array(),'Customers to store in the collection.')
.response(joi.array(),objects[1]+' stored in the collection.')
.summary('List '+objects[1])
.description('List '+objects[1]);

//[2] PAYMENTS
router.post('/'+objects[2], function (req, res) {
  const data = collections[2].save(req.body);
  res.send(data);
})
//.body(interestsDocSchema,objects[1]+' to store in the collection.')
.body(joi.object(),objects[2]+' to store in the collection.')
.response(joi.object().required(),objects[2]+' stored in the collection.')
.summary('Store '+objects[2])
.description('Store '+objects[2]);

router.put('/'+objects[2]+"/:key", function (req, res) {
  const data = collections[2].replace(req.pathParams.key,req.body);
  res.send(data)
})
.body(joi.object(),objects[2]+' to update in the collection.')
//.body(joi.array(),'Customers to store in the collection.')
.response(joi.object().required(),objects[2]+' stored in the collection.')
.summary('Store '+objects[2])
.description('Store '+objects[2]);

router.get('/'+objects[2], function (req, res) {
  //FETCH 2 DAYS
  //const in = new Date();
  //in.setDate(in.getDate()-1);
  //const out = new Date();
  //FILTER DATE_TIMESTAMP(n.datetime) > DATE_TIMESTAMP(${in}) AND DATE_TIMESTAMP(n.datetime) < DATE_TIMESTAMP(${in})
  //FILTER DATE_TIMESTAMP(n.datetime) > DATE_TIMESTAMP(DATE_SUBTRACT(DATE_NOW(),1,"day")) AND DATE_TIMESTAMP(n.datetime) < DATE_TIMESTAMP(DATE_NOW())
  const docs = db._query(aql`
    FOR n IN ${collections[2]}
    RETURN n
  `);
  res.send(docs);
})
//.body(joi.array(),'Customers to store in the collection.')
.response(joi.array(),objects[2]+' stored in the collection.')
.summary('List '+objects[2])
.description('List '+objects[2]);

//[3] INTERESTS
router.post('/'+objects[3], function (req, res) {
  const data = collections[3].save(req.body);
  res.send(data);
})
//.body(interestsDocSchema,objects[3]+' to store in the collection.')
.body(joi.object(),objects[3]+' to store in the collection.')
.response(joi.object().required(),objects[3]+' stored in the collection.')
.summary('Store '+objects[3])
.description('Store '+objects[3]);

router.put('/'+objects[3]+"/:key", function (req, res) {
  const data = collections[3].replace(req.pathParams.key,req.body);
  res.send(data)
})
.body(joi.object(),objects[3]+' to update in the collection.')
//.pathParam('key', joi.string().required(), 'Key of the '+objects[3])
//.body(joi.array(),'Customers to store in the collection.')
.response(joi.object().required(),objects[3]+' stored in the collection.')
.summary('Store '+objects[3])
.description('Store '+objects[3]);

router.get('/'+objects[3], function (req, res) {
  //FETCH 2 DAYS
  //const in = new Date();
  //in.setDate(in.getDate()-1);
  //const out = new Date();
  //FILTER DATE_TIMESTAMP(n.datetime) > DATE_TIMESTAMP(${in}) AND DATE_TIMESTAMP(n.datetime) < DATE_TIMESTAMP(${in})
  //FILTER DATE_TIMESTAMP(n.datetime) > DATE_TIMESTAMP(DATE_SUBTRACT(DATE_NOW(),1,"day")) AND DATE_TIMESTAMP(n.datetime) < DATE_TIMESTAMP(DATE_NOW())
  const docs = db._query(aql`
    FOR n IN ${collections[3]}
    RETURN n
  `);
  res.send(docs);
})
//.body(joi.array(),'Customers to store in the collection.')
.response(joi.array(),objects[3]+' stored in the collection.')
.summary('List '+objects[3])
.description('List '+objects[3]);
