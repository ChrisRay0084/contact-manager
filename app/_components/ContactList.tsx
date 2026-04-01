import { ContactType } from '../_types/contacts'
import { FiEdit } from 'react-icons/fi'
import Link from 'next/link'
import DeleteButton from './DeleteButton'
import { deleteContactAction } from '../actions/contact'

type Props = {
  contacts: ContactType[]
}

const ContactList = ({ contacts }: Props) => {
  // Empty state
  if (!contacts || contacts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No contacts found.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-lg font-semibold">{contact.name}</h2>
              <p className="text-gray-600">{contact.email}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              
              {/* Edit */}
              <Link
                href={`/contact/edit/${contact.id}`}
                className="flex items-center gap-2 px-3 py-1 border border-blue-300 rounded-md bg-blue-100 hover:border-blue-400 hover:bg-blue-200 transition"
              >
                <FiEdit className="text-blue-600" />
                Edit
              </Link>

              {/* Delete */}
              <DeleteButton
                action={deleteContactAction} // server action receives FormData automatically
                contact={contact}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContactList