import promptSync from "prompt-sync";
import fs from 'fs';
const input = promptSync({ sigint: true });

const FILE_PATH = './contacts.json';

// Function to read contacts from file
const readContacts = () => {
  try {
    if (fs.existsSync(FILE_PATH)) {
      const data = fs.readFileSync(FILE_PATH, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading contacts:', error);
    return [];
  }
};

// Function to save contacts to file
const saveContacts = (contacts) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error('Error saving contacts:', error);
  }
};

// Initialize contacts from file
let contacts = readContacts();

const printInfo = () => {
  console.log("Contact Management System");
  console.log("_________________________");
  console.log("1. Add a contact");
  console.log("2. Delete a contact");
  console.log("3. View contacts");
  console.log("4. Search contacts");
  console.log("5. Update a contact");
  console.log("6. Exit");
};

const addContact = () => {
  let contactName = input("Enter the contact name: ");
  let contactNumber = input("Enter the contact phone number: ");

  let contact = {name: contactName, phone: contactNumber};
  contacts.push(contact);
  saveContacts(contacts);

  console.log("Contact added successfully");

};

const deleteContact = () => {
  let contactName = input("Enter the name of the contact to delete: ");
  let index = contacts.findIndex((contact) => contact.name === contactName);
  if (index === -1) {
    console.log("Contact not found.");
  } else {
    contacts.splice(index, 1);
    saveContacts(contacts);
    console.log("Contact deleted successfully!");
  }
};


const listContacts = () => {
  if (contacts.length === 0) {
    console.log("No contacts found");
    return;
  }
  console.log("Contacts:");
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. Name: ${contact.name}, Phone: ${contact.phone}`);
  });
};

const searchContacts = () => {
  let query = input("Enter a name or phone number to search: ");
  let results = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase()) ||
      contact.phone.includes(query)
  );
  if (results.length === 0) {
    console.log("No matching contacts found.");
  } else {
    console.log("Search Results:");
    results.forEach((contact) => {
      console.log(`Name: ${contact.name}, Phone: ${contact.phone}`);
    });
  }
};

const updateContact = () => {
  let contactName = input("Enter the name of the contact to update: ");
  const foundContact = contacts.find((contact) => contact.name === contactName);
  if (!foundContact) {
    console.log("Contact not found.");
    return;
  }
  console.log("Do you want to update the name? (y/n)");
  let updateName = input();
  if (updateName === "y") {
    let newName = input("Enter the new name: ");
    foundContact.name = newName;
    saveContacts(contacts);
    console.log("Contact name updated successfully!");
  }
  console.log("Do you want to update the phone number? (y/n)");
  let updatePhone = input();
  if (updatePhone === "y") {
    let newPhoneNumber = input("Enter the new phone number: ");
    foundContact.phone = newPhoneNumber;
    saveContacts(contacts);
    console.log("Contact phone number updated successfully!");
  }
};

const main = () => {
  printInfo();

  let keepGoing = true;

  while (keepGoing) {
    const number = input("Enter an opeation (1-5): ");
    switch (number) {
      case "1":
      addContact();
      break;
    case "2":
      deleteContact();
      break;
    case "3":
      listContacts();
      break;
    case "4":
      searchContacts();
      break;
    case "5":
      updateContact();
      break;
    case "6":
      keepGoing = false;
      break;
      default:
        console.log("Unknown!");
    }
  }
};

main();
