import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import RGSs from "views/examples/RGS.js";
import DepartmentManagement from "views/examples/DepartmentManagement.js";

var gRoutes = [
  {
    path: "/index",
    name: "Overview",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/governance"
  },

  {
    path: "/RGS",
    name: "RGS",
    icon: "ni ni-circle-08 text-primary",
    component: RGSs,
    layout: "/governance"
  },

  
  {
    path: "/DepartmentManagement",
    name: "Departments",
    icon: "ni ni-building text-primary",
    component: DepartmentManagement,
    layout: "/governance"
  },
  {
    path: "/Profile",
    name: "My Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/governance"
  },
  
  {
    path: "/login",
    name: "Logout",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/Icons",
    name: "Icons",
    icon: "ni ni-circle-08 text-pink",
    component: Icons,
    layout: "/governance"
  }
 
];
export default gRoutes;