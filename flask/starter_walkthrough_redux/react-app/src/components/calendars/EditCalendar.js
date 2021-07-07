
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { editCalendar, getCalendarById} from "../../store/calendars"



export default function EditDestination() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(()=>{
        dispatch(getCalendarById(id))
    }, [dispatch, id])


    const calendars = useSelector((state )=> state?.calendars)


    const user = useSelector(state => state.session.user)

    const [user_id, setUserId] = useState('')
    const [owner_id, setOwnerId] = useState(1)
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [notes, setNotes] = useState('')


    const InitVals = () => {
        setUserId(calendars.user_id)
        setOwnerId(calendars.owner_id)
        setStartTime(calendars.startTime)
        setEndTime(calendars.endTime)
        setNotes(calendars.notes)


    }
    useEffect(()=>{
      InitVals()

    }, [calendars])

    if(!user) return null


    const data = {
        id,
        user_id,
        owner_id,
        startTime,
        endTime,
        notes
    };

    async function handleSubmit(e){
        e.preventDefault();
       let createdCalendar =
      dispatch(editCalendar(data))

        history.push(`/calendar/`)
    }
    return (
        <div style={{flexDirection: "column", textAlign:"center", marginLeft:"25%"}}>
            <form onSubmit={(e) => handleSubmit(e)} style={{ backgroundColor:"orange", alignItems:"right", display: "flex", flexDirection:"column"}}>
                <label htmlFor="user_id">user_id:</label>
                <input type="text" id="name" onChange={(e) => setUserId(e.target.value)} value={user_id}/>

                <label htmlFor="owner">Owner:</label>
                <input type="text" id="owner" onChange={(e) => setOwnerId(e.target.value)} value={owner_id}/>

                <label htmlFor="startTime">startTime:</label>
                <input type="text" id="startTime" onChange={(e) => setStartTime(e.target.value)} value={startTime} />

                <label htmlFor="endTime">endTime:</label>
                <input type="text" id="endTime" onChange={(e) => setEndTime(e.target.value)} value={endTime} />

                <label htmlFor="notes">notes:</label>
                <input type="text" id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />


                <button type="submit">Submit</button>

            </form>
        </div>
    )


}
