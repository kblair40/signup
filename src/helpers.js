// export const setPopperContent = (name) => {};
import store from "./store/index";
import { useSelector } from "react-redux";
console.log("store:", store);

export const getStoreState = store.subscribe(() => {
  const storeState = store.getState();
  //   console.log("storeState:", storeState.auth);
  return storeState.auth;
});

export const validators = {
  usernameLength: (username) =>
    // must be at least 7 characters and no more than 15 characters
    username.length >= 7 && username.length <= 15,
  usernameChars: (username) => {
    const regex = /^[a-z0-9]+$/i;
    return regex.test(username);
  },
  emailChars: (email) => {
    const generalRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const endRegex = /net|com|org|info|biz|pro|cat|edu$/i;
    return generalRegex.test(email) && endRegex.test(email);
  },
  passwordChars: (password) => {
    console.log("password received:", password);
    const regex = /^[a-zA-Z0-9_!@$&*]{1,20}$/i;
    console.log("returning", regex.test(password));
    return regex.test(password);
  },
  passwordLength: (password) =>
    // must be at least 8 characters and no more than 16 characters
    password.length >= 8 && password.length <= 16,
  passwordsMatch: (pwd1, pwd2) => pwd1 === pwd2,
};

export const setClasses = (input) => {
  const storeState = getStoreState;
  console.log("storeState:", storeState);
};
