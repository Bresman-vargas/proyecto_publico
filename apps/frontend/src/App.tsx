import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Suspense } from "react";
import Layout from "./components/Layout";
import Loader from "./components/Loader";

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
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader className="h-screen"/>;

  const privateRoutes = routes.filter((r) => r.private);
  const publicRoutes = routes.filter((r) => !r.private);

  return (
    <Suspense fallback={<Loader className="h-screen"/>}>
      <Routes>
        {/* PÚBLICAS*/}
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

        {/* PRIVADAS*/}
        <Route
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}
        >
          {privateRoutes.map((route, index) => (
            <Route
              key={`private-${index}`}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
