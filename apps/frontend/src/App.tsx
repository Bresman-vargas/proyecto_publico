import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Suspense } from "react";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
import { AdminRoute } from "./components/AdminRoute"; 

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppRouter() {
  const { isAuthenticated } = useAuth();

  const publicRoutes = routes.filter((r) => !r.private);
  const privateRoutes = routes.filter((r) => r.private);

  const standardPrivateRoutes = privateRoutes.filter((r) => !r.adminOnly);
  const adminPrivateRoutes = privateRoutes.filter((r) => r.adminOnly);

  return (
    <Suspense fallback={<Loader className="h-screen"/>}>
      <Routes>
        {/* PÚBLICAS */}
        {publicRoutes.map((route, index) => (
          <Route
            key={`public-${index}`}
            path={route.path}
            element={
              route.restricted && isAuthenticated ? (
                <Navigate to="/explore" replace />
              ) : (
                <route.component />
              )
            }
          />
        ))}

        {/* PRIVADAS (Cualquiera que esté logueado entra aquí y renderiza el Layout) */}
        <Route
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}
        >
          {/* A. Rutas privadas estándar (User y Admin pueden verlas) */}
          {standardPrivateRoutes.map((route, index) => (
            <Route
              key={`private-standard-${index}`}
              path={route.path}
              element={<route.component />}
            />
          ))}

          {/* B. Sub-capa de protección: Solo si además es Administrador */}
          <Route element={<AdminRoute />}>
            {adminPrivateRoutes.map((route, index) => (
              <Route
                key={`private-admin-${index}`}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;