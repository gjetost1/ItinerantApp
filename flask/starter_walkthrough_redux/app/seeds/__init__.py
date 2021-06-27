from flask.cli import AppGroup
from .users import seed_users, undo_users
from .calendars import seed_calendars, undo_calendars
from .destinations import seed_destinations, undo_destinations

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_destinations()
    seed_calendars()

    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_destinations()
    undo_calendars()
    # Add other undo functions here
