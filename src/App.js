import "./App.css";
import { Route, Routes } from "react-router-dom";
import OnboardingPage from "./pages/OnboardingPage";
import ChatBot from "./pages/ChatBot";
import Search from "./pages/Search";
import Home from "./pages/Home";
import Community from "./pages/Community";
import MyPage from "./pages/MyPage";
import Write from "./pages/Write";
import PostDetail from "./pages/PostDetail";
import SearchDetail from "./pages/SearchDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/home" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/write" element={<Write />} />
        <Route path="/postDetail/:id" element={<PostDetail />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/searchDetail/:id" element={<SearchDetail />} />
      </Routes>
    </div>
  );
}

export default App;
