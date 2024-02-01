import Layout from "./layout/Layout";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            duration: 2000,
            position: "top-center",
            className: "bg-green-600 text-white",
          },
          error: {
            duration: 2000,
            position: "top-center",
            className: "bg-red-600 text-white",
          },
        }}
      />
      <Layout />
    </>
  );
}

export default App;
