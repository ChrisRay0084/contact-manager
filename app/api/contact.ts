import axios from "axios";
import { ContactType } from "../_types/contacts";

const API_URL = "http://localhost:3001";

//export const getContacts = async (userId: number) => {
export const getContacts = async (userId: string) => {
    const response = await axios.get(`${API_URL}/contacts?userId=${userId}`);
    return response.data;
};

/*
export const getContactById = async (id: string) => {
    //console.log("Fetching contact with id:", id);
    //console.log("API fetching id:", id);

    const response = await axios.get(`${API_URL}/contacts/${id}`);
    return response.data;
};
*/

export const getContactById = async (id: string) => {
  const response = await axios.get(`${API_URL}/contacts`, {
    params: { id: String(id) } // ?id=0d63
    
  });
  console.log("API fetching id:", id);

  // json-server returns an array, pick first match
  return response.data[0] || null;
};

export const createContact = async (contact: ContactType) => {
    const response = await axios.post(`${API_URL}/contacts`, contact);
    return response.data;
};

export const updateContact = async (id: string, contact: ContactType) => {
    const response = await axios.put(`${API_URL}/contacts/${id}`, contact);
    return response.data;
};

export const deleteContact = async (id: string) => {
    console.log("Deleting contact id:", id);
    const response = await axios.delete(`${API_URL}/contacts/${id}`);
    return response.data;
};