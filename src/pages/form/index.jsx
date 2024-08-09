"use client";
import GameLayout from "@/layouts/GameLayout";
import { useEffect, useState } from "react";
import styles from "@/styles/Form.module.css";
import axios from "axios";
import { Roboto, Press_Start_2P } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: "400" });
const start = Press_Start_2P({ subsets: ["latin"], weight: "400" });
import { useLoginContext } from "@/context/LoginContext";
import { useRouter } from "next/router";

const Index = () => {
  const { isLoged, user, logOut, token } = useLoginContext();
  console.log(token);
  console.log(user);
  const router = useRouter();

  const initialState = {
    category: "",
    question: "",
    options: [
      {
        op: 1,
        answerText: "",
        isCorrect: false,
      },
      {
        op: 2,
        answerText: "",
        isCorrect: false,
      },
      {
        op: 3,
        answerText: "",
        isCorrect: false,
      },
    ],
  };
  const [message, setMessage] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [tokenExpired, setTokenExpired] = useState(false);

  console.log(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (e, op) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      options: formData.options.map((option) => {
        if (option.op === op) {
          return {
            ...option,
            [name]: value,
            isCorrect: checked,
          };
        }
        return option;
      }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/game/Questions/",
        formData
      );
      setMessage("Question Added With Succes");
      console.log(response);
    } catch (error) {
      console.error(error);
      seterrorMessage("Error: Question not added");
    }
    setFormData(initialState);
  };

  const isTokenExpired = (token) => {
    console.log(token);
    if (!token) {
      return true;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expired = payload.exp * 1000;
      return Date.now() >= expired;
    } catch (error) {
      console.log(error, "true");
      return true;
    }
  };

  useEffect(() => {
    const checkToken = () => {
      if (isTokenExpired(token)) {
        setTokenExpired(true);
        router.push("/");
      }
    };

    checkToken();
    const intervalChek = setInterval(checkToken, 20000);
    return () => clearInterval(intervalChek);
  }, [token, router]);
  
  if (tokenExpired) {
    return null;
  }
  return (
    <>
      <div className={roboto.className}>
        <button onClick={logOut}>LogOut</button>
        <h1>Playing:{user?.nickName}</h1>
        <GameLayout title="QuestionHandler" />
        <div className={styles.title}>
          <h3 className={start.className}>Add Question</h3>
        </div>
        <h3 className={styles.message}>{message}</h3>
        <h3 className={styles.error_message}>{errorMessage}</h3>
        <section className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="select">Category:</label>
              <select
                className={styles.select}
                name="category"
                id="category"
                onChange={handleInputChange}
              >
                <option value="#">Choose Category</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <label htmlFor="name">Question:</label>
              <input
                type="text"
                id="question"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.options}>
              Options:
              <br />
              <input
                type="text"
                name="answerText"
                value={formData.options[0].answerText}
                onChange={(e) => handleOptionChange(e, 1)}
                className={styles.optionInput}
                placeholder="Option 1"
              />
              <label>
                Is correct?
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  name="isCorrect"
                  checked={formData.options[0].isCorrect}
                  onChange={(e) => handleOptionChange(e, 1)}
                />
              </label>
              <input
                placeholder="Option 2"
                type="text"
                name="answerText"
                value={formData.options[1].answerText}
                onChange={(e) => handleOptionChange(e, 2)}
                className={styles.optionInput}
              />
              <label>
                Is correct?
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  name="isCorrect"
                  checked={formData.options[1].isCorrect}
                  onChange={(e) => handleOptionChange(e, 2)}
                />
              </label>
              <input
                placeholder="Option 3"
                type="text"
                name="answerText"
                value={formData.options[2].answerText}
                className={styles.optionInput}
                onChange={(e) => handleOptionChange(e, 3)}
              />
              <label>
                Is correct?
                <input
                  type="checkbox"
                  name="isCorrect"
                  className={styles.checkbox}
                  checked={formData.options[2].isCorrect}
                  onChange={(e) => handleOptionChange(e, 3)}
                />
              </label>
              <button className={styles.btn} type="submit">
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Index;
