const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts.js");
const {Command} = require('commander')
const program = new Command()

const InvokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;
    case "get":
      const contact = await getContactById(id);
      console.table(contact);
      break;
    case "add":
      const addedContact = await addContact(name, email, phone);
      console.table(addedContact);
      break;
    case "remove":
      const removedContact = await removeContact(id);
      console.table(removedContact);
      break;
    default:
      console.log("Unknown action");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

InvokeAction(options)
