  /*
  import ContactForm from '@/app/_components/ContactForm';
   import { updateContactAction } from '@/app/actions/contact';
  import { getContactById } from '@/app/api/contact';
 import React from 'react'

 const EditContactPage = async ({ params }: { params: { id: string } }) => {
   const { id } = params;
   const contact = await getContactById(Number(id));
   console.log("Contact to edit:", contact);
 return (
   <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
     <h1 className='text-2xl font-bold mb-6'>Edit Contact</h1>
     <ContactForm action={updateContactAction} contact={contact} />
   </div>
);
};
*/

// export default EditContactPage;

/* // this works if the id is a number
import React from 'react';
import ContactForm from '@/app/_components/ContactForm';
import { updateContactAction } from '@/app/actions/contact';
import { getContactById } from '@/app/api/contact';

export default async function EditContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params to get the actual id
  const { id } = await params;

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return <div>Invalid ID</div>;
  }

  // Fetch the contact from your backend
  const contact = await getContactById(numericId);

  if (!contact) {
    return <div>Contact not found</div>;
  }

  // ✅ Return statement using your styled ContactForm wrapper
  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-6'>Edit Contact</h1>
      <ContactForm action={updateContactAction} contact={contact} />
    </div>
  );
}
*/

/*
// app/contact/edit/[id]/page.tsx
import React from 'react';
import ContactForm from '@/app/_components/ContactForm';
import { updateContactAction } from '@/app/actions/contact';
import { getContactById } from '@/app/api/contact';
import { ContactType } from '@/app/_types/contacts';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditContactPage({ params }: PageProps) {
  const id = params.id;
  console.log("Fetching contact for edit:", id);

  if (!id) return <div>Invalid contact ID</div>;

  // Fetch the contact by string ID
  const contact = await getContactById(id);

  if (!contact) return <div>Contact not found</div>;

  // ✅ TypeScript now knows contact is not null
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Contact</h1>
      <ContactForm action={updateContactAction} contact={contact as ContactType} />
    </div>
  );
}
*/

  
  /*import ContactForm from '@/app/_components/ContactForm';
  import { updateContactAction } from '@/app/actions/contact';
  import { getContactById } from '@/app/api/contact';
  import { use } from 'react';
 import React from 'react'

 const EditContactPage = async ({ params }: { params: Promise<{ id: string }> }) => {
   const { id } = use(params);
   const contact = await getContactById(String(id));
   console.log("Contact to edit:", contact);
 return (
   <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
     <h1 className='text-2xl font-bold mb-6'>Edit Contact</h1>
     <ContactForm action={updateContactAction} contact={contact} />
   </div>
);
};

export default EditContactPage;*/

import ContactForm from '@/app/_components/ContactForm';
import { updateContactAction } from '@/app/actions/contact';
import { getContactById } from '@/app/api/contact';

const EditContactPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {

  const { id } = await params; // ✅ unwrap promise properly

  const contact = await getContactById(String(id)); // ✅ keep it as string

  console.log("Contact to edit:", contact);

  if (!contact) return <div>Contact not found</div>;

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-6'>Edit Contact</h1>
      <ContactForm action={updateContactAction} contact={contact} />
    </div>
  );
};

export default EditContactPage;
