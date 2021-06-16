import React from "react";
// import { Counter } from "./features/counter/Counter";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/navigation/Navigation";
import { Homepage } from "./pages/home/Homepage";
import { Profile } from "./pages/profile/Profile";
import { SideBar } from "./components/sideBar/SideBar";
import { Flex } from "@chakra-ui/react";
import { RightBar } from "./components/rightBar/RightBar";
import { Friends } from "./pages/friends/Friends";
import { Notifications } from "./pages/notifications/Notifications";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Flex>
        {/* <Counter /> */}
        <SideBar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
        <RightBar />
      </Flex>
    </div>
  );
}

export default App;
