from alembic import op
import sqlalchemy as sa

revision = "20250119_init"
down_revision = None

def upgrade():
    op.create_table("org",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now())
    )
    op.create_table("app_user",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("org_id", sa.String(), index=True),
        sa.Column("email", sa.String(), unique=True, index=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("is_admin", sa.Boolean(), server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now())
    )
    op.create_table("property",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("org_id", sa.String(), index=True, nullable=False),
        sa.Column("mls_id", sa.String(), index=True, nullable=True),
        sa.Column("street", sa.String(), index=True, nullable=False),
        sa.Column("city", sa.String(), index=True, nullable=False),
        sa.Column("state", sa.String(), index=True, nullable=False),
        sa.Column("postal_code", sa.String(), index=True, nullable=False),
        sa.Column("lat", sa.Float(), nullable=True),
        sa.Column("lon", sa.Float(), nullable=True),
        sa.Column("price", sa.Integer(), nullable=True),
        sa.Column("beds", sa.Float(), nullable=True),
        sa.Column("baths", sa.Float(), nullable=True),
        sa.Column("sqft", sa.Integer(), nullable=True),
        sa.Column("lot_sqft", sa.Integer(), nullable=True),
        sa.Column("year_built", sa.Integer(), nullable=True),
        sa.Column("property_type", sa.String(), nullable=True),
        sa.Column("status", sa.String(), nullable=True),
        sa.Column("dom", sa.Integer(), nullable=True),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now())
    )

def downgrade():
    op.drop_table("property")
    op.drop_table("app_user")
    op.drop_table("org")
