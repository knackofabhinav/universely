import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
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
import PrivateRoute from "./features/userAuth/PrivateRoute.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./features/profile/profileSlice";
import axios from "axios";
import { setInitialAPI } from "./utils/api";
import { Explore } from "./pages/explore/Explore";
import { Followers } from "./pages/followers/Followers";

function App() {
  setInitialAPI();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { username } = isLoggedIn && JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async function () {
      const res = await axios.get(`${username}`);
      dispatch(setUser(res.data.user));
    })();
  }, [username, dispatch]);

  return (
    <div className="App">
      <Navigation />
      {/* DESKTOP VIEW */}
      {isLoggedIn ? (
        <Grid
          templateColumns="repeat(3, 1fr)"
          display={["none", "none", "flex", "flex"]}
        >
          <GridItem>
            <SideBar />
          </GridItem>
          <GridItem>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <PrivateRoute exact path="/" element={<Homepage />} />
              <PrivateRoute path="/profile/:username" element={<Profile />} />
              <PrivateRoute
                path="/following/:username"
                element={<Following />}
              />
              <PrivateRoute
                path="/followers/:username"
                element={<Followers />}
              />

              <PrivateRoute path="/notifications" element={<Notifications />} />
            </Routes>
          </GridItem>
          <GridItem>
            <RightBar />
          </GridItem>
        </Grid>
      ) : (
        <Flex justify="center" display={["none", "none", "flex", "flex"]}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Flex>
      )}

      {/* Mobile View */}
      <Flex display={["flex", "flex", "none", "none"]}>
        <Routes>
          <PrivateRoute path="/profile/:username" element={<Profile />} />
          {!isLoggedIn && <Route path="/login" element={<Login />} />}
          {!isLoggedIn && <Route path="/signup" element={<Signup />} />}
          <PrivateRoute path="/" element={<Homepage />} />
          <PrivateRoute path="/following/:username" element={<Following />} />
          <PrivateRoute path="/followers/:username" element={<Followers />} />
          <PrivateRoute path="/notifications" element={<Notifications />} />
          <PrivateRoute path="/explore" element={<Explore />} />
        </Routes>
      </Flex>
    </div>
  );
}

export default App;
