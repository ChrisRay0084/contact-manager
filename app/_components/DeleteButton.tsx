'use client';
import React from 'react';
import { ContactType } from '../_types/contacts';
import { FiTrash } from 'react-icons/fi';
import { useTransition } from 'react';
import { deleteContactAction } from '../actions/contact';

type DeleteButtonProps = {
  contact: ContactType;
};

const DeleteButton = ({ contact }: DeleteButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!confirm('Are you sure you want to delete this contact?')) return;

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      await deleteContactAction(formData);
    });
  };

  return (
    <form onSubmit={handleDelete} className="inline">
      <input type="hidden" name="id" value={contact.id} />
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-2 px-3 py-1 border border-red-300 rounded-md bg-red-100 hover:border-red-400 hover:bg-red-200 transition"
      >
        <FiTrash className="text-red-500 hover:text-red-800" /> Delete
      </button>
    </form>
  );
};

export default DeleteButton;