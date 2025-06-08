// const [showForm, setShowForm] = useState(false);
//   const router = useRouter();

//   const handleSignUp = async (email: string, password: string) => {
//     try {
//       const token = await loginUser(email, password);
//       sessionStorage.setItem("token", token);
//       router.push("/dashboard");
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "SignUp failed");
//     }
//   };

import React from 'react'

export default function page() {
  return (
    <div>Login page</div>
  )
}
