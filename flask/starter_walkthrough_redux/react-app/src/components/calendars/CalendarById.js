import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCalendarById, deleteCalendar} from '../../store/calendars'

export default function CalendarById() {
    const { id } = useParams();
    const dispatch = useDispatch();
    // const history = useHistory();

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
        window.location=(`/calendar/${calendars.id}/edit`)
    }



    return (
        <div className="font-medium rounded-full shadow-sm text-white" style={{textAlign:"left", marginLeft:"26%", fontSize:"5vh"}}> Calendar Info
            <div className='border' style={{ margin:"5px"}}>

                <p className="text-white" style={{fontSize:"3vh", textAlign:"left", margin:"5px"}}>Id: {calendars.id}</p>
                <p className="text-white" style={{fontSize:"3vh", textAlign:"left", margin:"5px"}}>User Id: {calendars.user_id}</p>
                <p className="text-white" style={{fontSize:"3vh", textAlign:"left", margin:"5px"}}>Owner Id: {calendars.owner_id}</p>
                <p className="text-white" style={{fontSize:"3vh", textAlign:"left", margin:"5px"}}>startTime: {calendars.startTime}</p>
                <p className="text-white" style={{fontSize:"3vh", textAlign:"left", margin:"5px"}}>endTime: {calendars.endTime}</p>
                <p className="text-white" style={{fontSize:"3vh", textAlign:"left", margin:"5px"}}>notes: {calendars.notes}</p>

                {user.id===calendars.user_id?
                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-yellow-500 hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" onClick={handleDelete}>Delete</button>:null
                }
                 {user.id===calendars.user_id?
                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-yellow-500 hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" style={{margin:"10px"}} onClick={handleEdit}>Edit</button>:null
                }
            </div>
        </div>

    )
}
