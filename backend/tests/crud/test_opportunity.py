import pytest
from app.crud.opportunities_table import OpportunitiesTable
from app.exceptions import DataNotFound
from app.schemas.opportunity import OpportunityCreate


def create_test_opportunity() -> OpportunityCreate:
    return OpportunityCreate(
        Name="Test Opportunity",
        Status="Open",
        Vaga="Developer",
        Tipo="Full-time",
        Contato="test@example.com",
        Descricao="Test description",
    )


def test_get_opportunity(test_db):
    opportunity = create_test_opportunity()
    opportunities_table = OpportunitiesTable(db=test_db)
    opportunities_table.create(opportunity)

    created_opportunity = opportunities_table.get_all()[0]
    assert (
        opportunities_table.get(created_opportunity.id).Name
        == "Test Opportunity"
    )


def test_update_opportunity(test_db):
    opportunity = create_test_opportunity()
    opportunities_table = OpportunitiesTable(db=test_db)
    opportunities_table.create(opportunity)

    created_opportunity = opportunities_table.get_all()[0]
    created_opportunity.Status = "Closed"
    opportunities_table.update(created_opportunity)

    assert opportunities_table.get(created_opportunity.id).Status == "Closed"


def test_get_all_opportunities(test_db):
    opportunities_table = OpportunitiesTable(db=test_db)
    opportunities_table.create(create_test_opportunity())
    opportunities_table.create(
        OpportunityCreate(
            Name="Another Opportunity",
            Status="Open",
            Vaga="Tester",
            Tipo="Part-time",
            Contato="another@example.com",
            Descricao="Another description",
        )
    )

    all_opportunities = opportunities_table.get_all()
    assert len(all_opportunities) == 2
    assert set([opportunity.Name for opportunity in all_opportunities]) == {
        "Test Opportunity",
        "Another Opportunity",
    }


def test_get_opportunity_WHEN_opportunity_does_not_exist_THEN_raises_DataNotFound(
    test_db,
):
    opportunities_table = OpportunitiesTable(db=test_db)
    with pytest.raises(DataNotFound):
        opportunities_table.get("nonexistent_id")
