import { CurrentTimezoneProvider } from "./context/currentTimezoneContext";
import AppRouter from "./router";
import { Axios } from "./utils/request";
import { useEffect } from "react";
function App() {
  const onSignIn = async function () {
    try {
      const { data } = await Axios.post("/sign-in", {
        username: "dev",
        password: "abc123",
      });
      //写入user_no和name到本地
      localStorage.setItem(
        "signin-staff-base-info",
        JSON.stringify({
          staff_id: data.staff_id,
          name: data.profile.name,
          role: data.profile.role,
          timezone: data.timezone.name,
        })
      );
    } catch (error) {
      console.log(error); 
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("signin-staff-base-info")) {
      onSignIn();
    }
  }, []);

  const initalTimezone =
    JSON.parse(localStorage.getItem("signin-staff-base-info") || "{}")
      ?.timezone || "";

  return (
    <>
      <CurrentTimezoneProvider initalTimezone={initalTimezone}>
        <AppRouter />
      </CurrentTimezoneProvider>
    </>
  );
}

export default App;
