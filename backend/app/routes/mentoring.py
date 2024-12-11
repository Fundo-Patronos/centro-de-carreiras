from fastapi import APIRouter, HTTPException, Depends, status
from app.schemas.error import DefaultErrorResponse
from app.crud.schedules_table import SchedulesTable
from app.models.schedule import Schedule
from app.schemas.send_email import SendEmailRequest
from app.utils.auth import Auth
from fastapi import Header
import jwt

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
async def get_endpoint(mentor_name: str):
    """Get all schedules for a mentor"""

    schedules = SchedulesTable.get_schedules(mentor_name)
    if schedules is None:
        raise HTTPException(status_code=404, detail="Schedules not found")
    return schedules


@router.post(
    "/mentoring/send_mentoring_email",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={
        404: {
            "model": DefaultErrorResponse,
            "description": "Email not found",
        }
    },
)
async def send_mentoring_email(
    email: SendEmailRequest,
    authorization: str = Header(None),
):

    token = authorization.split(" ")[1]

    auth = Auth()

    try:
        auth.decode_jwt_token(token)

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="Invalid reset token",
        )

    try:
        auth.send_email(email.email, "Mentoring", "Mentoring email", [])

    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

    return {"message": "Mentoring email was sent successfully."}
