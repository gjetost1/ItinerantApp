from app.models import db, Destination

def seed_destinations():
    seed1 = Destination(name='Minnehaha Falls', owner_id='1', destinationType='1', city="Minneapolis", state="Minnesota", address="4825 Minnehaha Ave", lat="44.91613467717222", lng="-93.21155505086085", description="It's a beautiful waterfall with a deep history.")
    seed2 = Destination(name='Sea Salt', owner_id='1', destinationType='1', city="Minneapolis", state="Minnesota", address="4825 Minnehaha Ave", lat="44.91613467717222", lng="-93.21155505086085", description="Seafood restaurant by the waterfall.")
    seed3 = Destination(name='Hidden Falls', owner_id='1', destinationType='1', city="St. Paul", state="Minnesota", address="1313 Hidden Falls Dr", lat="44.90723624484411", lng="-93.19303034232878", description="Lovely shady park with puppet shows in the fall.")
    seed4 = Destination(name='East Cedar Lake Beach', owner_id='1', destinationType='1', city="Minneapolis", state="Minnesota", address="2000 S Upton Ave", lat="44.96126888271359", lng="-93.31811959185227", description="Awesome beach with a mudpit near. Beware police.")
    seed5 = Destination(name='McNeely Conservatory', owner_id='1', destinationType='1', city="St. Paul", state="Minnesota", address="1225 Estabrook Dr", lat="44.9817012056923", lng="-93.1511121436708", description="Great conservatory for warming winter visits.")

    db.session.add(seed1)
    db.session.add(seed2)
    db.session.add(seed3)
    db.session.add(seed4)
    db.session.add(seed5)

    db.session.commit()

def undo_destinations():
    db.session.execute('TRUNCATE destinations RESTART IDENTITY CASCADE;')
    db.session.commit()
