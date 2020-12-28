// continued
'use strict';
const db = require('@arangodb').db;
const customersCollection = 'customers';
const bookingsCollection = 'bookings';

if (!db._collection(customersCollection)) {
  db._createDocumentCollection(customersCollection);
}

if (!db._collection(bookingsCollection)) {
  db._createDocumentCollection(bookingsCollection);
}
