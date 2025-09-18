import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx"


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