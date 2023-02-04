import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 
const AiQnaList = (props) => {
  
    const [records, setRecords] = useState([]);
    // let records = []
    // function setRecords(recs) {
    //     records = recs
    // }



 
  console.log('AiQnaList [re]rendering start :' + JSON.stringify(props))

  // useEffect( () => {
  //   console.log('AiQnaList useEffect() on [], ' + records.length)
  // },[]);

  useEffect( () => {
    console.log('AiQnaList useEffect() before getRecords :' + JSON.stringify(props))
    getRecords();
    console.log('AiQnaList useEffect() after getRecords, ' + records.length)
  },[props.rrCount]);
 
  async function immitateGetRecords (prevRecords)
  {
    
    let recs = []
    for (let i = 0; i< props.rrCount; i++) {
      if (i < prevRecords.length ) {
        recs.push(prevRecords[i])
      } else {
        recs.push({_id: i, question: "qqq" + i, answer: "aaa" + i, mood: "mmm", ts: new Date()})
      }
      
    }
    return recs
  }


  async function getRecords() {
    const response = await axios.get("http://localhost:5000/getRecords");
    const recs = response.data

    //const recs = await immitateGetRecords(records)

    // resort records 
    recs.sort((a,b)=>{
      
     // return (b.ts.getTime() - a.ts.getTime());})
      return (new Date(b.ts) - new Date(a.ts))})
    setRecords(recs);
    console.log('AiQnaList getRecords() finished')
  };

  //getRecords().then(()=>{})
 

//   const deleteUser = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/users/${id}`);
//       getUsers();
//     } catch (error) {
//       console.log(error);
//     }
//   };

const FmtDate = (dt) => {

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    
    //console.log(today.toLocaleDateString("en-US")); // 9/17/2016
    return (new Date(dt)).toLocaleString() //"en-US", options)
//https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/

}
 
  return (
    <div className="columns mt-5">
      <div className="column is-half">


        {/* <Link to="add" className="button is-success">
          Add New
        </Link>

        &nbsp;<Link to="exp" className="button is-success">
          Exp
        </Link> */}
        {console.log('==> Rerendering')}
        <table className="table is-striped is-fullwidth mt-2">
          <thead>
            <tr>
              <th>No</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Mood</th>
              <th>Ts</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.question}</td>
                <td>{record.answer}</td>
                <td>{record.mood}</td>
                <td>{FmtDate(record.ts)}</td>
                {/* <td>
                  <Link
                    to={`edit/${user._id}`}
                    className="button is-info is-small mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="button is-danger is-small"
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
export default AiQnaList;