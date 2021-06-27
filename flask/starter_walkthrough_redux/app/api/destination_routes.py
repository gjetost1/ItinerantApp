from flask import Blueprint
from app.models import Destination

destination_routes=Blueprint('destinations', __name__)

@destination_routes.route('/', methods=["GET"])
def loadAllDestinations():
    destinations=Destination.query.all()
    return {"destinations": [destination.to_dict() for destination in destinations]}
