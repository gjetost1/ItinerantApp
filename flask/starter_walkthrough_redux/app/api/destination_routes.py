from flask import Blueprint
from app.models import Destination

destination_routes=Blueprint('destinations', __name__)

@destination_routes.route('/', methods=["GET"])
def loadAllDestinations():
    destinations=Destination.query.all()
    return {"destinations": destination.to_dict() for destination in destinations}

@destination_routes.route('/<int:id>/',methods=["GET"])
def loadOneDestination(id):
    destination=Destination.query.filter_by(id=id).first()
    return destination.to_dict()
