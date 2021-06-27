from flask import Blueprint
from app.models import Destination
from app.forms import DestinationForm

destination_routes=Blueprint('destinations', __name__)

@destination_routes.route('/', methods=["GET"])
def loadAllDestinations():
    destinations=Destination.query.all()
    return {"destinations": [destination.to_dict() for destination in destinations]}

@destination_routes.route('/', methods=["POST"])
def createDestination():
    form = DestinationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        destination = Destination(
            name=form.data['name'],
            owner_id=form.data['owner_id'],
            destinationType=form.data['destinationType'],
            city=form.data['city'],
            state=form.data['state'],
            address=form.data['address'],
            lat=form.data['lat'],
            lng=form.data['lng'],
            description=form.data['description'],
        )
        db.session.add(destination)
        db.session.commit()
        return destination.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
