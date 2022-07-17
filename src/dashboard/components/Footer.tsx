import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import * as React from "react";

export function Footer() {
  const [locale, setLocale] = React.useState("");
  const router = useRouter();
  const { t } = useTranslation("footer");

  React.useEffect(() => {
    setLocale(window.localStorage.getItem("bot_locale") || "en");
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const locale = e.target.value;
    if (router.locale === locale) return;
    window.localStorage.setItem("bot_locale", locale);

    router.push(router.pathname, router.asPath, { locale: e.target.value });
  }

  return (
    <footer className="footer">
      <p>
        {t("created")} <a href="https://caspertheghost.me/">CasperTheGhost</a> |{" "}
        {t("not_affiliated")}
      </p>

      <select value={locale} onChange={handleChange} className="select-language">
        <option value="en">English</option>
        <option value="ru">Russian</option>
        <option value="nl">Dutch</option>
        <option value="de">German</option>
      </select>
    </footer>
  );
}
