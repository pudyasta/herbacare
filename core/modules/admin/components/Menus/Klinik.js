import React, { createElement, useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Button } from "../../../common/button";
import Swal from "sweetalert2";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import axios from "axios";
import Image from "next/image";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
const Klinik = () => {
  const jwt =
    "bearer " + JSON.parse(localStorage.getItem("userData")).data.data.jwToken;
  const [name, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const [file, setFile] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [klinikOpen, setKlinikOpen] = useState("");
  const [klinikClose, setKlinikClose] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [submit, setSubmit] = useState(false);

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("klinik_name", name);
    formData.append("klinik_address", alamat);
    formData.append("image", file);
    formData.append("klinik_phone", phone);
    formData.append("password", password);
    formData.append("klinik_email", email);
    formData.append("klinik_open", klinikOpen);
    formData.append("klinik_close", klinikClose);
    formData.append("klinik_description", description);
    if (
      name &&
      alamat &&
      phone &&
      file &&
      password &&
      email &&
      klinikOpen &&
      klinikClose &&
      description
    ) {
      axios({
        url: `${process.env.NEXT_PUBLIC_BE_URL}/api/klinik/post`,
        method: "post",
        headers: {
          authorization: jwt,
        },
        data: formData,
      })
        .then((res) => {
          Swal.fire("Sukses", "Data berhasil ditambahkan", "success");
          setName(null);
          setAlamat(null);
          setFile(null);
          setPassword(null);
          setDescription(null);
          setKlinikClose(null);
          setKlinikOpen(null);
          setEmail(null);
          setPhone(null);
          setOpen(false);
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
      url: `${process.env.NEXT_PUBLIC_BE_URL}/api/article/delete/${id}`,
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
    axios
      .get(`${process.env.NEXT_PUBLIC_BE_URL}/api/klinik/all`)
      .then((res) => {
        setCategories(res.data.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BE_URL}/api/klinik/all`)
      .then((res) => {
        setData(res.data.data);
      });
  }, [submit]);

  if (!data || !categories) {
    return <></>;
  }
  return (
    <>
      <h1 className="md:text-4xl text-xl font-semibold capitalize py-8 text-primary-text">
        Daftar Klinik
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
              <th className="capitalize text-secondary-text font-semibold w-96">
                Nomor
              </th>
              <th className="capitalize text-secondary-text font-semibold w-96">
                Nama Klinik
              </th>
              <th className="capitalize text-secondary-text font-semibold w-96">
                Alamat
              </th>
              <th className="capitalize text-secondary-text font-semibold col-span-2 w-96">
                Foto
              </th>
              <th className="capitalize text-secondary-text font-semibold w-96">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="color-primary-text">
            {data.map((e, i) => {
              return (
                <tr key={i} className="h-16 border-b-2 border-b-gray-100 py-2">
                  <td>{i + 1}</td>
                  <td>{e.klinik_name}</td>
                  <td>{e.klinik_address}</td>
                  <td>
                    <Image
                      className="py-3"
                      loader={() =>
                        `${process.env.NEXT_PUBLIC_BE_URL}/` + e.klinik_image
                      }
                      src={
                        `${process.env.NEXT_PUBLIC_BE_URL}/` + e.klinik_image
                      }
                      width={200}
                      height={100}
                      alt={"Gambar " + e.title}
                    />
                  </td>
                  <td className="max-w-[4rem]">
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
                            handleDelete(e.articles_id);
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
            Tambah Artikel
          </h2>
          <div className="flex flex-col">
            <label htmlFor="name" className="mt-8 mb-2">
              Nama Klinik
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-grey-accent p-3 rounded-xl duration-500 focus:border-primary-blue outline-none w-full"
            />
            <label htmlFor="alamat" className="mt-8 mb-2">
              Alamat
            </label>
            <input
              type="text"
              name="alamat"
              id="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="border-2 border-grey-accent p-3 rounded-xl duration-500 focus:border-primary-blue outline-none w-full"
            />
            <label htmlFor="phone" className="mt-8 mb-2">
              Nomor Telepon
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onInput={(e) => {
                const allowedKeys = /[0-9\b]/;
                if (!allowedKeys.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => setPhone(e.target.value)}
              className="border-2 border-grey-accent p-3 rounded-xl duration-500 focus:border-primary-blue outline-none w-full"
            />
            <label htmlFor="email" className="mt-8 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-grey-accent p-3 rounded-xl duration-500 focus:border-primary-blue outline-none w-full"
            />
            <label htmlFor="password" className="mt-8 mb-2">
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-grey-accent p-3 rounded-xl duration-500 focus:border-primary-blue outline-none w-full"
            />
            <label htmlFor="klinikOpen" className="mt-8 mb-2">
              Jam Buka
            </label>
            <TimePicker
              onChange={setKlinikOpen}
              value={klinikOpen}
              className="border-2 border-grey-accent p-3 rounded-xl duration-500 focus:border-primary-blue outline-none w-full"
              format="hh:mm a"
            />
            <label htmlFor="klinikClose" className="mt-8 mb-2">
              Jam Tutup
            </label>
            <TimePicker
              onChange={setKlinikClose}
              value={klinikClose}
              // minTime={klinikOpen}
              disabled={klinikOpen == null ? true : false}
              clockClassName={"border-none"}
              className="border-2 border-grey-accent p-3 rounded-xl duration-500 focus:border-primary-blue outline-none w-full"
              format="hh:mm a"
            />

            <label htmlFor="description" className="mt-8 mb-2">
              Deskripsi
            </label>
            <textarea
              type="description"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 border-grey-accent p-3 rounded-xl duration-500 focus:border-primary-blue outline-none w-full"
            />

            <label htmlFor="name" className="mt-8 mb-2">
              Foto
            </label>
            <input
              type="file"
              name="title"
              id="title"
              onChange={(e) => setFile(e.target.files[0])}
              className=" p-3 rounded-xl duration-500 focus:border-primary-blue outline-none w-full"
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

export default Klinik;
