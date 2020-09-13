import { useEffect } from "react";
import { Formik, ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../api/auth-api";
import { getMeThunk } from "../../utils/redux/slices/user";
import FieldError from "../../utils/components/field-error";
import * as sessionHelper from "../../helpers/session-helper";
import { initLoginFormValue, loginSchema } from "../../forms/login";

export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  /**
   * Login handler with user credentials
   * @param values
   * @param setSubmitting
   */
  const loginHandler = (values, { setSubmitting }) => {
    login(values).then(
      (res) => {
        sessionHelper.seed(res.data);
        dispatch(getMeThunk()).then(() => {
          setSubmitting(false);
        });
      },
      (err) => {
        console.log(err.response.data);
        setSubmitting(false);
      }
    );
  };

  return (
    <div>
      <Formik
        initialValues={initLoginFormValue}
        validationSchema={loginSchema}
        onSubmit={loginHandler}
        enableReinitialize={true}
      >
        {({ handleSubmit, dirty, isValid, isSubmitting }) => {
          return (
            <form onSubmit={handleSubmit} className="text-center">
              <h5 className="card-title">Login</h5>

              <div className="form-label-group mb-3 text-left">
                <label htmlFor="inputEmail">Email address</label>
                <Field
                  autoFocus
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="a@b.com"
                  autoComplete="email"
                />
                <ErrorMessage
                  name="email"
                  render={(msg) => <FieldError msg={msg}></FieldError>}
                />
              </div>

              <div className="form-label-group mb-3 text-left">
                <label htmlFor="inputPassword">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="12345678"
                />
                <ErrorMessage
                  name="password"
                  render={(msg) => <FieldError msg={msg}></FieldError>}
                />
              </div>

              <div className="form-label-group mb-3">
                <button
                  disabled={!(dirty && isValid) || isSubmitting}
                  type="submit"
                  className="btn btn-primary"
                >
                  Login
                </button>
              </div>
              <p>{user.name}</p>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
