import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAllSignUpUsers, SignUpUser } from "../apicalls/SignUpApi";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long")
    .required("Username is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),

  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),

  organization: Yup.string().required("Organization is required"),

  role: Yup.string()
    .oneOf(["user", "admin"], "Invalid role")
    .required("Role is required"),
});

const SignUp = () => {
  const [organizations, setOrganizations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await getAllSignUpUsers(); 
        setOrganizations(response.data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleSubmit = async (values) => {
    await SignUpUser(values)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmpassword: "",
          organization: "",
          role: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form action="post">
            <div className="form-header">
              <img
                src="https://superiorapp.s3.ap-south-1.amazonaws.com/appsmith_logo.png"
                alt=""
              />
              <h3>Create an account</h3>
            </div>
            <div className="form-main">
              <div className="fields">
                <label htmlFor="username">Username</label>
                <Field
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                />
                <ErrorMessage name="username" component="div" className="error" />
              </div>
              <div className="fields">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="fields">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <div className="fields">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <Field
                  type="password"
                  placeholder="Confirm your password"
                  name="confirmpassword"
                />
                <ErrorMessage name="confirmpassword" component="div" className="error" />
              </div>
              <div className="fields">
                <label htmlFor="organization">Organization</label>
                <Field name="organization" as="select">
                  <option value="">Select your Organization</option>
                  {organizations.map((org) => (
                    <option key={org._id} value={org._id}>
                      {org.organization}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="organization" component="div" className="error" />
              </div>
              <div className="fields">
                <label htmlFor="role">Role</label>
                <Field name="role" as="select">
                  <option value="">Select your role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Field>
                <ErrorMessage name="role" component="div" className="error" />
              </div>
              <div className="fields">
                <button type="submit">Sign Up</button>
              </div>
            </div>
            <div className="form-footer">
              <div className="form-footer-bottom">
                <span>Already have an account?</span>
                <Link to="/login" className="sign-up-link">
                  Sign In
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
