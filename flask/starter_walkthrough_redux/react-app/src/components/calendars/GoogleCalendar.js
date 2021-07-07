import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";


export default function GoogleCalendar() {

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
                'summary': 'Google I/O 2015',
                'location': '800 Howard St., San Francisco, CA 94103',
                'description': 'A chance to hear more about Google\'s developer products.',
                'start': {
                  'dateTime': '2015-05-28T09:00:00-07:00',
                  'timeZone': 'America/Los_Angeles'
                },
                'end': {
                  'dateTime': '2015-05-28T17:00:00-07:00',
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

        })
        })
    }

    return (
        <div>

            <button style={{margin:"1vh", width:"24vw", float:"right"}} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-gray-900 hover:text-yellow-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" onClick={handleClick}>Add Event</button>
        </div>
    )

    //     <p>Google Calendar API Quickstart</p>

    // <!--Add buttons to initiate auth sequence and sign out-->
    // <button id="authorize_button" style="display: none;">Authorize</button>
    // <button id="signout_button" style="display: none;">Sign Out</button>

    // <pre id="content" style="white-space: pre-wrap;"></pre>

    // <script type="text/javascript">
    //   // Client ID and API key from the Developer Console
    //   var CLIENT_ID = '<YOUR_CLIENT_ID>';
    //   var API_KEY = '<YOUR_API_KEY>';

    //   // Array of API discovery doc URLs for APIs used by the quickstart
    //   var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

    //   // Authorization scopes required by the API; multiple scopes can be
    //   // included, separated by spaces.
    //   var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

    //   var authorizeButton = document.getElementById('authorize_button');
    //   var signoutButton = document.getElementById('signout_button');

    //   /**
    //    *  On load, called to load the auth2 library and API client library.
    //    */
    //   function handleClientLoad() {
    //     gapi.load('client:auth2', initClient);
    //   }

    //   /**
    //    *  Initializes the API client library and sets up sign-in state
    //    *  listeners.
    //    */
    //   function initClient() {
    //     gapi.client.init({
    //       apiKey: API_KEY,
    //       clientId: CLIENT_ID,
    //       discoveryDocs: DISCOVERY_DOCS,
    //       scope: SCOPES
    //     }).then(function () {
    //       // Listen for sign-in state changes.
    //       gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    //       // Handle the initial sign-in state.
    //       updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    //       authorizeButton.onclick = handleAuthClick;
    //       signoutButton.onclick = handleSignoutClick;
    //     }, function(error) {
    //       appendPre(JSON.stringify(error, null, 2));
    //     });
    //   }

    //   /**
    //    *  Called when the signed in status changes, to update the UI
    //    *  appropriately. After a sign-in, the API is called.
    //    */
    //   function updateSigninStatus(isSignedIn) {
    //     if (isSignedIn) {
    //       authorizeButton.style.display = 'none';
    //       signoutButton.style.display = 'block';
    //       listUpcomingEvents();
    //     } else {
    //       authorizeButton.style.display = 'block';
    //       signoutButton.style.display = 'none';
    //     }
    //   }

    //   /**
    //    *  Sign in the user upon button click.
    //    */
    //   function handleAuthClick(event) {
    //     gapi.auth2.getAuthInstance().signIn();
    //   }

    //   /**
    //    *  Sign out the user upon button click.
    //    */
    //   function handleSignoutClick(event) {
    //     gapi.auth2.getAuthInstance().signOut();
    //   }

    //   /**
    //    * Append a pre element to the body containing the given message
    //    * as its text node. Used to display the results of the API call.
    //    *
    //    * @param {string} message Text to be placed in pre element.
    //    */
    //   function appendPre(message) {
    //     var pre = document.getElementById('content');
    //     var textContent = document.createTextNode(message + '\n');
    //     pre.appendChild(textContent);
    //   }

    //   /**
    //    * Print the summary and start datetime/date of the next ten events in
    //    * the authorized user's calendar. If no events are found an
    //    * appropriate message is printed.
    //    */
    //   function listUpcomingEvents() {
    //     gapi.client.calendar.events.list({
    //       'calendarId': 'primary',
    //       'timeMin': (new Date()).toISOString(),
    //       'showDeleted': false,
    //       'singleEvents': true,
    //       'maxResults': 10,
    //       'orderBy': 'startTime'
    //     }).then(function(response) {
    //       var events = response.result.items;
    //       appendPre('Upcoming events:');

    //       if (events.length > 0) {
    //         for (i = 0; i < events.length; i++) {
    //           var event = events[i];
    //           var when = event.start.dateTime;
    //           if (!when) {
    //             when = event.start.date;
    //           }
    //           appendPre(event.summary + ' (' + when + ')')
    //         }
    //       } else {
    //         appendPre('No upcoming events found.');
    //       }
    //     });
    //   }

    // </script>

    // <script async defer src="https://apis.google.com/js/api.js"
    //   onload="this.onload=function(){};handleClientLoad()"
    //   onreadystatechange="if (this.readyState === 'complete') this.onload()">
    // </script>


}
