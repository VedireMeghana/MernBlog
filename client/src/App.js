import "./App.css";
import Post from "./post";
import Header from "./header";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePost";
import { UserContextProvider } from "./UserContext";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import LogoutPage from "./pages/LogoutPage";
function App() {
  return (
    <UserContextProvider>
      <Routes>
          <Route path={"/"} element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="/index" element={<IndexPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/create" element={<CreatePost/>}></Route>
          <Route path="/post/:id" element={<PostPage/>}></Route>
          <Route path="/edit/:id" element={<EditPost/>}></Route>
          <Route path="/logout" element={<LogoutPage/>}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
