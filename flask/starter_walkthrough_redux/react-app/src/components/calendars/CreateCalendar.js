
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createCalendar} from "../../store/calendars"



export default function CreateCalendar() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [user_id, setUserId] = useState('')
    const [owner_id, setOwnerId] = useState(0)
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
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
       let createdCalendar =
      dispatch(createCalendar(data))

        history.push(`/calendar`)
    }
    return (
        <div style={{flexDirection: "column"}}>
            <form onSubmit={(e) => handleSubmit(e)} style={{ backgroundColor:"orange", alignItems:"right", display: "flex", flexDirection:"column"}}>

                <label htmlFor="name">user_id:</label>
                <input type="text" id="user_id" onChange={(e) => setUserId(e.target.value)} value={user_id}/>

                <label htmlFor="owner">Owner:</label>
                <input type="text" id="owner_id" onChange={(e) => setOwnerId(e.target.value)} value={owner_id}/>

                <label htmlFor="startTime">startTime:</label>
                <input type="text" id="startTime" onChange={(e) => setStartTime(e.target.value)} value={startTime}/>

                <label htmlFor="endTime">endTime:</label>
                <input type="text" id="endTime" onChange={(e) => setEndTime(e.target.value)} value={endTime}/>

                <label htmlFor="notes">Notes:</label>
                <input type="text" id="notes" onChange={(e) => setNotes(e.target.value)} value={notes}/>

                <button type="submit">Submit</button>

            </form>
        </div>
    )


}
