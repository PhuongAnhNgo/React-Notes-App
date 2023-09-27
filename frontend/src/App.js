import Home from "./components/Home";
import NoteDetails from "./components/NoteDetails";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/NoteDetails",
      element: <NoteDetails/>,
    }
  ]);
  return (
    <div className="App">
    <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
