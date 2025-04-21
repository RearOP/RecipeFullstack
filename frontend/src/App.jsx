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
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/recipeDetails/:id" element={<RecipeDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addrecipe" element={<Add_Recipe />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
