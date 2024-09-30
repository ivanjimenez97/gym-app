import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../components/base/PageTitle";
import axiosClient from "../../AxiosClient";
import AlertMessage from "../../components/base/AlertMessage";

export default function CreateUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword
    };

    axiosClient
      .post("/users", data)
      .then((res) => {
        if(res.status === 201)
          {
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setErrors(null);
            setMessage("Registro creado exitosamente.");
            navigate('/users')
          }
      })
      .catch((error) => {
        const res = error.response;
        if (res && res.status === 422) {
          setErrors(res.data.errors.password);
          setMessage(null);
        }
      });
  };

  return (
    <div className="mt-5">
      <PageTitle classes={"mb-5"} title={"Crear Usuario"} />

      <div className="bg-white px-4 py-10 rounded-lg">
      {message && (
          <AlertMessage
            classes={"bg-green-500 text-white mb-5"}
            message={message}
          />
        )}

        {errors && (
          <AlertMessage
            classes={"bg-red-500 text-white mb-5"}
            message={Object.keys(errors).map((key) => (
              <p key={key}>{errors[key]}</p>
            ))}
          />
        )}

        <form onSubmit={onSubmit}>
          <div className="flex flex-wrap items-center mb-4">
            <div className="basis-full md:basis-1/2 xl:basis-1/3 px-2 mb-4">
              <label htmlFor="name" className="font-medium w-full mb-3">
                Nombre:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="basis-full md:basis-1/2 xl:basis-1/3 px-2 mb-4">
              <label htmlFor="email" className="font-medium w-full mb-3">
                Correo:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="basis-full md:basis-1/2 xl:basis-1/3 px-2 mb-4">
              <label htmlFor="password" className="font-medium w-full mb-3">
                Contraseña:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="basis-full md:basis-1/2 xl:basis-1/3 px-2 mb-4">
              <label
                htmlFor="confirmPassword"
                className="font-medium w-full mb-3"
              >
                Confirmar Contraseña:
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white border rounded-lg p-2 w-full"
                required
              />
            </div>
          </div>

          <div className="flex flex-row justify-between xl:justify-evenly items-center px-2 xl:px-10 mt-10">
            <Link
              to={"/users"}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-500 focus:bg-gray-700 hover:text-white focus:text-white rounded-lg"
            >
              Regresar
            </Link>
            <button
              type="submit"
              className="bg-green-300 hover:bg-green-500 focus:bg-green-700 focus:text-white px-5 py-3 rounded-lg hover:text-white"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
