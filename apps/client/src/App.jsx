import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./component/Homepage";
import Loginform from "./component/Loginform";
import CreateAccount from "./component/CreateAccount";
import Testing from "./component/Testing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Profile from "./component/Profile";
import FriendProfile from "./component/FriendProfile";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Loginform />} />
            <Route path="/CreateAccount" element={<CreateAccount />} />
            <Route path="/Homepage" element={<Homepage />} />
            <Route path="/testing" element={<Testing />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/friend" element={<FriendProfile />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
