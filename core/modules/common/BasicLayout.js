import Head from "next/head";
import React from "react";

const BasicLayout = (props) => {
  return (
    <>
      <Head>
        <title>{props.title || "Herbacare Dashboard"}</title>
        <link
          rel="icon"
          sizes="16x16 32x32 64x64"
          href="/assets/favicon/vector.svg"
        />
      </Head>
      <div className="content">{props.children}</div>
    </>
  );
};

export default BasicLayout;
