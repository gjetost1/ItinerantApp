from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Calendar


class CalendarForm(FlaskForm):
    user_id = IntegerField('name', validators=[DataRequired()])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    startTime = StringField('startTime', validators=[DataRequired()])
    endTime = StringField('endTime', validators=[DataRequired()])
    notes = StringField('notes', validators=[DataRequired()])
