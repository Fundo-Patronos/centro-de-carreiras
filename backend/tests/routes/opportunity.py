from app.crud.opportunities_table import OpportunitiesTable
from app.schemas.opportunity import OpportunityCreate


def test_get_all_opportunities(client, test_db):
    table = OpportunitiesTable(db=test_db)

    table.create(
        OpportunityCreate(Name="Opportunity 1", Status="Open", Vaga="Dev", Tipo="Full-time", Contato="contact1@example.com")
    )
    table.create(
        OpportunityCreate(Name="Opportunity 2", Status="Closed", Vaga="Designer", Tipo="Part-time", Contato="contact2@example.com")
    )

    response = client.get("/opportunities")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["Name"] == "Opportunity 1"
    assert data[1]["Name"] == "Opportunity 2"


def test_get_opportunity_by_id(client, test_db):
    table = OpportunitiesTable(db=test_db)

    table.create(
        OpportunityCreate(Name="Opportunity 1", Status="Open", Vaga="Dev", Tipo="Full-time", Contato="contact1@example.com")
    )

    opportunity = table.get_all()[0]

    response = client.get(f"/opportunities/{opportunity.id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == opportunity.id
    assert data["Name"] == "Opportunity 1"


def test_get_opportunity_not_found(client):
    response = client.get("/opportunities/nonexistent_id")
    assert response.status_code == 400
    assert response.json()["detail"] == "Opportunity not found"


def test_get_all_opportunities_with_service_unavailable_error(client, monkeypatch):

    def mock_get_all():
        raise RuntimeError("Database connection error")
    monkeypatch.setattr(OpportunitiesTable, "get_all", mock_get_all)

    response = client.get("/opportunities")
    assert response.status_code == 503
    assert response.json()["detail"] == "Database connection error"
