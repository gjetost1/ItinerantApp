from .db import db
from sqlalchemy.orm import relationship


class Destination(db.Model):
    __tablename__ = 'destinations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    destinationType = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(50), nullable=False)
    lat = db.Column(db.String(17), nullable=False)
    lng = db.Column(db.String(17), nullable=False)
    description = db.Column(db.String(999), nullable=False)

    users = db.relationship("User", back_populates="destinations")



    def to_dict(self):
        return {
          "id": self.id,
          "name": self.name,
          "owner_id": self.owner_id,
          "destinationType": self.destinationType,
          "city": self.city,
          "state": self.state,
          "address": self.address,
          "lat": self.lat,
          "lng": self.lng,
          "description": self.description
        }
