import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import MyRisks from "views/examples/MyRisks.js";
import Reports from "views/examples/Reports.js";



var roRoutes = [
  {
    
    path: "/index",
    name: "Overview",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/riskOwner",
    
  },

  {
   
    path: "/MyRisks",
    name: "My Risks",
    icon: "ni ni-world-2 text-primary",
    component: MyRisks,
    layout: "/riskOwner"
  },

  
  {
    path: "/Reports",
    name: "Reports",
    icon: "ni ni-single-copy-04 text-primary",
    component: Reports,
    layout: "/riskOwner"
  },
  {
    path: "/Profile",
    name: "My Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/riskOwner"
  },
  {
    path: "/login",
    name: "Logout",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
 
];
export default roRoutes;