'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContactType } from '../_types/contacts';
import { FiTrash } from 'react-icons/fi';

type DeleteButtonProps = {
  contact: ContactType;
  onDeleted?: () => void; // optional callback after deletion
};

const DeleteButton = ({ contact, onDeleted }: DeleteButtonProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/contacts/${contact.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Delete failed");
      }

      if (onDeleted) {
        onDeleted();
      } else {
        router.push('/contact');
        router.refresh();
      }
    } catch (err) {
      console.error("Delete contact error:", err);
      alert("Failed to delete contact");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      aria-label={`Delete contact ${contact.name}`}
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex items-center gap-2 rounded-md border border-red-300 bg-red-100 px-3 py-1 transition hover:border-red-400 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <FiTrash className="text-red-500 hover:text-red-800" />
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteButton;