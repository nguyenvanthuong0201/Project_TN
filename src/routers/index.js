import React from "react";
import AdminCustomer from "../Components/Page/admin/adminCustomer/AdminCustomer";
import AdminEmployee from "../Components/Page/admin/adminEmployee/AdminEmployee";
import AdminPayment from "../Components/Page/admin/adminPayment/AdminPayment";
import AdminProduct from "../Components/Page/admin/adminProducts/AdminProduct";
import AdminProfile from "../Components/Page/admin/adminProfile/AdminProfile";
import AdminStatistic from "../Components/Page/admin/adminStatistic/AdminStatistic";
import HomeContact from "../Components/Page/home/homeContact/HomeContact";
import HomeIntroduce from "../Components/Page/home/homeIntroduce/HomeIntroduce";
import HomeMater from "../Components/Page/home/homeMaster/HomeMater";
import HomeProduct from "../Components/Page/home/homeProduct/HomeProduct";
import PageCart from "../Components/Page/home/pageCart";
import NotFound from "../Components/Page/NotFound";

export const routes = [
  {
    /// điều chỉnh
    path: "/admin",
    exact: true,
    main: () => <AdminStatistic />,
  },
  {
    path: "/admin/customer",
    exact: false,
    main: () => <AdminCustomer />,
  },
  {
    path: "/admin/product",
    exact: false,
    main: () => <AdminProduct />,
  },

  {
    path: "/admin/profile",
    exact: false,
    main: () => <AdminProfile />,
  },
  {
    path: "/admin/payment",
    exact: false,
    main: () => <AdminPayment />,
  },
  {
    path: "/admin/employee",
    exact: false,
    main: () => <AdminEmployee />,
  },

  {
    // 404 phải  đặt dưới cùng
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];
export const routerHome = [
  {
    path: "/",
    exact: true,
    main: () => <HomeMater />,
  },
  {
    path: "/product",
    exact: false,
    main: () => <HomeProduct />,
  },
  {
    path: "/introduce",
    exact: false,
    main: () => <HomeIntroduce />,
  },
  {
    path: "/contact",
    exact: false,
    main: () => <HomeContact />,
  },
  {
    path: "/viewCart",
    exact: false,
    main: () => <PageCart />,
  },
];
