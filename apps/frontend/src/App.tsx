  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
  import { routes } from "./routes";
  import { AuthProvider, useAuth } from "./context/AuthContext";

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

    return (
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              // Lógica de protección
              route.private && !isAuthenticated ? (
                <Navigate to="/login" replace />
              ) : route.restricted && isAuthenticated ? (
                <Navigate to="/prote" replace />
              ) : (
                <route.component />
              )
            }
          />
        ))}

        {/* Redirecciones automáticas */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    );
  }

export default App;
