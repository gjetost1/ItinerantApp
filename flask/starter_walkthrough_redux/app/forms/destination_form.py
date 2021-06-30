from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Destination


class DestinationForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    destinationType = IntegerField('destinationType', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    lat = StringField('lat', validators=[DataRequired()])
    lng = StringField('lng', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
