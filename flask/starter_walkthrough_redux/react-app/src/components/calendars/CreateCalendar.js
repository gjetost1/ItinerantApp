
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createCalendar} from "../../store/calendars"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {setHours, setMinutes} from "date-fns";



export default function CreateCalendar() {
    const history = useHistory();
    const dispatch = useDispatch();


    const [startTime, setStartTime] = useState(setHours(setMinutes(new Date(), 30), 16))
    const [endTime, setEndTime] = useState(setHours(setMinutes(new Date(), 30), 16))
    const [user_id, setUserId] = useState('')
    const [owner_id, setOwnerId] = useState(0)
    const [notes, setNotes] = useState('')


    const user = useSelector(state => state.session.user)
    if(!user) return null


    const data = {

        user_id,
        owner_id,
        startTime,
        endTime,
        notes

    };

    async function handleSubmit(e){
        e.preventDefault();
      dispatch(createCalendar(data))

        history.push(`/calendar`)
    }

    let handleTime = (time) => {
        return time.getHours() > startTime ? "text-success" : "text-error";
        };

    return (
        <div style={{flexDirection: "column"}}>
            <form onSubmit={(e) => handleSubmit(e)} style={{ backgroundColor:"orange", alignItems:"right", display: "flex", flexDirection:"column"}}>

                <label htmlFor="name">User Id:</label>
                <input type="text" id="user_id" onChange={(e) => setUserId(user.id)} value={user_id}/>

                <label htmlFor="owner">Owner:</label>
                <input type="text" id="owner_id" onChange={(e) => setOwnerId(user.id)} value={owner_id}/>

                <label htmlFor="startTime">startTime:</label>
                <DatePicker
                      className="rounded-full"
                      value={startTime}
                      selected={startTime}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="Pp"
                      onSelect={startTime=>{setStartTime(startTime)}} //clicked
                      onChange={(e) => setStartTime(e)} //value changed
                      timeClassName={handleTime}
                    />
                {/* <input type="text" id="startTime" onChange={(e) => setStartTime(e.target.value)} value={startTime}/> */}

                <label htmlFor="endTime">endTime:</label>
                <DatePicker
                    className="rounded-full"
                    value={endTime}
                    selected={endTime}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="Pp"
                    onSelect={endTime=>{setEndTime(endTime)}} //clicked
                    onChange={(e) => setEndTime(e)} // value changed
                    timeClassName={handleTime}
                  />
                {/* <input type="text" id="endTime" onChange={(e) => setEndTime(e.target.value)} value={endTime}/> */}

                <label htmlFor="notes">Notes:</label>
                <input type="text" id="notes" onChange={(e) => setNotes(e.target.value)} value={notes}/>

                <button type="submit">Submit</button>

            </form>
        </div>
    )


}
