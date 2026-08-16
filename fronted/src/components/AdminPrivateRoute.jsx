import { Navigate, Outlet } from "react-router-dom";


function AdminPrivateRoute(){

const token = localStorage.getItem("adminToken");


if(!token){

return <Navigate to="/admin-login"/>

}


return <Outlet/>;


}


export default AdminPrivateRoute;