import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getCalendarById, deleteCalendar, editCalendar} from '../../store/calendars'





export default function CalendarById() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
    dispatch(getCalendarById(id))
    }, [dispatch, id])

    const calendars = useSelector((state )=> state.calendars)

    const user = useSelector(state => state.session.user)


    if (!calendars || !user) {
        return (
        <div style={{textAlign:"right"}}>no calendar?</div>
        )
    }

     const handleDelete = async () => {
        await dispatch(deleteCalendar(calendars.id))
        window.location=('/calendar')
    }

    const handleEdit = () => {

        history.push(`/calendar/${calendars.id}/edit`)
    }

    return (

        <div style={{textAlign:"left", marginLeft:"26%"}}> Calendar Info
            <div className='border' style={{ margin:"5px"}}>
               <br></br>

                <p style={{textAlign:"left", margin:"5px"}}>id: {calendars.id}</p>
                <p style={{textAlign:"left", margin:"5px"}}>user_id: {calendars.user_id}</p>
                <p style={{textAlign:"left", margin:"5px"}}>owner_id: {calendars.owner_id}</p>
                <p style={{textAlign:"left", margin:"5px"}}>startTime: {calendars.startTime}</p>
                <p style={{textAlign:"left", margin:"5px"}}>endTime: {calendars.endTime}</p>
                <p style={{textAlign:"left", margin:"5px"}}>notes: {calendars.notes}</p>

                {user.id===calendars.user_id?
                <button onClick={handleDelete}>delete</button>:null
                }
                 {user.id===calendars.user_id?
                <button style={{margin:"10px"}} onClick={handleEdit}>edit</button>:null
                }
            </div>
        </div>

    )
}
