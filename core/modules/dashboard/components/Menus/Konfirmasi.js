import React, { useEffect, useState } from "react";
import { BsFillBellFill, BsSearch } from "react-icons/bs";
import { Button } from "../../../common/button";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";

const Konfirmasi = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BE_URL}/api/article/all`)
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

  const handleRevision = (id) => {
    axios
      .put(`https://scanocular.online/api/pemeriksaan/${id}`, {
        status: "unconfirm",
      })
      .then((res) => {
        Swal.fire("Data telah direvisi", "", "success");
      })
      .catch((e) => {
        Swal.fire(
          "Gagal",
          "Sedang terjadi galat silahakan coba kembali",
          "warning"
        );
      });
  };

  const handleConfirm = (id) => {
    axios
      .put(`https://scanocular.online/api/pemeriksaan/${id}`, {
        status: "confirm",
      })
      .then((res) => {
        Swal.fire("Data telah dikonfirmasi", "", "success");
      })
      .catch((e) => {
        Swal.fire(
          "Gagal",
          "Sedang terjadi galat silahakan coba kembali",
          "warning"
        );
      });
  };

  const handleDelete = (id) => {
    axios
      .delete("https://scanocular.online/api/pemeriksaan/" + id)
      .then((res) => {
        Swal.fire("Data telah dihapus", "", "success");
      })
      .catch((e) => {
        Swal.fire(
          "Gagal",
          "Sedang terjadi galat silahakan coba kembali",
          "warning"
        );
      });
  };

  if (!data) {
    return <></>;
  }
  return (
    <>
      {showModal && (
        <div className="alert before:content[''] before:w-full before:absolute before:h-screen before:bg-black/50 before:top-0 before:right-0 before:z-20 ">
          <div className="bar  bg-white absolute z-30 left-[37.5vw] top-[12.5vh] bottom-auto pb-10 min-h-1/2 w-1/4 rounded-xl overflow-hidden flex flex-col">
            <h2 className="bg-[#F4F4F4] px-8 py-5 text-2xl font-semibold text-primary-blue shadow-xl">
              Hasil Pemindaian
            </h2>
            <Image
              className="px-8 mt-10 mx-auto"
              src={"/assets/dashboard/mata.jpg"}
              height={500}
              width={700}
              alt="mata"
            />
            <button
              type="submit"
              className="mx-8 mt-5 rounded-xl bg-[#DC7226] text-white py-2"
              onClick={() => setShowModal(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
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
              hasil
            </th>
            <th className="capitalize text-secondary-text font-semibold w-96">
              aksi
            </th>
          </thead>
          <tbody className="color-primary-text">
            {data
              .filter((x) => {
                if (x.diagnosa == "normal" || x.status !== "pending") {
                  return false;
                }
                return true;
              })
              .map((e, i) => {
                return (
                  <tr
                    key={i}
                    className="h-16 border-b border-b-2 border-b-gray-100"
                  >
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td className="max-w-[6rem]">{e.date}</td>
                    <td>
                      <a
                        className="text-primary-blue cursor-pointer"
                        onClick={() =>
                          Swal.fire({
                            imageUrl: `https://scanocular.online/media/hasilpemeriksaan/${e.url_image}`,
                            imageHeight: 400,
                            imageAlt: "A tall image",
                            confirmButtonText: "Tutup",
                            confirmButtonColor: "#DC7226",
                          })
                        }
                      >
                        Cek Hasil
                      </a>
                    </td>
                    <td className="max-w-[4rem]">
                      <Button
                        children="Konfirmasi"
                        type="outlined"
                        className="rounded-xl text-sm py-2"
                        onClick={() => {
                          Swal.fire({
                            title: "Konfirmasi Data Pasien?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Ya",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleConfirm(e.id);
                              setData(data.filter((a) => a.id !== e.id));
                            }
                          });
                        }}
                      />
                      <Button
                        children="Revisi"
                        type="primary"
                        className="rounded-xl text-sm py-2 px-5 bg-yellow-500 ml-1"
                        onClick={() => {
                          Swal.fire({
                            title: "Revisi Data?",
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
                        children="Hapus"
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
