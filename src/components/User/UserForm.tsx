import UserSignupForm from "./UserSignupForm";
import UserLoginForm from "./UserLoginForm";

import styles from "../../styles/User.module.css";
import { toggleForm, toggleFormType } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../App/hooks";

const UserForm = () => {
  const dispatch = useAppDispatch();

  const { showForm, formType } = useAppSelector(({ user }) => user);

  const closeForm = () => dispatch(toggleForm(false));
  const toggleCurrentFormType = (type: "signup" | "login") => dispatch(toggleFormType(type));

  return showForm ? (
    <>
      <div className={styles.overlay} onClick={closeForm} />
      {formType === "signup" ? (
        <UserSignupForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      ) : (
        <UserLoginForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      )}
    </>
  ) : (
    <></>
  );
};

export default UserForm;
