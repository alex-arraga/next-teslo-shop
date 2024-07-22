import { redirect } from "next/navigation";

export default function AuthPage() {

  // * 404 Not Found: Redirect
  redirect('/auth/login')

  return (
    <div></div>
  );
}