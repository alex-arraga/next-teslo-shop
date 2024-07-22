import Link from 'next/link';
import { Title } from '@/components';


export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <Title
        title='Registrarse'
      />

      <div className="flex flex-col">

        <label htmlFor="email">Nombre completo</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="text"
          placeholder='John Doe'
        />


        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          placeholder='example@gmail.com'
        />


        <label htmlFor="email">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          placeholder='******'
        />

        <button
          className="btn-primary">
          Crear cuenta
        </button>


        {/* divisor line */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/login"
          className="btn-secondary text-center">
          Ingresar
        </Link>

      </div>
    </div>
  );
}