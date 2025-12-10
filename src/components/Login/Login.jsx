import styles from "./Login.module.css";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
// import api from "../../api";
import useAPI from "../../hooks/useAPI";
import { useLoginTemplate } from "../../hooks/useLoginTemplate";
import { OneColLogin } from "./OneColLogin";
import { TwoColsLogin } from "./TwoColsLogin";

function Login(props) {
  const [authResults, setAuthResults] = useState("");
  const api = useAPI();
  const { template, setTemplate } = useLoginTemplate();

  let navigate = useNavigate();

  async function login(formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const result = await api.auth.login(username, password);
      if (result.info) {
        setAuthResults(result.info.message);
        return;
      }

      localStorage.setItem(
        "myinterests_app_access",
        JSON.stringify({
          username: result.username,
          token: result.token,
        })
      );

      navigate(0);
    } catch (e) {
      throw new Error(`login error: ${e.message}`);
    }
  }

  useEffect(() => {
    setTemplate("2-columns");
  }, []);

  return (
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <title>{`Login | ${props.sitename}`}</title>
      {template === "1-column" && (
        <OneColLogin login={login} authResults={authResults} styles={styles} />
      )}

      {template === "2-columns" && (
        <TwoColsLogin login={login} authResults={authResults} styles={styles} />
      )}
    </ErrorBoundary>
  );
}

export default Login;
