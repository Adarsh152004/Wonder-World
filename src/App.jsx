
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"

// import Product from "./pages/Product"
// import Pricing from "./pages/Pricing"
// import HomePage from "./pages/HomePage"
// import AppLayout from "./pages/AppLayout"
// import Dashboard from "./pages/Dashboard"
// import PageNotFound from "./pages/PageNotFound"
// import Login from "./pages/Login"

const HomePage = lazy(() => import('./pages/HomePage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));

import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import { CitiesProvider } from "./contexts/CitiesContext"
import Form  from "./components/Form"
import SpinnerFullPage from "./components/SpinnerFullPage"
import { AuthProvider } from "./contexts/FakeAuthContext"
import ProtectedRoute from "./pages/ProtectedRoute"

// import DashboardTab from "./pages/DashboardTab"

function App() {

  return (
    <AuthProvider>
    <CitiesProvider>
    <BrowserRouter>
    <Suspense fallback={<SpinnerFullPage />}>
       <Routes>
         <Route path='/' element={<HomePage />} />
         <Route path='product' element={<Product />} />
         <Route path='login' element={<Login />} />
         <Route path='/pricing' element={<Pricing />} />
         <Route path='/dashboard' element={<Dashboard />} />
          {/* <Route path="dashboard/:id" element={<DashboardTab />} /> */}
          
         <Route path='/app' element={ 
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
          }>
            <Route index element={<Navigate replace to='cities' />} />
             <Route path="cities" element={<CityList />} />
             <Route path="cities/:id" element={<City />} />
             <Route path="countries" element={<CountryList />} />
             <Route path="form" element={<Form />} />
         </Route>
         <Route path="*" element={<PageNotFound />} />
       </Routes>
      </Suspense>
    </BrowserRouter>
    </CitiesProvider>
  </AuthProvider>
  )
}

export default App;

