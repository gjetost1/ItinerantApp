from .db import db
from sqlalchemy.orm import relationship


class Calendar(db.Model):
    __tablename__ = 'calendars'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    owner_id = db.Column(db.Integer, nullable=False)
    startTime = db.Column(db.String(25), nullable=False)
    endTime = db.Column(db.String(25), nullable=False)
    notes = db.Column(db.String(200), nullable=False)


    users = relationship("User", back_populates="destinations")

    def to_dict(self):
        return {
          "id": self.id,
          "user_id": self.user_id,
          "owner_id": self.owner_id,
          "startTime": self.city,
          "endTime": self.state,
          "notes": self.address

        }
