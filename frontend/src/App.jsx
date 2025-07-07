import { useEffect, useState } from "react";
import Index from "./main/Index";
import Search from "./main/Search";
import Contact from "./main/Contact";
import Error from "./main/Error";
import { BrowserRouter, Route, Routes } from "react-router";
import SignIn from "./main/SignIn";
import SignUp from "./main/SignUp";
import RecipeDetails from "./main/RecipeDetails";
import Profile from "./main/Profile";
import Add_Recipe from "./main/Add_Recipe";
import Preloader from "./main/components/Loader";
import ProtectedRoute from "./main/components/ProtectedRoute";
import Admin from "./main/Admin";
import OAuthSuccess from "./main/OAuthSuccess";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* {loading ? (
        <Preloader />
      ) : ( */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/recipeDetails/:id"
            element={
              <ProtectedRoute>
                <RecipeDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/oauth-success"
            element={
              <ProtectedRoute>
                <OAuthSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addrecipe"
            element={
              <ProtectedRoute>
                <Add_Recipe />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      {/* )} */}
    </>
  );
}

export default App;
