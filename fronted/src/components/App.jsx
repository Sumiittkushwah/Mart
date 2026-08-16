import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useLocation 
} from "react-router-dom";


import Navbar from "./Navbar";


import Home from "./Home";
import About from "./About";
import Contact from "./Contact";


import Login from "./Login";
import Register from "./Register";
import AdminLogin from "./AdminLogin";


// Admin
import AdminDashboard from "./AdminDashboard";
import AdminRequests from "./AdminRequests";
import AdminClients from "./AdminClients";
import AdminReports from "./AdminReports";

import AdminPrivateRoute from "./AdminPrivateRoute";
import AdminLayout from "./AdminLayout";


// Client
import ClientPrivateRoute from "./ClientPrivateRoute";
import ClientLayout from "./ClientLayout";

import ClientDashboard from "./ClientDashboard";
import SendRequest from "./SendRequest";
import MyRequests from "./MyRequests";
import Profile from "./Profile";
import RequestSuccess from "./RequestSuccess";





function Layout(){


const location = useLocation();



const hideNavbar=[

"/login",
"/register",
"/admin-login",


"/admin-dashboard",
"/admin-requests",
"/admin-clients",
"/admin-reports",


"/client-dashboard",
"/send-request",
"/my-requests",
"/profile",
"/request-success"

];



return(

<>


{
!hideNavbar.includes(location.pathname)
&&
<Navbar/>
}



<Routes>



{/* =================
    PUBLIC ROUTES
================= */}



<Route 
path="/" 
element={<Home/>}
/>


<Route 
path="/about" 
element={<About/>}
/>


<Route 
path="/contact" 
element={<Contact/>}
/>


<Route 
path="/login" 
element={<Login/>}
/>


<Route 
path="/register" 
element={<Register/>}
/>


<Route 
path="/admin-login" 
element={<AdminLogin/>}
/>






{/* =================
    ADMIN ROUTES
================= */}



<Route element={<AdminPrivateRoute/>}>


<Route element={<AdminLayout/>}>


<Route

path="/admin-dashboard"

element={<AdminDashboard/>}

/>



<Route

path="/admin-requests"

element={<AdminRequests/>}

/>



<Route

path="/admin-clients"

element={<AdminClients/>}

/>



<Route

path="/admin-reports"

element={<AdminReports/>}

/>



</Route>


</Route>






{/* =================
    CLIENT ROUTES
================= */}



<Route element={<ClientPrivateRoute/>}>


<Route element={<ClientLayout/>}>


<Route

path="/client-dashboard"

element={<ClientDashboard/>}

/>



<Route

path="/send-request"

element={<SendRequest/>}

/>



<Route

path="/my-requests"

element={<MyRequests/>}

/>



<Route

path="/profile"

element={<Profile/>}

/>



<Route

path="/request-success"

element={<RequestSuccess/>}

/>



</Route>


</Route>






</Routes>



</>

);


}






function App(){


return(

<Router>

<Layout/>

</Router>

);


}



export default App;