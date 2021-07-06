const LOAD ='calendars/LOAD'
const CREATE='calendars/CREATE'
const DELETE = 'calendars/DELETE';
const EDIT = 'calendars/EDIT';

const load = (calendars)=>({
    type:LOAD,
    calendars
})

const create = (calendars)=>({
    type:CREATE,
    calendars
})

const deleter = (calendars)=>({
    type: DELETE,
    calendars
})

const edit = (calendars)=>({
    type:EDIT,
    calendars
})


export const getAllCalendars = () => async (dispatch) => {
    const res= await fetch('/api/calendars/')

    if (res.ok){
        const calendars = await res.json()
        dispatch(load(calendars))
        return calendars
    }
}

export const getCalendarById = (calendarId) => async (dispatch) => {
    const res = await fetch(`/api/calendars/${calendarId}`);

    if (res.ok) {
        const calendars = await res.json();
        dispatch(load(calendars));
        return calendars;
    };
};

export const createCalendar = (data) => async (dispatch) => {
    const res = await fetch(`/api/calendars/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)

    });
    if(res.ok){
        const calendar = await res.json();
        dispatch(create(calendar));
        return calendar;
    }
};

export const editCalendar = (calendars) => async (dispatch) => {
    let calendarId=calendars.id
    let body = JSON.stringify(calendars)
    const res = await fetch(`/api/calendars/${calendarId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: body
    });

    if (res.ok) {
        const data = await res.json();

        dispatch(edit(data));
        return calendars;
    };
};

export const deleteCalendar = (calendarId) => async (dispatch) => {
    const res = await fetch(`/api/calendars/${calendarId}/`, {
        method: 'DELETE'
    })

    dispatch(deleter(calendarId))
    return res;
}

export default function calendarReducer(state={}, action){
    let newState;
    switch(action.type){
        case LOAD:
            newState = Object.assign({}, state);
            newState.calendars = action.calendars;
            return action.calendars
        case CREATE:
            newState = Object.assign({}, state);
            newState.newCalendar = action.newCalendar;
            return newState;
        case EDIT:
            newState = Object.assign({}, state);
            newState.newCalendar = action.newCalendar;
            return newState;
        case DELETE:
            newState = Object.assign({}, state);
            newState.calendars = [];
            return newState;
        default:
            return state;
    }
}
