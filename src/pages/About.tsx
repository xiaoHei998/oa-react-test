import React, { useState } from "react";
import { useTranslation } from "react-i18next";
const Text = () => {
  console.log("Text--updated");
  const { t } = useTranslation();

  return <div>{t("test.name")}</div>;
};
const Father = ({ children }: { children: React.ReactNode }) => {
  console.log("About--updated");
  const [count, setCount] = useState(0);
  return (
    <div className=" border-2 border-red-500">
      <h2 onClick={() => setCount(count + 1)}>Father{count}</h2>
      <div className=" border-2 border-blue-500">{children}</div>
    </div>
  );
};
const About: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <h1>{t("key")}</h1>
      <h1
        onClick={() => {
          i18n.changeLanguage("en");
        }}
      >
        About Page
      </h1>
      <p
        onClick={() => {
          i18n.changeLanguage("zh");
        }}
      >
        This is the About page.{" "}
      </p>

      <Father>
        <Text />
      </Father>
    </div>
  );
};

export default About;
