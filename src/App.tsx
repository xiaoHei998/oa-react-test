import { CurrentTimezoneProvider } from "./context/currentTimezoneContext";
import AppRouter from "./router";
import { Axios } from "./utils/request";
import { useEffect } from "react";
// import './i18n/index.ts'; // Ensure i18n is initialized
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
function App() {
  const onSignIn = async function () {
    console.log("onSignIn");
    //模拟登录
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
    setTimeout(() => {
      throw new Error("test error");
    }, 6000);
    if (!localStorage.getItem("signin-staff-base-info")) {
      onSignIn();
    }
  }, []);

  const initialTimezone = localStorage.getItem("timezone") || "";

  return (
    <>
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <CurrentTimezoneProvider initialTimezone={initialTimezone}>
          <AppRouter />
        </CurrentTimezoneProvider>
      </I18nextProvider>
    </>
  );
}

export default App;
