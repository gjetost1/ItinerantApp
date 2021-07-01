from app.models import db, Destination

def seed_destinations():
    seed1 = Destination(name='Minnehaha Falls', owner_id='1', destinationType='1', city="Minneapolis", state="Minnesota", address="4825 Minnehaha Ave", lat="44.91613467717222", lng="-93.21155505086085", description="It's a beautiful waterfall with a deep history.")
    seed2 = Destination(name='Sea Salt', owner_id='1', destinationType='1', city="Minneapolis", state="Minnesota", address="4825 Minnehaha Ave", lat="44.91613467717222", lng="-93.21155505086085", description="Seafood restaurant by the waterfall.")
    seed3 = Destination(name='Hidden Falls', owner_id='1', destinationType='1', city="Minneapolis", state="Minnesota", address="4825 Minnehaha Ave", lat="44.90723624484411", lng="-93.19303034232878", description="Lovely shady park with puppet shows in the fall.")

    db.session.add(seed1)
    db.session.add(seed2)

    db.session.commit()

def undo_destinations():
    db.session.execute('TRUNCATE destinations RESTART IDENTITY CASCADE;')
    db.session.commit()
