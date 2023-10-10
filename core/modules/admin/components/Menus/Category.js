import React, { createElement, useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Button } from "../../../common/button";
import Swal from "sweetalert2";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import axios from "axios";
import Image from "next/image";

const Category = () => {
  const jwt =
    "bearer " + JSON.parse(localStorage.getItem("userData")).data.data.jwToken;
  const [kategori, setKategori] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [submit, setSubmit] = useState(false);

  const handleSubmit = () => {
    if (kategori) {
      axios({
        url: "https://herbacare.tech/api/categories/post",
        method: "post",
        headers: {
          authorization: jwt,
        },
        data: {
          category_name: kategori,
        },
      })
        .then((res) => {
          Swal.fire("Sukses", "Data berhasil ditambahkan", "success");
          setOpen(false);
          setKategori(null);
          setSubmit(!submit);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire(
            "Gagal",
            "Sedang terjadi galat asilahakan coba kembali",
            "warning"
          );
        });
    } else {
      Swal.fire(
        "Terjadi Kesalahan",
        "Harap isi semua data dengan benar!",
        "info"
      );
    }
  };

  const handleDelete = (id) => {
    axios({
      method: "delete",
      url: `https://herbacare.tech/api/categories/${id}`,
      headers: {
        authorization: jwt,
      },
    })
      .then((res) => {
        Swal.fire("Data telah dihapus", "", "success");
        setSubmit(!submit);
      })
      .catch((e) => {
        Swal.fire(
          "Gagal",
          "Sedang terjadi galat silahakan coba kembali",
          "warning"
        );
      });
  };

  useEffect(() => {
    axios.get("https://herbacare.tech/api/category/all").then((res) => {
      setData(res.data.data);
    });
  }, [submit]);

  if (!data) {
    return <></>;
  }
  return (
    <>
      <h1 className="md:text-4xl text-xl font-semibold capitalize py-8 text-primary-text">
        List Kategori
      </h1>
      <div className="bg-white  py-12 px-8 rounded-xl shadow-sm overflow-x-auto overflow-y-auto max-h-[75vh]">
        <div className="flex justify-end gap-5">
          <Button
            type="primary"
            className=" rounded-xl q px-3 text-sm font-semibold"
            onClick={() => setOpen(true)}
          >
            Tambah Artikel
          </Button>
        </div>
        <table className="mt-10 table-auto w-full align-left border-spacing-2">
          <thead className="text-left">
            <tr>
              <th className="capitalize text-secondary-text font-semibold col-span-2 w-96">
                Nomor
              </th>
              <th className="capitalize text-secondary-text font-semibold w-96">
                Judul
              </th>
              <th className="capitalize text-secondary-text font-semibold w-96">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="color-primary-text">
            {data.map((e, i) => {
              return (
                <tr
                  key={i}
                  className="h-16 border-b border-b-2 border-b-gray-100 py-2"
                >
                  <td>{i + 1}</td>
                  <td>{e.category_name}</td>

                  <td className="max-w-[4rem]">
                    <Button
                      children="Edit"
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
                            handleDelete(e.category_id);
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
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          center
          styles={{ modal: { padding: "50px 20px", width: "80vw" } }}
        >
          <h2 className="text-xl font-medium text-primary-blue">
            Tambah Kategori
          </h2>
          <div className="flex flex-col">
            <label htmlFor="kategori" className="mt-8 mb-2">
              Nama Kategori
            </label>
            <input
              type="text"
              name="kategori"
              id="kategori"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="border border-2 border-grey-accent p-3 rounded-xl duration-500 focus:border-primary-blue outline-none w-full"
            />
          </div>
          <Button
            type="primary"
            className="mt-10 rounded-xl shadow-xl w-full"
            onClick={handleSubmit}
          >
            Tambahkan
          </Button>
        </Modal>
      </div>
    </>
  );
};

export default Category;
