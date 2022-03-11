import React,{useState} from "react";
import AdminMenu from "./AdminMenu";

function AddNewPoi() {
    
    const[poi,setPoi]=useState({
        id: '',
        name: '',
        address: '',
        types: [],
        lat: '',
        lng: '',
        rating: '',
        rating_n: '',
        populartimes: [
            {name: "Monday",data : []},
            {name: "Tuesday",data : []},
            {name: "Wednesday",data : []},
            {name: "Thursday",data : []},
            {name: "Friday",data : []},
            {name: "Saturday",data : []},
            {name: "Monday",data : []},
            {name: "Sunday",data : []},
          ],
        time_spent: []

      })
    
      const handleChange = e => {
        const { name, value } = e.target;
        setPoi({
          ...poi,
          [name]: value
        });
      };
    const handleSubmit = e => {
        
            e.preventDefault()
            console.log(poi)
            document.getElementById("form").reset();

    }

    const PopInputMonday = () => {
        return (
         <>
           <div>
                <input className="form-input"
                    type="number"
                    placeholder="Enter the percentage of people(0-100)"
                    value={poi.populartimes[0].data}
                    onChange={handleChange}
                  />
          </div>
         </>
        )
    }
    
     const PopInputTuesday = () => {
        return (
         <>
           <div>
                <input className="form-input"
                    type="number"
                    placeholder="Enter the percentage of people(0-100)"
                    value={poi.populartimes[1].data}
                    onChange={handleChange}
                  />
          </div>
         </>
        )
    }
    
     const PopInputWednesday = () => {
        return (
         <>
           <div>
                <input className="form-input"
                    type="number"
                    placeholder="Enter the percentage of people(0-100)"
                    value={poi.populartimes[2].data}
                    onChange={handleChange}
                  />
          </div>
         </>
        )
    }
    
     const PopInputThursday = () => {
        return (
         <>
           <div>
                <input className="form-input"
                    type="number"
                    placeholder="Enter the percentage of people(0-100)"
                    value={poi.populartimes[3].data}
                    onChange={handleChange}
                  />
          </div>
         </>
        )
    }
    
     const PopInputFriday = () => {
        return (
         <>
           <div>
                <input className="form-input"
                    type="number"
                    placeholder="Enter the percentage of people(0-100)"
                    value={poi.populartimes[4].data}
                    onChange={handleChange}
                  />
          </div>
         </>
        )
    }
    
     const PopInputSaturday = () => {
        return (
         <>
           <div>
                <input className="form-input"
                    type="number"
                    placeholder="Enter the percentage of people(0-100)"
                    value={poi.populartimes[5].data}
                    onChange={handleChange}
                  />
          </div>
         </>
        )
    }
    
     const PopInputSunday= () => {
        return (
         <>
           <div>
                <input className="form-input"
                    type="number"
                    placeholder="Enter the percentage of people(0-100)"
                    value={poi.populartimes[6].data}
                    onChange={handleChange}
                  />
          </div>
         </>
        )
    }
    
    

    return (
    <div>
      <AdminMenu />
      <div className='form-container'>
        <div className='form-content-left'>
        </div>
        <div className='form-content-right'>
          <form onSubmit={handleSubmit} id="form" className="form"  noValidate>
            <div className="form-inputs">
              <label className="form-label">id</label>
              <input
                className="form-input"
                type="text"
                name="id"
                placeholder="Enter id"
                value={poi.id}
                onChange={handleChange}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">name</label>
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Enter name"
                value={poi.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">address</label>
              <input
                className="form-input"
                type="text"
                name="address"
                placeholder="Enter address"
                value={poi.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-inputs">
             <label className="form-label">Types</label>
              <label className="form-label">Type 1</label>
              <input
                className="form-input"
                type="text"
                name="type1"
                placeholder="type 1"
                value={poi.type}
                onChange={handleChange}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">Type 2</label>
              <input
                className="form-input"
                type="text"
                name="type2"
                placeholder="type 2"
                value={poi.type}
                onChange={handleChange}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">Type 3</label>
              <input
                className="form-input"
                type="text"
                name="type3"
                placeholder="type 3"
                value={poi.type}
                onChange={handleChange}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">Type 4</label>
              <input
                className="form-input"
                type="text"
                name="type4"
                placeholder="type 4"
                value={poi.type}
                onChange={handleChange}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">Type 5</label>
              <input
                className="form-input"
                type="text"
                name="type5"
                placeholder="type 5"
                value={poi.type}
                onChange={handleChange}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">Type 6</label>
              <input
                className="form-input"
                type="text"
                name="type6"
                placeholder="type 6"
                value={poi.type}
                onChange={handleChange}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">latitude</label>
              <input
                className="form-input"
                type="text"
                name="lat"
                placeholder="lat"
                value={poi.lat}
                onChange={handleChange}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">Longitude </label>
              <input
                className="form-input"
                type="text"
                name="lng"
                placeholder="lng"
                value={poi.lng}
                onChange={handleChange}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">rating</label>
              <input
                className="form-input"
                type="text"
                name="rating"
                placeholder="rating"
                value={poi.rating}
                onChange={handleChange}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">rating_n</label>
              <input
                className="form-input"
                type="text"
                name="rating_n"
                placeholder="rating_n"
                value={poi.rating_n}
                onChange={handleChange}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">Popular times</label>
              <label className="form-label"><h1>Monday</h1></label>
              <label>0:00 o'clock</label><PopInputMonday />
              <label>1:00 o'clock</label><PopInputMonday />
              <label>2:00 o'clock</label><PopInputMonday />
              <label>3:00 o'clock</label><PopInputMonday />
              <label>4:00 o'clock</label><PopInputMonday />
              <label>5:00 o'clock</label><PopInputMonday />
              <label>6:00 o'clock</label><PopInputMonday />
              <label>7:00 o'clock</label><PopInputMonday />
              <label>8:00 o'clock</label><PopInputMonday />
              <label>9:00 o'clock</label><PopInputMonday />
              <label>10:00 o'clock</label><PopInputMonday />
              <label>11:00 o'clock</label><PopInputMonday />
              <label>12:00 o'clock</label><PopInputMonday />
              <label>13:00 o'clock</label><PopInputMonday />
              <label>14:00 o'clock</label><PopInputMonday />
              <label>15:00 o'clock</label><PopInputMonday />
              <label>16:00 o'clock</label><PopInputMonday />
              <label>17:00 o'clock</label><PopInputMonday />
              <label>18:00 o'clock</label><PopInputMonday />
              <label>19:00 o'clock</label><PopInputMonday />
              <label>20:00 o'clock</label><PopInputMonday />
              <label>21:00 o'clock</label><PopInputMonday />
              <label>22:00 o'clock</label><PopInputMonday />
              <label>23:00 o'clock</label><PopInputMonday />
              <label>24:00 o'clock</label><PopInputMonday />
              

              <label className="form-label"><h1>Tuesday</h1></label>
              <label>0:00 o'clock</label><PopInputTuesday />
              <label>1:00 o'clock</label><PopInputTuesday />
              <label>2:00 o'clock</label><PopInputTuesday />
              <label>3:00 o'clock</label><PopInputTuesday />
              <label>4:00 o'clock</label><PopInputTuesday />
              <label>5:00 o'clock</label><PopInputTuesday />
              <label>6:00 o'clock</label><PopInputTuesday />
              <label>7:00 o'clock</label><PopInputTuesday />
              <label>8:00 o'clock</label><PopInputTuesday />
              <label>9:00 o'clock</label><PopInputTuesday />
              <label>10:00 o'clock</label><PopInputTuesday />
              <label>11:00 o'clock</label><PopInputTuesday />
              <label>12:00 o'clock</label><PopInputTuesday />
              <label>13:00 o'clock</label><PopInputTuesday />
              <label>14:00 o'clock</label><PopInputTuesday />
              <label>15:00 o'clock</label><PopInputTuesday />
              <label>16:00 o'clock</label><PopInputTuesday />
              <label>17:00 o'clock</label><PopInputTuesday />
              <label>18:00 o'clock</label><PopInputTuesday />
              <label>19:00 o'clock</label><PopInputTuesday />
              <label>20:00 o'clock</label><PopInputTuesday />
              <label>21:00 o'clock</label><PopInputTuesday />
              <label>22:00 o'clock</label><PopInputTuesday />
              <label>23:00 o'clock</label><PopInputTuesday />
              <label>24:00 o'clock</label><PopInputTuesday />

              <label className="form-label"><h1>Wednesday</h1></label>
              <label>0:00 o'clock</label><PopInputWednesday />
              <label>1:00 o'clock</label><PopInputWednesday />
              <label>2:00 o'clock</label><PopInputWednesday />
              <label>3:00 o'clock</label><PopInputWednesday />
              <label>4:00 o'clock</label><PopInputWednesday />
              <label>5:00 o'clock</label><PopInputWednesday />
              <label>6:00 o'clock</label><PopInputWednesday />
              <label>7:00 o'clock</label><PopInputWednesday />
              <label>8:00 o'clock</label><PopInputWednesday />
              <label>9:00 o'clock</label><PopInputWednesday />
              <label>10:00 o'clock</label><PopInputWednesday />
              <label>11:00 o'clock</label><PopInputWednesday />
              <label>12:00 o'clock</label><PopInputWednesday />
              <label>13:00 o'clock</label><PopInputWednesday />
              <label>14:00 o'clock</label><PopInputWednesday />
              <label>15:00 o'clock</label><PopInputWednesday />
              <label>16:00 o'clock</label><PopInputWednesday />
              <label>17:00 o'clock</label><PopInputWednesday />
              <label>18:00 o'clock</label><PopInputWednesday />
              <label>19:00 o'clock</label><PopInputWednesday />
              <label>20:00 o'clock</label><PopInputWednesday />
              <label>21:00 o'clock</label><PopInputWednesday />
              <label>22:00 o'clock</label><PopInputWednesday />
              <label>23:00 o'clock</label><PopInputWednesday />
              <label>24:00 o'clock</label><PopInputWednesday />

              <label className="form-label"><h1>Thursday</h1></label>
              <label>0:00 o'clock</label><PopInputThursday />
              <label>1:00 o'clock</label><PopInputThursday />
              <label>2:00 o'clock</label><PopInputThursday />
              <label>3:00 o'clock</label><PopInputThursday />
              <label>4:00 o'clock</label><PopInputThursday />
              <label>5:00 o'clock</label><PopInputThursday />
              <label>6:00 o'clock</label><PopInputThursday />
              <label>7:00 o'clock</label><PopInputThursday />
              <label>8:00 o'clock</label><PopInputThursday />
              <label>9:00 o'clock</label><PopInputThursday />
              <label>10:00 o'clock</label><PopInputThursday />
              <label>11:00 o'clock</label><PopInputThursday />
              <label>12:00 o'clock</label><PopInputThursday />
              <label>13:00 o'clock</label><PopInputThursday />
              <label>14:00 o'clock</label><PopInputThursday />
              <label>15:00 o'clock</label><PopInputThursday />
              <label>16:00 o'clock</label><PopInputThursday />
              <label>17:00 o'clock</label><PopInputThursday />
              <label>18:00 o'clock</label><PopInputThursday />
              <label>19:00 o'clock</label><PopInputThursday />
              <label>20:00 o'clock</label><PopInputThursday />
              <label>21:00 o'clock</label><PopInputThursday />
              <label>22:00 o'clock</label><PopInputThursday />
              <label>23:00 o'clock</label><PopInputThursday />
              <label>24:00 o'clock</label><PopInputThursday />

              <label className="form-label"><h1>Friday</h1></label>
              <label>0:00 o'clock</label><PopInputFriday />
              <label>1:00 o'clock</label><PopInputFriday />
              <label>2:00 o'clock</label><PopInputFriday />
              <label>3:00 o'clock</label><PopInputFriday />
              <label>4:00 o'clock</label><PopInputFriday />
              <label>5:00 o'clock</label><PopInputFriday />
              <label>6:00 o'clock</label><PopInputFriday />
              <label>7:00 o'clock</label><PopInputFriday />
              <label>8:00 o'clock</label><PopInputFriday />
              <label>9:00 o'clock</label><PopInputFriday />
              <label>10:00 o'clock</label><PopInputFriday />
              <label>11:00 o'clock</label><PopInputFriday />
              <label>12:00 o'clock</label><PopInputFriday />
              <label>13:00 o'clock</label><PopInputFriday />
              <label>14:00 o'clock</label><PopInputFriday />
              <label>15:00 o'clock</label><PopInputFriday />
              <label>16:00 o'clock</label><PopInputFriday />
              <label>17:00 o'clock</label><PopInputFriday />
              <label>18:00 o'clock</label><PopInputFriday />
              <label>19:00 o'clock</label><PopInputFriday />
              <label>20:00 o'clock</label><PopInputFriday />
              <label>21:00 o'clock</label><PopInputFriday />
              <label>22:00 o'clock</label><PopInputFriday />
              <label>23:00 o'clock</label><PopInputFriday />
              <label>24:00 o'clock</label><PopInputFriday />

              <label className="form-label"><h1>Saturday</h1></label>
              <label>0:00 o'clock</label><PopInputSaturday />
              <label>1:00 o'clock</label><PopInputSaturday />
              <label>2:00 o'clock</label><PopInputSaturday />
              <label>3:00 o'clock</label><PopInputSaturday />
              <label>4:00 o'clock</label><PopInputSaturday />
              <label>5:00 o'clock</label><PopInputSaturday />
              <label>6:00 o'clock</label><PopInputSaturday />
              <label>7:00 o'clock</label><PopInputSaturday />
              <label>8:00 o'clock</label><PopInputSaturday />
              <label>9:00 o'clock</label><PopInputSaturday />
              <label>10:00 o'clock</label><PopInputSaturday />
              <label>11:00 o'clock</label><PopInputSaturday />
              <label>12:00 o'clock</label><PopInputSaturday />
              <label>13:00 o'clock</label><PopInputSaturday />
              <label>14:00 o'clock</label><PopInputSaturday />
              <label>15:00 o'clock</label><PopInputSaturday />
              <label>16:00 o'clock</label><PopInputSaturday />
              <label>17:00 o'clock</label><PopInputSaturday />
              <label>18:00 o'clock</label><PopInputSaturday />
              <label>19:00 o'clock</label><PopInputSaturday />
              <label>20:00 o'clock</label><PopInputSaturday />
              <label>21:00 o'clock</label><PopInputSaturday />
              <label>22:00 o'clock</label><PopInputSaturday />
              <label>23:00 o'clock</label><PopInputSaturday />
              <label>24:00 o'clock</label><PopInputSaturday />

              <label className="form-label"><h1>Sunday</h1></label>
              <label>0:00 o'clock</label><PopInputSunday />
              <label>1:00 o'clock</label><PopInputSunday />
              <label>2:00 o'clock</label><PopInputSunday />
              <label>3:00 o'clock</label><PopInputSunday />
              <label>4:00 o'clock</label><PopInputSunday />
              <label>5:00 o'clock</label><PopInputSunday />
              <label>6:00 o'clock</label><PopInputSunday />
              <label>7:00 o'clock</label><PopInputSunday />
              <label>8:00 o'clock</label><PopInputSunday />
              <label>9:00 o'clock</label><PopInputSunday />
              <label>10:00 o'clock</label><PopInputSunday />
              <label>11:00 o'clock</label><PopInputSunday />
              <label>12:00 o'clock</label><PopInputSunday />
              <label>13:00 o'clock</label><PopInputSunday />
              <label>14:00 o'clock</label><PopInputSunday />
              <label>15:00 o'clock</label><PopInputSunday />
              <label>16:00 o'clock</label><PopInputSunday />
              <label>17:00 o'clock</label><PopInputSunday />
              <label>18:00 o'clock</label><PopInputSunday />
              <label>19:00 o'clock</label><PopInputSunday />
              <label>20:00 o'clock</label><PopInputSunday />
              <label>21:00 o'clock</label><PopInputSunday />
              <label>22:00 o'clock</label><PopInputSunday />
              <label>23:00 o'clock</label><PopInputSunday />
              <label>24:00 o'clock</label><PopInputSunday />



            </div>
            
            <button className="form-input-btn" type="submit">
              Add Poi
            </button>
          </form>
        </div>
      </div> 
      </div>
  );
}

export default AddNewPoi;
