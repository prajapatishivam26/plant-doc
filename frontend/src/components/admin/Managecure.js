import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import app_config from '../../config';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';

const Managecure = () => {

    const [selectedImage, setSelectedImage] = useState(null);
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('admin')));

    const [selImage, setSelImage] = useState('');

    const [cureList, setCureList] = useState([]);
  
    const {apiUrl} = app_config;
  
    const uploadImage = async (e) => {
      const file = e.target.files[0];
      setSelImage(file);
      const fd = new FormData();
      fd.append("myfile", file);
      fetch(apiUrl + "/util/uploadfile", {
        method: "POST",
        body: fd,
      }).then((res) => {
        if (res.status === 200) {
          console.log("file uploaded");
          toast.success("File Uploaded!!");
        }
      });
    }
  const addCureForm = useFormik({
    initialValues: {
      title : '',
      description : '',
      price : '',
      seller : currentUser._id,
      category : '',
      image : '',
      createdAt: new Date()
    },
    onSubmit: async (values, {setSubmitting}) => { 
      // setSubmitting(true);
      values.image = selImage.name;
      console.log(values);
  
      const res = await fetch('http://localhost:5000/equipment/add',{
        method: 'POST',
        body : JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log(res.status);
  
      if(res.status === 200){
  
        Swal.fire({
          icon : 'success',
          title : 'Nice',
          text : 'You have successfully registered'
        })
      } else {
        Swal.fire({
          icon : 'error',
          title : 'opps!!',
          text : 'something went worng'
        })
      }
      
    },
  
   });

   const fetchUserData = async () => {
    const res = await fetch('http://localhost:5000/equipment/getall');
    console.log(res.status);
    const data = await res.json();
    console.log(data);
    setUserList(data);
    setMasterList(data);
  }

  useEffect(() => {
    fetchUserData();

  }, [])

  const [search, setSearch] = useState('')

  const applySearch = (e) => {
    const inputText = e.target.value;

    setUserList(masterList.filter((equipment) => {
      return equipment.title.toLowerCase().includes(inputText.toLowerCase());
    }));
  }

  const deleteEquipment = async (id) => {
    const res = await fetch(apiUrl+'/equipment/delete/'+id, {method: 'DELETE'});

    if(res.status === 200){
      toast.success('Equipment Deleted');
      fetchUserData();
    }
  }



  return (
    <div>Managecure</div>
  )
}

export default Managecure