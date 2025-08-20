"""client comms models

Revision ID: 20250819_client_comms_models
Revises: 20250119_init
Create Date: 2024-08-19 00:00:00.000000
"""

from alembic import op
import sqlalchemy as sa


revision = "20250819_client_comms_models"
down_revision = "20250119_init"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "contact",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("org_id", sa.String(), index=True, nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("emails", sa.JSON(), nullable=False),
        sa.Column("phones", sa.JSON(), nullable=False),
        sa.Column("telegram_id", sa.String(), nullable=True),
        sa.Column("tags", sa.JSON(), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now()),
    )

    op.create_table(
        "thread",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("org_id", sa.String(), index=True, nullable=False),
        sa.Column("contact_id", sa.String(), sa.ForeignKey("contact.id"), index=True, nullable=True),
        sa.Column("deal_id", sa.String(), index=True, nullable=True),
        sa.Column("subject", sa.String(), nullable=True),
        sa.Column("channel", sa.String(), index=True, nullable=False),
        sa.Column("status", sa.String(), nullable=False, server_default="open"),
        sa.Column("last_message_at", sa.DateTime(), nullable=True),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now()),
    )
    op.create_index("ix_thread_org_id_deal_id", "thread", ["org_id", "deal_id"])

    op.create_table(
        "message",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("thread_id", sa.String(), sa.ForeignKey("thread.id"), nullable=False),
        sa.Column("org_id", sa.String(), index=True, nullable=False),
        sa.Column("direction", sa.String(), nullable=False),
        sa.Column("channel", sa.String(), nullable=False),
        sa.Column("body", sa.Text(), nullable=True),
        sa.Column("attachments", sa.JSON(), nullable=True),
        sa.Column("sent_at", sa.DateTime(), nullable=True),
        sa.Column("delivered_at", sa.DateTime(), nullable=True),
        sa.Column("read_at", sa.DateTime(), nullable=True),
        sa.Column("provider_message_id", sa.String(), nullable=True),
        sa.Column("status", sa.String(), nullable=False, server_default="pending"),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now()),
    )
    op.create_index("ix_message_thread_id_sent_at", "message", ["thread_id", "sent_at"])


def downgrade() -> None:
    op.drop_index("ix_message_thread_id_sent_at", table_name="message")
    op.drop_table("message")
    op.drop_index("ix_thread_org_id_deal_id", table_name="thread")
    op.drop_table("thread")
    op.drop_table("contact")

