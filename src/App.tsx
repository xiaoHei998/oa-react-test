import { CurrentTimezoneProvider } from "./app/context/currentTimezoneContext";
import AppRouter from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./app/i18n";
import  '@/app/dashboard/routes'
function App() {

  const initialTimezone = localStorage.getItem("timezone") || "UTC";

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
