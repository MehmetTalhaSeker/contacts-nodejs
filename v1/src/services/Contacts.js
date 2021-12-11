const Contact = require("../models/Contacts");

const insert = (data) => {
    const contact = new Contact(data);
    return contact.save();
};

const list = (where) => {
    return Contact.find(where || {}).populate({
        path: "user_id",
        select: "full_name phone_number",
    });
};

const modify = (data, id) => {
    return Contact.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
    insert,
    list,
    modify,
};