import { Title } from '@/components';
import { RegisterForm } from './ui/RegisterForm';


export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <Title
        title='Registrarse'
      />

     <RegisterForm />
    </div>
  );
}