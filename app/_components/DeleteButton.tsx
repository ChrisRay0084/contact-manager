'use client';
import React from 'react';
import { ContactType } from '../_types/contacts';
import { FiTrash } from 'react-icons/fi';
import { deleteContactAction } from '../actions/contact';

type DeleteButtonProps = {
  contact: ContactType;
};

const DeleteButton = ({ contact }: DeleteButtonProps) => {
  return (
    <form
      action={deleteContactAction as unknown as string} // hack for TypeScript
      method="post"
      onSubmit={(e) => {
        if (!confirm('Are you sure you want to delete this contact?')) {
          e.preventDefault();
        }
      }}
      className="inline"
    >
      <input type="hidden" name="id" value={contact.id} />
      <button
        type="submit"
        className="flex items-center gap-2 px-3 py-1 border border-red-300 rounded-md bg-red-100 hover:border-red-400 hover:bg-red-200 transition"
      >
        <FiTrash className="text-red-500 hover:text-red-800" /> Delete
      </button>
    </form>
  );
};

export default DeleteButton;