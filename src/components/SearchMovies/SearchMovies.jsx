import { Field, Formik, Form } from "formik";
import toast from "react-hot-toast";
import css from "./SearchMovies.module.css";

export default function SearchMovies({ onSearch }) {
  const handleSubmit = (value, action) => {
    if (value.query.trim() === "")
      return toast.error("Fill out the input field!");
    onSearch(value.query.trim());
    action.resetForm();
  };

  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <Field
          type="text"
          name="query"
          placeholder="Enter the title to search"
          autoComplete="off"
          autoFocus
          className={css.input}
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </Form>
    </Formik>
  );
}
