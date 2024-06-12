import Image from "next/image";
import React, { useEffect, useState } from "react";
import LinkItem from "../../common/LinkItem";
import {
  BsGridFill,
  BsFillBellFill,
  BsEyeFill,
  BsGearFill,
} from "react-icons/bs";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import { Button } from "../../common/button";
import Swal from "sweetalert2";

const DashboardLayout = ({ children }) => {
  const [device, setDevice] = useState("mobile");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const userData = localStorage.getItem("userData");
  const data = JSON.parse(localStorage.getItem("userData"));

  const detectDeviceType = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? "Mobile"
      : "Desktop";
  useEffect(() => {
    if (!userData) {
      router.push("/login");
    } else if (
      jwtDecode(JSON.parse(userData)?.data?.data?.jwToken)?.data?.role !==
      "klinik"
    ) {
      router.push("/admin/home");
    }
    if (detectDeviceType() === "Desktop") {
      setDevice("desktop");
      setIsOpen(true);
    }
  }, []);
  const handleLogout = () => {
    Swal.fire({
      title: "Anda yakin akan logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userData");
        router.push("/login");
      }
    });
  };
  if (!userData) return <></>;
  return (
    <div className="flex">
      <div
        className={`lg:relative absolute col-span-2 h-screen bg-green-normal after:content-[''] after:bg-[url('/assets/dashboard/pattern.png')] after:opacity-40 after:absolute after:w-full after:h-screen after:bg-no-repeat after:bg-cover flex flex-col justify-between 
        min-w-90 ${
          !isOpen
            ? "lg:w-0 lg:translate-x-0 -translate-x-full opacity-0"
            : "lg:w-1/5 translate-x-0 opacity-1"
        }  z-20 duration-500 ease-out overflow-hidden`}
      >
        <div className="relative z-10 ">
          <div className="bg-green-dark text-center ">
            <h2 className="text-white uppercase text-lg py-5 font-bold">
              herbacare
            </h2>
          </div>
          <div className="relative z-10 px-8 my-8 flex flex-col gap-4">
            <LinkItem
              href="/dashboard/konfirmasi"
              query="konfirmasi"
              onClick={() => device == "mobile" && setIsOpen(false)}
            >
              <BsEyeFill />
              Reservasi
            </LinkItem>
            <LinkItem
              href="/dashboard/service"
              query="service"
              onClick={() => device == "mobile" && setIsOpen(false)}
            >
              <BsGearFill />
              Service
            </LinkItem>
          </div>
        </div>
        <div className="px-8 flex flex-col items-center my-6 gap-3   text-white">
          <div className="flex gap-3 break-words items-center">
            <Image
              src="/assets/dashboard/klinik.png"
              className="rounded-full"
              width={60}
              height={20}
              alt="profile image"
            />
            <div className="w-full relative">
              <h2 className="text-md">{data.data.data.klinik_name}</h2>
              <h3 className="break-all font-thin text-sm">
                {data.data.data.klinik_email}
              </h3>
            </div>
          </div>
          <Button
            type="outined"
            className=" rounded-xl px-3 text-sm font-semibold bg-green-light w-full  text-bold relative z-50"
            color="text-green-dark"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="col-span-10 w-full bg-gray-50 h-screem">
        <div
          className={`w-full bg-white h-20  items-center md:px-12 px-8 text-xl flex justify-between duration-500`}
        >
          <button
            className={` text-2xl  bg-green-normal p-3 rounded-xl text-white duration-500 ease-out`}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <BsGridFill />
          </button>
          <BsFillBellFill />
        </div>
        <div className="bg-gray-50 px-8 md:px-12 absolute">
          {userData && children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
