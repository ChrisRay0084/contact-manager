/*
'use client'
import { useActionState, useEffect } from 'react';
import { ContactType } from '../_types/contacts';
import { useRouter } from 'next/dist/client/components/navigation';


type ContactFormProps = {
    action: (prevState: any, formData: FormData) => Promise<any>;
    contact?: ContactType;
};


const ContactForm = ({action, contact}: ContactFormProps) => {
  const [state, formAction] = useActionState(action, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/contact");
    }
  }, [state, router]);

  return (
    <div>
            <form className="space-x-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Enter your name" 
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
                </div>
                <div className='mt-3'>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Enter your email" 
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" 
                    />
                </div>
                {state?.error && (
                  <div className="mt-3 text-red-500 text-sm">{state.error}</div>
                )}

                <button 
                    type="submit"
                    formAction={formAction}
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none">Save Contact</button>
            </form>
        </div>
  )
}

export default ContactForm
*/

// contactForm.tsx
'use client';
import { useActionState, useEffect } from 'react';
import { ContactType } from '../_types/contacts';
import { useRouter } from 'next/dist/client/components/navigation';

type ContactFormProps = {
    action: (prevState: any, formData: FormData) => Promise<any>;
    contact?: ContactType;
};

const ContactForm = ({ action, contact }: ContactFormProps) => {
  const [state, formAction] = useActionState(action, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/contact");
    }
  }, [state, router]);

  return (
    <div>
      <form className="space-x-4">
        <input type="hidden" name="id" value={contact?.id} />
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            defaultValue={contact?.name || ""} // auto-populate
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
          />
        </div>

        <div className="mt-3">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            defaultValue={contact?.email || ""} // auto-populate
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
          />
        </div>

        {state?.error && (
          <div className="mt-3 text-red-500 text-sm">{state.error}</div>
        )}

        <button
          type="submit"
          formAction={formAction}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none"
        >
          Save Contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;