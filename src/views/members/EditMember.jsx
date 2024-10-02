import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/base/PageTitle";
import axiosClient from "../../AxiosClient";
import AlertMessage from "../../components/base/AlertMessage";

export default function EditMember() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [membershipPlanId, setMembershipPlanId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null);

  const getData = async () => {
    setLoading(true);

    const res = await axiosClient.get(`/members/${id}`);
    console.log("Edit Record Data: ", res);

    if (res.status === 200) {
      setMembershipPlans(res.data.membershipPlans);
      setFirstName(res.data.record.firstName);
      setLastName(res.data.record.lastName);
      setEmail(res.data.record.email);
      setPhone(res.data.record.phone);
      setAddress(res.data.record.address);
      setDateOfBirth(res.data.record.dateOfBirth);
      setGender(res.data.record.gender);
      setMembershipPlanId(res.data.record.membershipPlanId);
      setStartDate(res.data.record.startDate);
      setEndDate(res.data.record.endDate);
      setStatus(res.data.record.status);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address,
      dateOfBirth: dateOfBirth,
      gender: gender,
      membershipPlanId: membershipPlanId,
      startDate: startDate,
      endDate: endDate,
      status: status,
    };

    axiosClient
      .patch(`/members/${id}`, data)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setAddress("");
          setDateOfBirth("");
          setGender("");
          setMembershipPlanId(null);
          setStartDate(null);
          setEndDate(null);
          setStatus(null);
          setErrors(null);
          setMessage("Registro actualizado exitosamente.");
          navigate("/members");
        }
      })
      .catch((error) => {
        const res = error.response;
        if (res && res.status === 422) {
          setErrors(res.data.errors);
          setMessage(null);
        }
      });
  };

  return (
    <div className="mt-5">
      <PageTitle
        classes={"mb-5"}
        title={"Editar Usuario" + ` - ${firstName} ${lastName}`}
      />

      <div className="bg-white px-4 py-10 rounded-lg">
        {loading && (
          <AlertMessage
            classes={"bg-blue-200 font-bold text-gray-700 text-sm text-center"}
            message={"Cargando..."}
          />
        )}

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

        {!loading && (
          <form onSubmit={onSubmit}>
            <div className="flex flex-wrap items-center mb-4">
              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label htmlFor="firstName" className="font-medium w-full mb-3">
                  Nombre:
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-white border rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label htmlFor="lastName" className="font-medium w-full mb-3">
                  Apellido:
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-white border rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
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

              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label htmlFor="phone" className="font-medium w-full mb-3">
                  Telefono:
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white border rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label htmlFor="address" className="font-medium w-full mb-3">
                  Direccion:
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-white border rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label
                  htmlFor="dateOfBirth"
                  className="font-medium w-full mb-3"
                >
                  Fecha de Nacimiento:
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="bg-white border rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label htmlFor="gender" className="font-medium w-full mb-3">
                  Genero:
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  className="bg-white border rounded-lg p-2 w-full"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value={0} disabled>
                    Selecciona una opción
                  </option>
                  <option value={1}>Femenino</option>
                  <option value={2}>Masculino</option>
                </select>
              </div>
              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label
                  htmlFor="membershipPlanId"
                  className="font-medium w-full mb-3"
                >
                  Planes de Membresia:
                </label>
                <select
                  id="membershipPlanId"
                  name="membershipPlanId"
                  value={membershipPlanId}
                  className="bg-white border rounded-lg p-2 w-full"
                  onChange={(e) => setMembershipPlanId(e.target.value)}
                >
                  <option value={0} disabled>
                    Selecciona una opción
                  </option>
                  {membershipPlans && membershipPlans.length > 0
                    ? membershipPlans.map((plan, index) => (
                        <option key={index} value={plan.id}>
                          {plan.name}
                        </option>
                      ))
                    : ""}
                </select>
              </div>

              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label htmlFor="startDate" className="font-medium w-full mb-3">
                  Fecha de Inicio:
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-white border rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label htmlFor="endDate" className="font-medium w-full mb-3">
                  Fecha de Terminacion:
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-white border rounded-lg p-2 w-full"
                  required
                />
              </div>

              <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
                <label htmlFor="status" className="font-medium w-full mb-3">
                  Status:
                </label>
                <select
                  id="status"
                  name="status"
                  value={status}
                  className="bg-white border rounded-lg p-2 w-full"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={0} disabled>
                    Selecciona una opción
                  </option>
                  <option value={1}>Activo</option>
                  <option value={2}>Inactivo</option>
                </select>
              </div>
            </div>

            <div className="flex flex-row justify-between xl:justify-evenly items-center px-2 xl:px-10 mt-10">
              <Link
                to={"/members"}
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
        )}
      </div>
    </div>
  );
}
