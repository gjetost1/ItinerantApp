"""empty message

Revision ID: 8d44e9baf3d4
Revises: ffdc0a98111c
Create Date: 2021-06-27 07:57:53.231695

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8d44e9baf3d4'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('calendars',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('startTime', sa.String(length=25), nullable=False),
    sa.Column('endTime', sa.String(length=25), nullable=False),
    sa.Column('notes', sa.String(length=200), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('destinations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('destinationType', sa.Integer(), nullable=False),
    sa.Column('city', sa.String(length=50), nullable=False),
    sa.Column('state', sa.String(length=50), nullable=False),
    sa.Column('address', sa.String(length=50), nullable=False),
    sa.Column('lat', sa.String(length=18), nullable=False),
    sa.Column('lng', sa.String(length=18), nullable=False),
    sa.Column('description', sa.String(length=999), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('destinations')
    op.drop_table('calendars')
    # ### end Alembic commands ###
