
import { useFormik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import { MDBInput } from 'mdb-react-ui-kit';

const Login = () => {
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      const res = await fetch('http://localhost:5000/user/authenticate', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'contet-Type': 'application/json'
        }
      });

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "success",
          text: "welcome to plantdoc"
        })
      }

    },
  });

  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="/images/flg_logo5147-removebg-preview.png"
                        style={{ width: 250 }}
                        alt="logo"
                        shape
                      />
                      <h4 classNpngame="mt-1 mb-5 pb-1">Welcome To PlantDoc</h4>
                    </div>
                    <form onSubmit={loginForm.handleSubmit}>
                      <p>Please login to your account</p>
                      <MDBInput label='Email' className="mb-4" id='email' onChange={loginForm.handleChange} value={loginForm.values.email} type='text' />
                      <MDBInput label='Password' type="password" className="mb-4" id='password' onChange={loginForm.handleChange} value={loginForm.values.password} />

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                          Log in
                        </button>
                        <a className="text-muted" href="#!">
                          Forgot password?
                        </a>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4" >
                        <hr className="bg-dark w-25 me-3" />
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <a className="text-muted me-3"
                        role="button"
                        href="/main/signup">
                      <button type="button" className="btn btn-outline-danger">
                        Create new
                      </button>
                        </a>
                        

                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <img
                      src="/images/flg_logo5147-removebg-preview.png"
                      className="img-fluid"
                      alt="sample image"
                    />
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;