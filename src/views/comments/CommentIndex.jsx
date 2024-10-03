import { useEffect, useState } from "react";
import PageTitle from "../../components/base/PageTitle";
import axiosClient from "../../AxiosClient";
import Edit from "../../components/icons/Edit";
import Delete from "../../components/icons/Delete";
import AlertMessage from "../../components/base/AlertMessage";

export default function CommentIndex() {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [email, setEmail] = useState(null);
  const [description, setDescription] = useState(null);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/comments");
      setRecords(res.data.records);
      console.log("Records:", res);
    } catch (error) {
      console.log("Ocurrio un error al intentar obtener los registros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onAdd = async () => {
    const payload = {
      email: email,
      description: description,
    };

    try {
      const res = axiosClient.post("/comments", payload);
      if (res.status === 201) {
        setEmail(null);
        setDescription(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-5">
      <div className="bg-white p-3 rounded-lg shadow-lg mb-5">
        <PageTitle title={"Leave Comments"} />
        <form className="mt-5" onSubmit={onAdd}>
          <div className="flex flex-wrap items-center mb-4">
            <div className="basis-full 2xl:basis-1/2 px-2 mb-4">
              <label htmlFor="email" className="font-medium w-full mb-3">
                Email:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border rounded-lg p-2 w-full"
                required
              />
            </div>

            <div className="basis-full 2xl:basis-1/2 px-2 mb-4">
              <label htmlFor="description" className="font-medium w-full mb-3">
                Description:
              </label>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white border rounded-lg p-2 w-full"
                required
              ></textarea>
            </div>

            <div className="basis-full text-end px-2 mb-4">
              <button
                type="submit"
                className="bg-green-500 px-3 py-2 rounded-lg text-white"
              >
                Comment
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-lg">
        <PageTitle title={"Comments History"} classes={`mb-5`} />
        <ul>
          {/* This part of the code is displayed when loading is set to true */}
          {loading && !records.length > 0 && (
            <AlertMessage
              classes={
                "bg-blue-200 font-bold text-gray-700 text-sm text-center"
              }
              message={"Loading..."}
            />
          )}
          {!loading &&
            records.length > 0 &&
            records.map((record, index) => (
              <li
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-lg px-5 py-3"
              >
                <h3 className="text-lg font-bold">{record.email}</h3>
                <p className="font-normal mb-3">{record.description}</p>
                <div className="flex">
                  <button className="px-3 py-2 bg-indigo-500 rounded-lg text-white me-5">
                    <Edit className="w-[1.25rem] h-[1.25rem]" />
                  </button>
                  <button className="px-3 py-2 bg-red-500 rounded-lg text-white">
                    <Delete className="w-[1.25rem] h-[1.25rem]" />
                  </button>
                </div>
              </li>
            ))}

          {!loading && !records.length >= 1 && (
            <AlertMessage
              message="Records not found."
              classes={`bg-yellow-300 font-bold text-gray-700 text-sm text-center`}
            />
          )}
        </ul>
      </div>
    </div>
  );
}
