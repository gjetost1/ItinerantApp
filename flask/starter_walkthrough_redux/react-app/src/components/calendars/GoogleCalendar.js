import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { createCalendar} from "../../store/calendars"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function GoogleCalendar() {
//form
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.session.user)
  const [user_id, setUserId] = useState(user?.id)
  const [owner_id, setOwnerId] = useState(user?.id)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [notes, setNotes] = useState('')
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

  }
    const gapi = window.gapi
    const API_KEY = "AIzaSyB6r_Q8r9S6TymFUd0XkvnTvsHCsKvWjNs";
    const CLIENT_ID = "874062977232-rqdf09fjgr34c5pdnuodom7vvn8e3sne.apps.googleusercontent.com"
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    const SCOPES = "https://www.googleapis.com/auth/calendar";

    const handleClick = () => {
        gapi.load('client:auth2', ()=> {
            console.log("loaded client")

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            })
        gapi.client.load('calendar', 'v3', ()=> console.log("loaded calendar"))
        gapi.auth2.getAuthInstance().signIn()
        .then(()=> {
            const event = {
                'summary': notes,
                'location': '',
                'description': '',
                'start': {
                  'dateTime': startTime,
                  'timeZone': 'America/Los_Angeles'
                },
                'end': {
                  'dateTime': endTime,
                  'timeZone': 'America/Los_Angeles'
                },
                'recurrence': [
                  'RRULE:FREQ=DAILY;COUNT=2'
                ],
                'attendees': [
                  {'email': 'lpage@example.com'},
                  {'email': 'sbrin@example.com'}
                ],
                'reminders': {
                  'useDefault': false,
                  'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                  ]
                }
              };
            const request = gapi.client.calendar.events.insert({
                "calendarId": "primary",
                'resource': event,
            })

            // create
            request.execute(event => {
              window.location=(`/calendar`)
                window.open(event.htmlLink)
            })

            // get
            gapi.client.calendar.events.list({
              'calendarId': 'primary',
              'timeMin': (new Date().toISOString()),
              'showDeleted': false,
              'singleEvents': true,
              'maxResults': 10,
              'orderBy': 'startTime'
            }).then(response => {
              const events = response.result.items
              console.log("EVENTS: ", events)
            })

            //modify
            //delete
        })
        })
    }

    let handleTime = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
    };


    return (
        <div style={{flexDirection:"row", zIndex:"10", marginTop:"auto", marginLeft:"25vw"}}>

            {/* create form for event */}
            <div style={{flexDirection: "column"}}>
            <form onSubmit={(e) => handleSubmit(e)} style={{ backgroundColor:"#333333", alignItems:"center", display: "flex", flexDirection:"column"}}>

                <label htmlFor="name" className="text-white" style={{fontSize:"3vh"}}>User ID</label>
                <input type="text" id="user_id" onChange={(e) => setUserId(user.id)} value={user_id}/>

                <label htmlFor="owner" className="text-white" style={{fontSize:"3vh"}}>Owner</label>
                <input type="text" id="owner_id" onChange={(e) => setOwnerId(user.id)} value={owner_id}/>

                <label htmlFor="startTime" className="text-white" style={{fontSize:"3vh"}}>Start Time</label>
                  <DatePicker
                      value={startTime}
                      selected={startTime}
                      showTimeSelect
                      dateFormat="Pp"
                      onSelect={startTime=>{setStartTime(startTime)}} //when day is clicked
                      onChange={(e) => setStartTime(startTime)} //only when value has changed
                      timeClassName={handleTime}
                    />

                <label htmlFor="endTime" className="text-white" style={{fontSize:"3vh"}}>End Time</label>
                  <DatePicker
                    value={endTime}
                    selected={endTime}
                    showTimeSelect
                    dateFormat="Pp"
                    onSelect={endTime=>{setEndTime(endTime)}} //when day is clicked
                    onChange={(e) => setEndTime(endTime)} //only when value has changed
                    timeClassName={handleTime}
                  />

                <label htmlFor="notes" className="text-white" style={{fontSize:"3vh"}}>Notes</label>
                <input type="text" id="notes" onChange={(e) => setNotes(e.target.value)} value={notes}/>

                <button type="submit" style={{margin:"1vh", width:"12vw", float:"right"}} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-gray-900 hover:text-yellow-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" onClick={handleClick}>Add Event</button>

            </form>
            <div>
              <iframe
              src="https://calendar.google.com/calendar/embed?src=jollygreengiantfood%40gmail.com&ctz=America%2FChicago"
              style={{border:"0", width:"75vw", height:"68vh", float:"right"}}
              width="800"
              height="600"
              frameborder="0"
              scrolling="no"></iframe>
            </div>

        </div>

        </div>
    )}
