import Image from "next/image";
import React from "react";

const HomeAdmin = () => {
  return (
    <div className="flex flex-col items-center">
      {" "}
      <Image
        width={700}
        height={200}
        src="/assets/login/loginbanner.png"
        className="m-auto "
      />
      <h2 className="lg:text-4xl font-semibold">
        Selamat Datang Di Platform Dashboard{" "}
        <span className="text-5xl capitalize font-bold text-transparent bg-clip-text bg-gradient-45 from-[#718f2d] to-[#aad60b]">
          Herbacare
        </span>
      </h2>
      <h3 className="leading-10 text-xl mt-5">
        Temukan berbagai fitur dan layanan menarik lainnya hanya di aplikasi
        herbacare
      </h3>
    </div>
  );
};

export default HomeAdmin;
