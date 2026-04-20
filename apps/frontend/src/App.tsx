import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Suspense } from "react";
import Layout from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-bg">
    <div className="animate-spin size-12 border-4 border-accent border-t-transparent rounded-full"></div>
  </div>
);

function AppRouter() {
  const { isAuthenticated, loading } = useAuth();

  const devMode = false; 

  const canAccess = devMode || isAuthenticated;

  if (loading && !devMode) <PageLoader />;

  const privateRoutes = routes.filter(r => r.private);
  const publicRoutes = routes.filter(r => !r.private);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* PÚBLICAS*/}
        {publicRoutes.map((route, index) => (
          <Route
            key={`public-${index}`}
            path={route.path}
            element={
              route.restricted && canAccess ? (
                <Navigate to="/feed" replace />
              ) : (
                <route.component />
              )
            }
          />
        ))}

        {/* PRIVADAS*/}
        <Route
          element={
            canAccess ? <Layout /> : <Navigate to="/login" replace />
          }
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
