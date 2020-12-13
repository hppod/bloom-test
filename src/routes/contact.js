const express = require('express')
const router = express.Router()
const Contact = require('./../controllers/contact')

router.post('/contact', Contact.createContact)
router.get('/contacts', Contact.getContacts)
router.get('/contact/:id', Contact.getContact)

module.exports = router