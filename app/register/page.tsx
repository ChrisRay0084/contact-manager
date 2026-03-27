import RegisterForm from "@/app/_components/RegisterForm";

const RegistrationPage = () => {
  return (
    <div className="p-4">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <RegisterForm />
    </div>
    </div>
  )
}

export default RegistrationPage