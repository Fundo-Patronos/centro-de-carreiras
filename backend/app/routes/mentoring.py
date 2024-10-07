from fastapi import APIRouter, HTTPException, Depends, status
from app.schemas.error import DefaultErrorResponse
from app.crud.schedules_table import SchedulesTable
from app.models.schedule import Schedule

router = APIRouter()

@router.get(
    "/mentoring/schedules/",
    response_model=list[Schedule],
    status_code=status.HTTP_200_OK,
    responses={
        409: {
            "model": DefaultErrorResponse,
            "description": "Email or username in use",
        }
    },
)
async def get_endpoint(
    mentor_name: str 
):
    
    """Get all schedules for a mentor"""

    schedules = SchedulesTable.get_schedules(mentor_name)
    if schedules is None:
        raise HTTPException(status_code=404, detail="Schedules not found")
    return schedules
