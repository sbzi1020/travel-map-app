import { createBrowserRouter } from 'react-router-dom';
import App from "./App"
import Login from "./pages/Login";
import Register from './pages/Register';
// import Register from './pages/Register';
// const Layout = () => {
//   return (
//     <div className="app">
//       <Navbar />
//       <Outlet />
//       <Footer />
//     </div>
//   );
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/products/:id",
//         element: <Products />,
//       },
//       {
//         path: "/product/:id",
//         element: <Product />,
//       },
//     ],
//   },
// ]);
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },
])
export default router
