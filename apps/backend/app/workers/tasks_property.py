from app.workers.celery_app import celery

@celery.task(name="app.workers.tasks_property.reindex_property")
def reindex_property(property_id: str):
    # placeholder for search index update
    return {"ok": True, "property_id": property_id}
