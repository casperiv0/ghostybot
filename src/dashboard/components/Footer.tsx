import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation("footer");

  return (
    <footer className="footer">
      <p>
        {t("created")} <a href="https://caspertheghost.me/">CasperTheGhost</a> |{" "}
        {t("not_affiliated")}
      </p>
    </footer>
  );
};

export default Footer;
