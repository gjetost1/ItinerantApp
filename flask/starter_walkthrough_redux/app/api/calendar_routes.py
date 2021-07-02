from flask import Blueprint, request
from app.models import Calendar, db
from app.forms import CalendarForm

calendar_routes=Blueprint('calendars', __name__)

@calendar_routes.route('/', methods=["GET"])
def loadAllCalendars():
    calendars=Calendar.query.all()
    return {"calendarss": [calendar.to_dict() for calendar in calendars]}

@calendar_routes.route('/<int:id>/', methods=["GET"])
def loadSingleCalendar(id):
    calendar=Calendar.query.filter_by(id=id).first()
    return calendar.to_dict()

@calendar_routes.route('/<int:id>',methods=["DELETE"])
def deleteSingleCalendar(id):
    calendar=Calendar.query.filter_by(id=id).first()
    db.session.delete(calendar)
    db.session.commit()
    return "Deleted", 200

@calendar_routes.route('/create', methods=["POST"])
def createCalendar():
    form = CalendarForm()
    calendar = Calendar(
        user_id=form.data['user_id'],
        owner_id=form.data['owner_id'],
        startTime=form.data['startTime'],
        endTime=form.data['endTime'],
        notes=form.data['notes'],

    )
    db.session.add(calendar)
    db.session.commit()
    return calendar.to_dict()

@calendar_routes.route('/<int:id>', methods=["PUT"])
def editCalendar(id):
    calendar = Calendar.query.get(request.json['id'])

    calendar.id=request.json['id']
    calendar.user_id = request.json['user_id']
    calendar.owner_id = request.json['owner_id']
    calendar.startTime = request.json['startTime']
    calendar.endTime = request.json['endTime']
    calendar.notes = request.json['notes']

    db.session.commit()
    return destination.to_dict()
