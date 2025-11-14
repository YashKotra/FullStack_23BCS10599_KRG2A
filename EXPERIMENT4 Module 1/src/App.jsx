import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { Toaster } from "sonner";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import CollectionPage from "./Pages/CollectionPage";
import ProductDetail from "./Components/Products/ProductDetail";
import Checkout from "./Components/Cart/Checkout";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage";
import OrderDetails from "./Pages/OrderDetails";
import MyOrdersPage from "./Pages/MyOrdersPage";
import AboutUs from "./Pages/AboutUs";
import AdminLayout from "./Components/Admin/AdminLayout";
import UserManagement from "./Components/Admin/UserManagement";
import ProductManagement from "./Components/Admin/ProductManagement";
import AdminHomePage from "./Components/Admin/AdminHomePage";
import EditProductPage from "./Components/Admin/EditProductPage";
import OrderManagement from "./Components/Admin/OrderManagement";
import ProtectedRoute from "./Components/Common/ProtectedRoute";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="collections/:collection"
              element={<CollectionPage />}
            />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="checkout" element={<Checkout />} />
            <Route
              path="order-confirmation"
              element={<OrderConfirmationPage />}
            />
            <Route path="order/:id" element={<OrderDetails />} />
            <Route path="my-orders" element={<MyOrdersPage />} />
            <Route path="AboutUs" element={<AboutUs />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHomePage />} />{" "}
            {/* Default admin dashboard */}
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
