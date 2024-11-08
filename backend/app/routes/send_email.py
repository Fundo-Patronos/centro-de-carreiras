from fastapi import APIRouter, HTTPException, status
from starlette.status import HTTP_503_SERVICE_UNAVAILABLE
from app.schemas.send_email import SendEmailRequest
from app.utils.auth import Auth

router = APIRouter()

@router.post(
    "/send_email",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={
        HTTP_503_SERVICE_UNAVAILABLE: {
            "description": "Email service is unavailable",
        },
    },
    summary="Send email",
    description=(
        "Send an email to the specified email address."
        "The recipient, subject and message of the email are specified in the request."
    ),
)
async def send_email(
    send_email_request: SendEmailRequest,
):
    auth = Auth()
    try:
        auth.send_email(**send_email_request.model_dump())

    except RuntimeError:
        raise HTTPException(
            status_code=HTTP_503_SERVICE_UNAVAILABLE,
            detail="Email service is unavailable",
        )
