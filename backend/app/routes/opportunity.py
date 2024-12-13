from fastapi import APIRouter, HTTPException, Depends, status
from app.crud.opportunities_table import OpportunitiesTable
from app.dependencies import get_opportunities_table
from app.exceptions import DataNotFound
from app.models.opportunity import Opportunity
from app.schemas.error import DefaultErrorResponse

router = APIRouter()


@router.get(
    "/opportunities",
    response_model=list[Opportunity],
    status_code=status.HTTP_200_OK,
    responses={
        status.HTTP_503_SERVICE_UNAVAILABLE: {
            "model": DefaultErrorResponse,
            "description": "Internal Server Error",
        }
    },
)
async def get_all(
    opportunities_table: OpportunitiesTable = Depends(get_opportunities_table),
):
    try:
        return opportunities_table.get_all()
    except RuntimeError as e:
        print(e)
        raise HTTPException(status_code=503, detail=str(e))


@router.get(
    "/opportunities/{id}",
    response_model=Opportunity,
    status_code=status.HTTP_200_OK,
    responses={
        status.HTTP_400_BAD_REQUEST: {
            "model": DefaultErrorResponse,
            "description": "Opportunity not found",
        },
        status.HTTP_503_SERVICE_UNAVAILABLE: {
            "model": DefaultErrorResponse,
            "description": "Could not connect to database",
        },
    },
)
async def get_opportunity(
    id: str,
    opportunities_table: OpportunitiesTable = Depends(get_opportunities_table),
):
    try:
        return opportunities_table.get(id)
    except DataNotFound as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        print(e)
        raise HTTPException(status_code=503, detail=str(e))
    except PermissionError as e:
        print(e)
        raise HTTPException(status_code=503, detail=str(e))
