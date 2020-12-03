import { useRouter } from "next/router";
import { useEffect } from "react";

const Named = () => {
  const router = useRouter();

  useEffect(() => {
    return router.push("/dashboard");
  }, [router]);

  return null;
};

export default Named;
