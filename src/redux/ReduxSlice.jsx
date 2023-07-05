import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
};

const reduxSlice = createSlice({
  name: "redux",
  initialState,
  reducers: {
    // Action For Contacts
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      const contactId = action.payload;
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== contactId
      );
    },
    updateContact: (state, action) => {
      const updatedContact = action.payload;
      const tempApp = [...state.contacts]; // Create a copy of the contacts array
      console.log("updatedContact", updatedContact);
      console.log("tempApp", tempApp);

      for (const [index, element] of tempApp.entries()) {
        if (element.id === updatedContact.id) {
          console.log("KAIFFFFFFFFFF");
          tempApp.splice(index, 1, updatedContact);
          break; // Exit the loop once the update is done
        }
      }

      state.contacts = tempApp;
    },
  },
});

export const { addContact, deleteContact, updateContact } = reduxSlice.actions;
export default reduxSlice.reducer;
