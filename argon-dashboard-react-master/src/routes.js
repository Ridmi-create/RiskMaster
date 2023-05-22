import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Login from "views/examples/Login.js";
import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Overview",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Users",
    icon: "ni ni-circle-08 text-primary",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Departments",
    icon: "ni ni-building text-primary",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "My Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Logout",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  }
];
export default routes;
