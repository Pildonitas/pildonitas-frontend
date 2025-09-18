import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import MedicationList from "../pages/MedicationList";
import MedicationDetail from "../pages/MedicationDetail";


const PildonitasRouter = createBrowserRouter([{
    path:"/",
    element:<App />,
    children:[
        {
            index:false,
        },
        {
            path: "/medicationslist",
            element: <MedicationList />
        },
        {
            path:"/viewmedication",
            element: <MedicationDetail />
        }
    ]
}])

export default PildonitasRouter;