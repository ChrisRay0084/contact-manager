'use client';
import React, { useState } from 'react';
import { ContactType } from '../_types/contacts';
import { FiTrash } from 'react-icons/fi';

type DeleteButtonProps = {
  contact: ContactType;
  onDeleted?: () => void; // optional callback after deletion
};

const DeleteButton = ({ contact, onDeleted }: DeleteButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    setIsDeleting(true);

    try {
      const res = await fetch('/api/contacts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: contact.id }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(`Failed to delete: ${data.error || 'Unknown error'}`);
        setIsDeleting(false);
        return;
      }
      window.location.reload();

      // Optional callback to refresh parent state
      if (onDeleted) onDeleted();
    } catch (err) {
      console.error('Delete contact error:', err);
      alert('Failed to delete contact');
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex items-center gap-2 px-3 py-1 border border-red-300 rounded-md bg-red-100 hover:border-red-400 hover:bg-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FiTrash className="text-red-500 hover:text-red-800" />
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteButton;