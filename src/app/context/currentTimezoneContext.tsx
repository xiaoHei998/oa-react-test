import { createContext, useContext, useState } from "react";

interface ICurrentTimezoneContext {
  timezone: string;
  setTimezone: (timezone: string) => void;
}
export const CurrentTimezoneContext = createContext<ICurrentTimezoneContext>({
  timezone: "",
  setTimezone: () => {},
});


export const CurrentTimezoneProvider = ({
  children,
  initialTimezone,
}: {
  children: React.ReactNode;
  initialTimezone?: string;
}) => {
  const [timezone, setTimezone] = useState(initialTimezone ?? '');

  return (
    <CurrentTimezoneContext.Provider
      value={{ timezone, setTimezone }}
    >
      {children}
    </CurrentTimezoneContext.Provider>
  );
};


// 导出使用
export function useCurrentTimezone() {
  return useContext(CurrentTimezoneContext);
}
