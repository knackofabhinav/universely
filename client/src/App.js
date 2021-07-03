import React, { useEffect } from "react";
// import { Counter } from "./features/counter/Counter";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/navigation/Navigation";
import { Homepage } from "./pages/home/Homepage";
import { Profile } from "./pages/profile/Profile";
import { SideBar } from "./components/sideBar/SideBar";
import { Grid, GridItem, Flex } from "@chakra-ui/react";
import { RightBar } from "./components/rightBar/RightBar";
import { Following } from "./pages/following/Following";
import { Notifications } from "./pages/notifications/Notifications";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";
import { useSelector } from "react-redux";
import { API } from "./utils/api";

function App() {
  const posts = useSelector((state) => state.posts);
  // console.log(posts);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await API.get("/users/60d838216a437b48441b2516");
  //       console.log(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  return (
    <div className="App">
      <Navigation />
      <Grid
        templateColumns="repeat(3, 1fr)"
        display={["none", "none", "flex", "flex"]}
      >
        {/* <Counter /> */}
        <GridItem>
          <SideBar />
        </GridItem>
        <GridItem>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route exact path="/" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/following" element={<Following />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </GridItem>
        <GridItem>
          <RightBar />
        </GridItem>
      </Grid>

      {/* Mobile View */}
      <Flex display={["flex", "flex", "none", "none"]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/following" element={<Following />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Flex>
    </div>
  );
}

export default App;
