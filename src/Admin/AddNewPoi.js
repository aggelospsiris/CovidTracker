import React,{useState,useLayoutEffect} from "react";
import AdminMenu from "./AdminMenu";
import './AddNewPoi.css';
import Axios from 'axios'

function AddNewPoi() {
    
  const [files, setFiles] = useState("");
  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")
  const [error2,setError2] = useState("")

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log("e.target.result", e.target.result);
      setFiles(e.target.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var data = JSON.parse(files)
    console.log(data)
    data.map(d =>{
      if( !d["id"]){setError("id is missing in a poi"  )}
      else if( !d["name"]){setError("name is missing in a poi" )}
      else if( !d["address"]){setError("types is missing in a poi" )}
      else if( !d["coordinates"]){setError("coordinates is missing in a poi" )}
      else if( !d["rating"]){setError("rating is missing in a poi" )}
      else if( !d["rating_n"]){setError("rating_n is missing in a poi" )}
      else if( !d["populartimes"]){setError("populartimes is missing in a poi" )}
    })
    if (error == "") {
      Axios.post("http://localhost:3001/api/addPoi", {
        data:data,
      }).then((response) => {
        if(response.data.message){
          setSuccess(response.data.message)
        }
      });
     
    }
      return;
    }

    const handleDelete = () =>{
          Axios.delete("http://localhost:3001/api/deleteAll")
          .then((res) =>{
            setError2(res.data.message)
          })
          .catch((err) => {
            console.log(err);
          });
    }  

    return (
    <div>
        <AdminMenu />
        <div className='Contei'>
        <form onSubmit={handleSubmit} className="f" noValidate>
        <h2>Upload  file to add one or more pois</h2>
        <input type="file" onChange={handleChange} />
        <br />
        {error !== "" ? <div className="form-inputs">{error}</div> : ""}
        <button className="update" type="submit">Update</button>
        {success !== "" ? <div className="">{success}</div> : ""}
        </form>
        </div>
        <div className="dele">
        <h1>Are you sure you want to delete all the data</h1>
        <button className="butn" onClick={handleDelete}>yes</button>
        {error2 !== "" ? <div className="form-inputs">{error2}</div> : ""}

        </div>
        <div class="footer">
          <p>Avramopoulos &copy;<br/>Psiris &copy;</p>
        </div>  
    </div>
  );
}

export default AddNewPoi;

 