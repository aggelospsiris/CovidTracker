import AdminMenu from "./AdminMenu"

function DeleteAll() {
    
    const handleDelete = () =>{
         //delete   
    } 
    return (
        <div>
            <AdminMenu />
            <h1>Are you sure you want to delete all the data</h1>
            <button className="form-input-btn" onClick={handleDelete}>yes</button>
        </div>
    )
}

export default DeleteAll
