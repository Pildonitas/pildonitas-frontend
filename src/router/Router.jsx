import { createBrowserRouter } from "react-router-dom";
import App from "../App";


const PildonitasRouter = createBrowserRouter([{
    path:"/",
    element:<App />,
    children:[
        {
            index:true,
            element:<Home />
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