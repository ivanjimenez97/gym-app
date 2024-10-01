import { useEffect, useState } from "react";
import PageTitle from "../../components/base/PageTitle";
import axiosClient from "../../AxiosClient";
import { Link } from "react-router-dom";
import AlertMessage from "../../components/base/AlertMessage";
import Edit from "../../components/icons/Edit";
import Delete from "../../components/icons/Delete";
import Modal from "../../components/base/Modal";
import Pagination from "../../components/base/Pagination";
import SearchField from "../../components/base/SearchField";

export default function UsersIndex() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [errorsOnDelete, setErrorsOnDelete] = useState(null);

  const [meta, setMeta] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const getRecords = async (url = "/users", keyword = "") => {
    setLoading(true);
    try {
      const res = await axiosClient.get(url, {
        params: {
          search: keyword,
        },
      });
      setRecords(res.data.data);
      setMeta(res.data.meta);
      console.log("Records:", res);
    } catch (error) {
      console.log("Ocurrio un error al intentar obtener los registros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  //Save Delete Modal with record information
  const handleDeleteClick = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  //Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
    setErrorsOnDelete(null);
  };

  const onDelete = () => {
    //console.log("Delete Method");
    //console.log("Selected Record:", selectedRecord);
    axiosClient
      .delete(`/users/${selectedRecord.id}`)
      .then(() => {
        setRecords(records.filter((record) => record.id !== selectedRecord.id));
        setIsModalOpen(false);
        setSelectedRecord(null);
        setErrorsOnDelete(null);
      })
      .catch((error) => {
        //console.error("Error deleting record:", error);
        setErrorsOnDelete(error.response.data.message);
      });
  };

  //This method is for the pagination.
  const handlePageChange = (url) => {
    getRecords(url, searchKeyword);
  };

  //Search Method
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    getRecords("/users", keyword);
  };

  return (
    <div className="mt-5">
      <div className="flex flex-row mb-5">
        <div className="basis-1/2 my-auto">
          <PageTitle classes={"mb-0"} title={"Usuarios"} />
        </div>
        <div className="basis-1/2 text-end">
          <Link
            to={"/users/create"}
            className="bg-green-300 hover:bg-green-500 focus:bg-green-700 px-5 py-3 rounded-lg hover:text-white"
          >
            Crear Usuario
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-600 mb-5">
          Lista de Registros
        </h3>
        <SearchField
          placeholder={"Buscar usuario..."}
          onSearch={handleSearch}
        />
        {/* This part of the code is displayed when loading is set to true */}
        {loading && (
          <AlertMessage
            classes={"bg-blue-200 font-bold text-gray-700 text-sm text-center"}
            message={"Cargando..."}
          />
        )}

        {/* This part of the code is displayed when loading is set to false */}
        {!loading && records && records.length > 0 && (
          <>
            <table className="w-full table-auto border-collapse border">
              <thead>
                <tr className="border-b text-gray-700 font-bold">
                  <th className="py-3 border text-center">ID</th>
                  <th className="py-3 border text-center">Nombre</th>
                  <th className="py-3 border text-center">Apellido</th>
                  <th className="py-3 border text-center">Correo</th>
                  <th className="py-3 border text-center">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={index} className="">
                    <td className="py-1 px-3 border text-center">
                      {record.id}
                    </td>
                    <td className="py-1 px-3 border">{record.firstName}</td>
                    <td className="py-1 px-3 border">{record.lastName}</td>
                    <td className="py-1 px-3 border">{record.email}</td>
                    <td className="py-1 px-3 border flex flex-wrap justify-center items-center">
                      <Link
                        to={`/users/${record.id}`}
                        className="bg-blue-700 hover:bg-blue-500 focus:bg-blue-400 p-2 text-white rounded-lg"
                        title={`Editar ${record.name}`}
                      >
                        <Edit />
                      </Link>
                      &nbsp;
                      <button
                        type="button"
                        className="bg-red-700 hover:bg-red-500 focus:bg-red-400 p-2 text-white rounded-lg"
                        onClick={() => handleDeleteClick(record)}
                        title={`Eliminar ${record.name}`}
                      >
                        <Delete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination meta={meta} onPageChange={handlePageChange} />
          </>
        )}

        {!loading && !records.length >= 1 && (
          <AlertMessage
            classes={`bg-yellow-300 font-bold text-gray-700 text-sm text-center`}
            message="No se encontraron registros."
          />
        )}
      </div>
      {/*this is the modal I need to built*/}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Atención!"
        onConfirm={onDelete}
      >
        <p className="text-center">
          ¿Está seguro de que desea eliminar este registro?
        </p>
        <br />
        {errorsOnDelete && (
          <AlertMessage
            classes={"bg-red-500 text-white"}
            message={
              <div className="w-full">
                <p className="font-medium text-center">
                  Ocurrio un error al intentar eliminar el registro.
                </p>{" "}
                <br />
                <p className="font-normal">{errorsOnDelete}</p>
              </div>
            }
          />
        )}
        <p className="font-normal text-center">
          <b>Nombre:</b> <br />
          {selectedRecord && selectedRecord.name}
        </p>
        <p className="font-normal text-center">
          <b>Correo:</b> <br />
          {selectedRecord && selectedRecord.email}
        </p>
        <p className="font-normal text-center">
          <b>Fecha de Creacion:</b> <br />
          {selectedRecord && selectedRecord.created_at}
        </p>
      </Modal>
    </div>
  );
}
