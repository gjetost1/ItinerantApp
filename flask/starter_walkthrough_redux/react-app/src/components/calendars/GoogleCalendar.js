import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { createCalendar} from "../../store/calendars"


export default function GoogleCalendar() {
//form
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [user_id, setUserId] = useState(user?.id)
  const [owner_id, setOwnerId] = useState(0)
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
        })
        })
    }


    return (
        <div style={{flexDirection:"row", zIndex:"10", marginTop:"auto", marginLeft:"25vw"}}>

            {/* create form for event */}
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
