
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { editCalendar, getCalendarById} from "../../store/calendars"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {setHours, setMinutes} from "date-fns";



export default function EditDestination() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(()=>{
        dispatch(getCalendarById(id))
    }, [dispatch, id])


    const calendars = useSelector((state )=> state?.calendars)


    const user = useSelector(state => state.session.user)

    const [startTime, setStartTime] = useState(setHours(setMinutes(new Date(), 30), 16))
    const [endTime, setEndTime] = useState(setHours(setMinutes(new Date(), 30), 16))
    const [user_id, setUserId] = useState(user.id)
    const [owner_id, setOwnerId] = useState(user.id)
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

    },[calendars])

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

      dispatch(editCalendar(data))

        history.push(`/calendar/`)
    }

    let handleTime = (time) => {
        return time.getHours() > startTime ? "text-success" : "text-error";
        };

    return (
        <div style={{flexDirection: "column", textAlign:"center", marginLeft:"25%"}}>
            <form onSubmit={(e) => handleSubmit(e)} style={{ backgroundColor:"#f59e0b", alignItems:"right", display: "flex", flexDirection:"column"}}>
                {/* <label className="text-white" style={{fontSize:"3vh"}} htmlFor="user_id">User Id</label>
                <input className="rounded-full" type="text" id="name" onChange={(e) => setUserId(user.id)} value={user_id}/>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="owner">Owner</label>
                <input className="rounded-full" type="text" id="owner" onChange={(e) => setOwnerId(user.id)} value={owner_id}/> */}

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="startTime">Start Time</label>
                {/* <DatePicker
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
                    /> */}
                <input className="rounded-full" type="text" id="startTime" onChange={(e) => setStartTime(e.target.value)} value={startTime} />

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="endTime">End Time</label>
                {/* <DatePicker
                      className="rounded-full"
                      value={endTime}
                      selected={endTime}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="Pp"
                      onSelect={endTime=>{setEndTime(endTime)}} //clicked
                      onChange={(e) => setEndTime(e)} //value changed
                      timeClassName={handleTime}
                    /> */}
                <input className="rounded-full" type="text" id="endTime" onChange={(e) => setEndTime(e.target.value)} value={endTime} />

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="notes">notes:</label>
                <input className="rounded-full" type="text" id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />


                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"  style={{margin:"10px"}} type="submit">Submit</button>

            </form>
        </div>
    )


}
