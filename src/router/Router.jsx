import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import MedicationList from "../pages/MedicationList";
import MedicationDetail from "../pages/MedicationDetail";
import MedForm from "../components/Form";


const PildonitasRouter = createBrowserRouter([{
    path:"/",
    element:<App />,
    children:[
        {
            index:true,
            element: <Home />
        },
        {
            path: "/medicationslist",
            element: <MedicationList />
        },
        {
            path:"/viewmedication/:id",
            element: <MedicationDetail />
        },
        {
            path:"/add-medication",
            element: <MedForm />
        },
        {
            path:"/edit-medication/:id",
            element: <MedForm />
        }
    ]
}])

export default PildonitasRouter;