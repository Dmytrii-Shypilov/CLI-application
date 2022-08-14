const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve( "db/contacts.json")

const listContacts = async () => {
    const result = await fs.readFile(contactsPath)
    return JSON.parse(result)

}

const getContactById = async (id) => {
    const list = await listContacts()
    const contact = await list.find(el=> el.id === id)
    if (!contact) {
        return null
    }
    return contact
}

const addContact = async(name, email, phone) => {
    const list = await listContacts()
    const newContact = {
        name,
        phone,
        email,
        id: uuidv4()
    }
    list.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2))
    return newContact

}

const removeContact = async(id) => {
    const list = await listContacts()
    const idx = list.findIndex(el=> el.id === id)
    if (idx === -1) {
        return null
    }
    const [result] = list.splice(idx, 1)
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2))
    return result
}

module.exports = {
   listContacts,
   getContactById,
   addContact,
   removeContact

}