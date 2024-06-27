import React, { useEffect, useState } from "react";
import { BsFillBellFill, BsSearch } from "react-icons/bs";
import { Button } from "../../../common/button";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import jwtDecode from "jwt-decode";

const Konfirmasi = () => {
  const jwt =
    "bearer " + JSON.parse(localStorage.getItem("userData")).data.data.jwToken;
  const klinikId = jwtDecode(jwt).data.klinik_id;
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BE_URL}/api/reservasi-klinik/${klinikId}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((e) => {
        Swal.fire(
          "Gagal",
          "Sedang terjadi galat silahakan coba kembali",
          "warning"
        );
      });
  }, []);
  const parseDateToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  if (!data) {
    return <></>;
  }
  return (
    <>
      <h1 className="md:text-4xl text-xl font-semibold capitalize py-8 text-primary-text">
        Jadwal Reservasi
      </h1>
      <div className="bg-white  py-12 px-8 rounded-xl shadow-sm overflow-x-auto overflow-y-auto max-h-[75vh]">
        {/* <div className="relative">
          <button className="absolute text-2xl left-4 top-3">
            <BsSearch />
          </button>
          <input
            placeholder="Cari nama pasien"
            type="text"
            name="data"
            id="data"
            className="w-full border border-2 border-grey-accent py-3 px-14 rounded-2xl duration-500 focus:border-primary-blue outline-none "
          />
        </div> */}

        <table className="table-auto w-full align-left border-spacing-2">
          <thead className="text-left">
            <th className="capitalize text-secondary-text font-semibold w-96">
              nama
            </th>
            <th className="capitalize text-secondary-text font-semibold col-span-2 w-96">
              email
            </th>
            <th className="capitalize text-secondary-text font-semibold w-96">
              tanggal periksa
            </th>
            <th className="capitalize text-secondary-text font-semibold w-96">
              Status
            </th>
            <th className="capitalize text-secondary-text font-semibold w-96">
              aksi
            </th>
          </thead>
          <tbody className="color-primary-text">
            {data.map((e, i) => {
              return (
                <tr key={i} className="h-16 border-b-2 border-b-gray-100">
                  <td>{e.user.name}</td>
                  <td>{e.user.email}</td>
                  <td className="max-w-[6rem]">
                    {parseDateToDDMMYYYY(e.reserved_date)}
                  </td>
                  <td>{e.status}</td>
                  <td className="max-w-[4rem]">
                    <Button
                      children="Konfirmasi"
                      type="primary"
                      className="rounded-xl text-sm py-2 px-5 bg-blue-500 ml-1"
                      onClick={() => {
                        Swal.fire({
                          title: "Konfirmasi",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Ya",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleRevision(e.id);
                            setData(data.filter((a) => a.id !== e.id));
                          }
                        });
                      }}
                    />
                    <Button
                      children="Batal"
                      type="primary"
                      className="rounded-xl text-sm py-2 px-5 bg-red-500 ml-1"
                      onClick={() => {
                        Swal.fire({
                          title: "Hapus Data?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Ya",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDelete(e.id);
                            setData(data.filter((a) => a.id !== e.id));
                          }
                        });
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Konfirmasi;
