import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("test1234");
  const [name, setName] = useState('');

  const {login, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const generatedEmail = `${name.toLowerCase()}@gmail.com`;
    
    if(password && name) login(generatedEmail,password, name);
  }

  useEffect(function () {
    if(isAuthenticated) {
      navigate('/app', {replace: true });
    }
  },[isAuthenticated, navigate]);

  useEffect(() => {
  setEmail(`${name.toLowerCase()}@gmail.com`);
}, [name]);


  return (
    <main className={styles.login}>

      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name">Your Name</label>
          <input
            type="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled
          />
        </div>

        <div>
          <Button type='primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}
