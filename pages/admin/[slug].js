import React from "react";
import { useRouter } from "next/router";
import BasicLayout from "../../core/modules/common/BasicLayout";
import { AdminItem, AdminLayout } from "../../core/modules/admin";

const MenusAdmin = () => {
  const routes = ["home", "article", "category", "klinik"];
  const router = useRouter().query.slug;
  if (router == undefined) <></>;

  return routes.includes(router) ? (
    <BasicLayout title={"Scanocular Dashboard | " + router.toLocaleUpperCase()}>
      <AdminLayout>
        <AdminItem item={router} />
      </AdminLayout>
    </BasicLayout>
  ) : (
    <>
      <h3>404</h3>
    </>
  );
};

export default MenusAdmin;
