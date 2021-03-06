const ContactSchema = require('./../models/contact')

const insertContact = async data => {
    return await ContactSchema.create(data)
}

const defineFilters = query => {
    if (Object.keys(query).length > 0) {
        let filters = new Array()

        Object.keys(query).map(key => filters.push({ [key]: new RegExp(query[key]) }))

        return { $or: filters, excluded: false }
    } else {
        return { excluded: false }
    }
}

const removeExcluded = body => {
    Object.keys(body).forEach(key => {
        if (key === 'excluded') {
            delete body['excluded']
        }
    })

    return body
}

const getContacts = async filters => {
    return await ContactSchema.find(filters)
}

const getContact = async id => {
    return await ContactSchema.findById(id)
}

const updateContact = async (id, content) => {
    return await ContactSchema.updateOne({ _id: id, excluded: false }, { $set: content })
}

const deleteContact = async id => {
    return await ContactSchema.updateOne({ _id: id, excluded: false }, { $set: { excluded: true } })
}

module.exports = {
    insertContact,
    defineFilters,
    getContacts,
    getContact,
    updateContact,
    deleteContact,
    removeExcluded
}