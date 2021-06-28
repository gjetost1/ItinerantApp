from flask import Blueprint
from app.models import Destination, db
from app.forms import DestinationForm

destination_routes=Blueprint('destinations', __name__)

@destination_routes.route('/', methods=["GET"])
def loadAllDestinations():
    destinations=Destination.query.all()
    return {"destinations": [destination.to_dict() for destination in destinations]}

@destination_routes.route('/<int:id>/',methods=["GET"])
def loadSingleDestination(id):
    destination=Destination.query.filter_by(id=id).first()
    return destination.to_dict()

@destination_routes.route('/create', methods=["POST"])
def createDestination():
    form = DestinationForm()
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
