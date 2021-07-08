import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllCalendars} from '../../store/calendars';



export default function CalendarTest() {
    const calendars=useSelector((state)=>state.calendars.calendars)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getAllCalendars())
    },[dispatch])

    return (
    <div>
            {calendars &&
                <div className="font-medium rounded-full shadow-sm text-white"
                     style={{fontSize:"2vh",textAlign:"left", marginLeft:"26%"}}>
                     {calendars.map(calendar =>
                        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" key={calendar.id}>
                            <button onClick={e => {window.location=`/calendar/${calendar.id}`}}>
                                {calendar.notes}
                            </button>
                        </button>)}
                </div>}
            <div>
            </div>
            <div style={{float:"right" }}>
                {/* google calendar */}
                <div>
          <iframe
           src="https://calendar.google.com/calendar/embed?src=jollygreengiantfood%40gmail.com&ctz=America%2FChicago"
           style={{border:"0", width:"70vw", height:"70vh", float:"right", marginRight:"3vw", marginTop:"3vh"}}
           width="800"
           height="600"
           frameborder="0"
           scrolling="no"></iframe>
          </div>

    </div>
    </div>
    );
};
