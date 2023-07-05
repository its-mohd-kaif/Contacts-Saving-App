import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, deleteContact, updateContact } from "../redux/ReduxSlice";

function Contact() {
  const allContacts = useSelector((redux) => redux.redux.contacts);
  const [seenForm, setSeenForm] = useState(false);
  const [alertFlag, setAlertFlag] = useState(false);
  const [alert, setAlert] = useState({
    active: false,
    message: "",
  });

  const { active, message } = alert;

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    status: "active",
  });
  const [editContactId, setEditContactId] = useState(null);
  const { fname, lname, status } = user;

  const dispatch = useDispatch();

  const createContactHandler = () => {
    setUser({
      fname: "",
      lname: "",
      status: "active",
    });
    setSeenForm(true);
  };
  const saveContactHandler = () => {
    if (firstNameRef.current.value === "") {
      firstNameRef.current.focus();
      setAlert({
        active: true,
        message: "First Name Field Can Not Be Empty",
      });
    } else if (lastNameRef.current.value === "") {
      lastNameRef.current.focus();
      setAlert({
        active: true,
        message: "Last Name Field Can Not Be Empty",
      });
    } else {
      setAlert({
        active: false,
        message: "",
      });
      setSeenForm(false);
      if (editContactId) {
        let updatedContact = {
          id: editContactId,
          firstName: fname, // Update property name to firstName
          lastName: lname, // Update property name to lastName
          status: status,
        };
        // Update existing contact
        dispatch(updateContact(updatedContact));
        setEditContactId(null);
      } else {
        let updatedContact = {
          id: Math.floor(Math.random() * 919191),
          firstName: fname, // Update property name to firstName
          lastName: lname, // Update property name to lastName
          status: status,
        };

        // Add new contact
        dispatch(addContact(updatedContact));
      }
    }
  };
  const handleEdit = (contactId, contactFname, contactLname, contactStatus) => {
    setSeenForm(true);
    setUser({
      fname: contactFname,
      lname: contactLname,
      status: contactStatus,
    });
    setEditContactId(contactId);
  };

  const handleDelete = (contactId) => {
    dispatch(deleteContact(contactId));
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        {seenForm === true ? null : (
          <>
            <button
              onClick={createContactHandler}
              className="bg-gray-300 text-black text-lg p-3 border-2 border-black mb-4"
            >
              Create Contact
            </button>

            {alertFlag === true || allContacts.length !== 0 ? null : (
              <div className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg flex items-center justify-between">
                <p className="mr-2">
                  No Contact Found. Please add a contact from the "Create
                  Contact" button.
                </p>
                <button
                  onClick={() => {
                    setAlertFlag(true);
                  }}
                  className="text-black hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.414 10l4.293 4.293a1 1 0 11-1.414 1.414L12 11.414l-4.293 4.293a1 1 0 11-1.414-1.414L10.586 10 6.293 5.707a1 1 0 111.414-1.414L12 8.586l4.293-4.293a1 1 0 111.414 1.414L13.414 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/*------ Map Contacts ------*/}
            {allContacts.length !== 0 ? (
              <div className="flex flex-wrap justify-around">
                {allContacts.map((contact) => (
                  <div key={contact.id} className="w-35 p-4">
                    <div className="bg-white rounded-lg shadow p-4">
                      <div className="font-semibold mb-2">Contact Details</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-gray-600">First Name:</div>
                          <div>{contact.firstName}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Last Name:</div>
                          <div>{contact.lastName}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Status:</div>
                          <div>{contact.status}</div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                          onClick={() =>
                            handleEdit(
                              contact.id,
                              contact.firstName,
                              contact.lastName,
                              contact.status
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                          onClick={() => handleDelete(contact.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </>
        )}

        {seenForm === false ? null : (
          <>
            <div className="border-2 border-black p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="border border-gray-300 rounded p-2"
                    onChange={(e) => {
                      setUser({
                        ...user,
                        fname: e.target.value,
                      });
                    }}
                    ref={firstNameRef}
                    value={fname}
                    autoFocus
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="border border-gray-300 rounded p-2"
                    onChange={(e) => {
                      setUser({
                        ...user,
                        lname: e.target.value,
                      });
                    }}
                    ref={lastNameRef}
                    value={lname}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Status</label>
                  <div className="space-y-2">
                    <label htmlFor="active">
                      <input
                        type="radio"
                        id="active"
                        name="status"
                        className="mr-2"
                        onChange={() => {
                          setUser({
                            ...user,
                            status: "active",
                          });
                        }}
                        checked={status === "active" ? true : false}
                      />
                      Active
                    </label>
                    <label htmlFor="inactive">
                      <input
                        type="radio"
                        id="inactive"
                        name="status"
                        className="mr-2"
                        onChange={() => {
                          setUser({
                            ...user,
                            status: "inactive",
                          });
                        }}
                        checked={status === "inactive" ? true : false}
                      />
                      Inactive
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={saveContactHandler}
              className="bg-gray-300 text-black text-lg p-3 border-2 border-black mt-4"
            >
              Save Contact
            </button>
            {active === false && message === "" ? null : (
              <div className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg flex items-center justify-between mt-4">
                <p className="mr-2">{message}</p>
                <button
                  onClick={() => {
                    setAlert({
                      active: false,
                      message: "",
                    });
                  }}
                  className="text-black hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.414 10l4.293 4.293a1 1 0 11-1.414 1.414L12 11.414l-4.293 4.293a1 1 0 11-1.414-1.414L10.586 10 6.293 5.707a1 1 0 111.414-1.414L12 8.586l4.293-4.293a1 1 0 111.414 1.414L13.414 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Contact;
