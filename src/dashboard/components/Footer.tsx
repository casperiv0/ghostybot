import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation("footer");

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.push(router.pathname, router.pathname, { locale: e.target.value });
  }

  return (
    <footer className="footer">
      <p>
        {t("created")} <a href="https://caspertheghost.me/">CasperTheGhost</a> |{" "}
        {t("not_affiliated")}
      </p>

      <select onChange={handleChange} className="select-language">
        <option value="en">English</option>
        {/* <option value="ru">Russian</option> */}
      </select>
    </footer>
  );
};

export default Footer;
