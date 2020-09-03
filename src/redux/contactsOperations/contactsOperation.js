import contactsActions from "../contact/contact-actions";
import axios from "axios";

const addContact = (name, number) => (dispatch) => {
  dispatch(contactsActions.addContactRequest());
  //fetch("http://localhost:2000/contacts");
  // console.log("contact", contact);
  axios
    .post("https://react7-b91fe.firebaseio.com/contacts.json", { name, number })
    .then((response) => {
      console.log("resrtduytfuy", response.data);
      dispatch(
        contactsActions.addContactSuccess({
          name,
          number,
          id: response.data.name,
        })
      );
    })
    .catch((error) => dispatch(contactsActions.addContactError(error)));
};

const fetchContacts = () => (dispatch) => {
  dispatch(contactsActions.fetchContactsRequest());
  axios
    .get("https://react7-b91fe.firebaseio.com/contacts.json")
    .then(({ data }) => {
      console.log("data", data);

      const keys = Object.keys(data);
      const newData = keys.reduce((acc, key) => {
        acc.push({ id: key, ...data[key] });
        return acc;
      }, []);
      console.log("newData", newData);
      dispatch(contactsActions.fetchContactsSuccess(newData));
    })
    // })
    .catch((error) => dispatch(contactsActions.fetchContactsError(error)));
};

const removeContact = (id) => (dispatch) => {
  dispatch(contactsActions.removeContactRequest());
  axios
    .delete(`https://react7-b91fe.firebaseio.com/contacts/${id}.json`)
    .then(() => dispatch(contactsActions.removeContactSuccess(id)))
    .catch((error) => dispatch(contactsActions.removeContactError(error)));
};
export default {
  addContact,
  fetchContacts,
  removeContact,
};
