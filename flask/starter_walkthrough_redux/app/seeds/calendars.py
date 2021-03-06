from app.models import db, Calendar

def seed_calendars():
    seed1 = Calendar(user_id='1', owner_id='1', startTime='2021-07-07T07:29:13+0000', endTime="2021-07-09T07:29:13+0000", notes="staying in the cave under the waterfall")
    seed2 = Calendar(user_id='1', owner_id='1', startTime='2021-07-012T07:29:13+0000', endTime="2021-07-013T07:29:13+0000", notes="getting icecream")

    db.session.add(seed1)
    db.session.add(seed2)

    db.session.commit()

def undo_calendars():
    db.session.execute('TRUNCATE calendars RESTART IDENTITY CASCADE;')
    db.session.commit()
