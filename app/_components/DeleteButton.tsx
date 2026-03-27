/*
'use client';   
import React from 'react';
import { ContactType } from '../_types/contacts';
import { FiTrash } from 'react-icons/fi';
import { useActionState } from 'react';

type DeleteButtonProps = {
  action: (prevState: any, formData: FormData) => Promise<any>;
  contact?: ContactType;
};

const DeleteButton = ({ action, contact }: DeleteButtonProps) => {
  const [state, formAction] = useActionState(action, null);

  return (
    <form className="inline">
      <input type="hidden" name="id" value={contact?.id} />

      <button
        type="submit"
        formAction={formAction} // ← attach action here instead of form attribute
        onClick={(e) => {
          if (!confirm("Are you sure you want to delete this contact?")) {
            e.preventDefault();
          }
        }}
        className="flex items-center gap-2 px-3 py-1 border border-red-300 rounded-md bg-red-100 hover:border-red-400 hover:bg-red-200 transition"
      >
        <FiTrash className="text-red-500 hover:text-red-800" /> Delete
      </button>
    </form>
  );
};

export default DeleteButton;
*/

'use client';
import React from 'react';
import { ContactType } from '../_types/contacts';
import { FiTrash } from 'react-icons/fi';
import { useActionState } from 'react';

type DeleteButtonProps = {
  action: (prevState: any, formData: FormData) => Promise<any>;
  contact: ContactType;
};

const DeleteButton = ({ action, contact }: DeleteButtonProps) => {
  const [state, formAction] = useActionState(action, null);

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this contact?")) {
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