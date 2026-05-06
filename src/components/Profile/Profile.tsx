import React, { useEffect, useState } from "react";

import { updateUser } from "../../features/user/userSlice";

import styles from "../../styles/Profile.module.css";
import { useAppDispatch, useAppSelector } from "../App/hooks";

type ProfileFormValues = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(({ user }) => user);

  const [values, setValues] = useState<ProfileFormValues>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;

    dispatch(updateUser({ ...currentUser, ...values }));
  };

  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span>You need to log in</span>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.group}>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.group}>
            <input
              type="name"
              placeholder="Your name"
              name="name"
              value={values.name}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.group}>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              value={values.password}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.group}>
            <input
              type="avatar"
              placeholder="Your avatar"
              name="avatar"
              value={values.avatar}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submit}>
            Update
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;
