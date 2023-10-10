import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../../common/button";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();

  const handleSubmit = () => {
    axios
      .post("https://herbacare.tech/api/admin/login", {
        email: email,
        password,
      })
      .then((res) => {
        Swal.fire("Login Berhasil", "", "success");
        localStorage.setItem("userData", JSON.stringify(res.data));
        push("/admin/home");
      })
      .catch((e) => {
        if (e.response.data.errors.status == 401) {
          axios
            .post("https://herbacare.tech/api/klinik/login", {
              klinik_email: email,
              password,
            })
            .then((res) => {
              Swal.fire("Login Berhasil", "", "success");
              localStorage.setItem("userData", JSON.stringify(res.data));
              push("/dashboard/konfirmasi");
            })
            .catch((e) => {
              if (e.response.data.errors.status == 401) {
                Swal.fire(
                  "User Tidak Ditemukan",
                  "Harap isi semua data dengan benar!",
                  "info"
                );
              } else if (e.response.data.errors.status == 400) {
                Swal.fire("Data Invalid", "Silahkan coba lagi", "warning");
              } else {
                Swal.fire("Terjadi Kesalahan", "Silahkan coba lagi", "warning");
              }
            });
        } else if (e.response.data.errors.status == 400) {
          Swal.fire("Data Invalid", "Silahkan coba lagi", "warning");
        } else {
          Swal.fire("Terjadi Kesalahan", "Silahkan coba lagi", "warning");
        }
      });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData !== null) {
      const role = jwt_decode(userData.data.data.jwToken).data.role;
      if (role == "klinik") {
        push("/dashboard/home");
      } else if (role == "admin") {
        push("/admin/home");
      }
    }
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-2 w-full h-screen">
        <div className="lg:flex hidden banner bg-gray-100">
          <Image
            width={700}
            height={200}
            src="/assets/login/loginbanner.png"
            className="m-auto "
          />
        </div>
        <div className="form flex flex-col justify-center lg:px-20 px-5">
          <h2 className="text-5xl capitalize font-bold text-transparent bg-clip-text bg-gradient-45 from-[#718f2d] to-[#aad60b]">
            Herbacare
          </h2>
          <h5 className="text-xl capitalize text-primary-text">
            Temukan Solusi Herbal dengan Herbacare
          </h5>

          <label htmlFor="email" className="mt-10 mb-2">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            className="border border-2 border-grey-accent p-3 rounded-xl duration-500 focus:border-primary-blue outline-none"
          />
          <label htmlFor="password" className="mt-8 mb-2">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            className="border border-2 border-grey-accent p-3 rounded-xl duration-500 focus:border-primary-blue outline-none"
          />

          <Button
            type="primary"
            className="mt-10 rounded-xl shadow-xl bg-green-normal tracking-wide font-semibold hover:bg-green-semilight hover:text-green-dark hover:shadow-3xl transition-all ease-in-out group"
            onClick={() => handleSubmit()}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default index;
