import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import app_config from '../../config';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { MDBInput } from 'mdb-react-ui-kit';

const AddCure = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('admin')));

  const [selImage, setSelImage] = useState('');

  const { apiUrl } = app_config;

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    setSelImage(file);
    const fd = new FormData();
    fd.append('myfile', file);
    fetch(apiUrl + '/util/uploadfile', {
      method: 'POST',
      body: fd
    }).then((res) => {
      if (res.status === 200) {
        console.log('file uploaded');
        toast.success('File Uploaded!!');
      }
    });
  };
  const addCureForm = useFormik({
    initialValues: {
      title: '',
      type: '',
      image: '',
      description: '',
      price: 0,
      createdAt: new Date()
    },
    onSubmit: async (values, { setSubmitting }) => {
      // setSubmitting(true);
      values.image = selImage.name;
      console.log(values);

      const res = await fetch('http://localhost:5000/cure/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(res.status);

      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Nice',
          text: 'You have successfully registered'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'opps!!',
          text: 'something went worng'
        });
      }
    }
  });

  return (
    <div>
      <div className="my-5 container">
        {/* <h2>Add New Equipment</h2> */}
        <div className="card">
          <div className="card-body">
            <div className="g-0 row">
              <div className="col-md-6">
                <div>
                  {/* <h1>Upload and Display Image usign React Hook's</h1> */}

                  {selectedImage && (
                    <div>
                      <img alt="not found" width={'500px'} src={URL.createObjectURL(selectedImage)} />
                      <br />
                      <button onClick={() => setSelectedImage(null)}>Remove</button>
                    </div>
                  )}

                  <br />
                  <br />

                  <label htmlFor="upload-image" className="btn btn-primary" style={{ margin: 20 }}>
                    Upload Image
                  </label>
                  <input hidden id="upload-image" type="file" onChange={uploadImage} />
                </div>
              </div>

              <div className="col-md-6">
                <div className=" card-body d-flex flex-column">
                  <form onSubmit={addCureForm.handleSubmit}>
                    <MDBInput
                      wrapperClass="mb-4"
                      id="title"
                      type="title"
                      label="Title"
                      value={addCureForm.values.title}
                      onChange={addCureForm.handleChange}
                      className="form-control form-control-lg"
                    />

                    <MDBInput
                      wrapperClass="mb-4"
                      id="description"
                      type="Description"
                      label="Description"
                      value={addCureForm.values.description}
                      onChange={addCureForm.handleChange}
                    />

                    <MDBInput wrapperClass="mb-4" type="price" id="price" label="price" value={addCureForm.values.price} onChange={addCureForm.handleChange} />

                    <MDBInput wrapperClass="mb-4" id="type" label="Type" value={addCureForm.values.type} onChange={addCureForm.handleChange} />

                    <button className="btn btn-primary" style={{ margin: 10 }}>
                      Save
                    </button>
                    <button className="btn btn-primary" style={{ margin: 10 }}>
                      Save & Add Another
                    </button>
                    <button className="btn btn-primary" style={{ margin: 10 }}>
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Managecure = () => {

    const [cureList, setCureList] = useState([]);
    const [masterList, setMasterList] = useState([]);

    const { apiUrl } = app_config;
  

  const fetchUserData = async () => {
    const res = await fetch('http://localhost:5000/cure/getall');
    console.log(res.status);
    const data = await res.json();
    console.log(data);
    setCureList(data);
    setMasterList(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const deleteCure = async (id) => {
    const res = await fetch(apiUrl + '/cure/delete/' + id, { method: 'DELETE' });

    if (res.status === 200) {
      toast.success('Cure Deleted');
      fetchUserData();
    }
  };

  return (
    <div>
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <AddCure />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <header>Manage Cure</header>
      <main>
        <div className="container">
          <button className="btn btn-lg btn-success float-end" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
            <i class="fa fa-plus-circle" aria-hidden="true"></i> Add New Cure
          </button>
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  Title
                </th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">image</th>
                <th scope="col">Seller</th>
                <th scope="col">Created At</th>
              </tr>
            </thead>
            <tbody>
              {cureList.map((cure) => (
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={apiUrl + '/' + cure.image}
                        alt=""
                        style={{ height: '45px' }}
                        // className='rounded-circle'
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{cure.title}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{cure.description}</p>
                  </td>
                  <td>{cure.price}</td>
                  <td>{cure.category}</td>
                  <td>{new Date(cure.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-link">Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={(e) => deleteCure(cure._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Managecure;
