from fastapi import APIRouter, Depends, HTTPException, status
from starlette.status import HTTP_503_SERVICE_UNAVAILABLE
from app.crud.attachments_table import AttachmentsTable
from app.crud.users_table import UsersTable
from app.dependencies import get_attachments_table, get_users_table
from app.exceptions import DataNotFound
from app.schemas.attachment import AttachmentCreate
from app.schemas.send_email import (
    SendEmailRequest,
    SendOpportunityEmailRequest,
)
from app.utils.cv_bucket_manager import CVBucketManager
from app.utils.email_sender import EmailSender

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
    email_sender = EmailSender()
    try:
        email_sender.send_email(**send_email_request.model_dump())

    except RuntimeError:
        raise HTTPException(
            status_code=HTTP_503_SERVICE_UNAVAILABLE,
            detail="Email service is unavailable",
        )


@router.post(
    "/send_opportunity_email",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={
        HTTP_503_SERVICE_UNAVAILABLE: {
            "description": "Email service is unavailable",
        },
    },
    summary="Send opportunity email with CV",
    description=(
        "Send an email to the specified email address."
        "The recipient, subject, message and attachment of the email are specified in the request."
    ),
)
async def send_opportunity_email(
    request: SendOpportunityEmailRequest,
    attachments_table: AttachmentsTable = Depends(get_attachments_table),
    users_table: UsersTable = Depends(get_users_table),
):
    email_sender = EmailSender()

    unique_attachment_id = request.opportunity_id + ":" + request.copy_email

    cv_manager = CVBucketManager()

    cv_manager.save_cv(
        user_email=request.copy_email,
        base64_content=request.file_base64,
        file_name=request.file_name,
    )

    cv_url = cv_manager.generate_one_time_link(
        request.copy_email, request.file_name
    )
    cv_manager.configure_auto_delete(
        user_email=request.copy_email,
        retention_days=1,
        file_name=request.file_name,
    )
    try:
        attachments_table.delete_attachment(
            attachments_table.get_attachment_real_id(unique_attachment_id)
        )
    except DataNotFound:
        pass

    attachments_table.create_attachment(
        AttachmentCreate(
            unique_id=unique_attachment_id,
            attachment=[{"url": cv_url}],
        )
    )

    payload = {
        key: value
        for key, value in request.model_dump().items()
        if key not in ["file_base64", "file_name"]
    }

    try:
        email_sender.send_opportunity_email(
            **payload,
        )

        # Update the number of opportunities the user has applied to:
        user_email = request.copy_email
        user = users_table.get_user(user_email)
        user.total_opportunities_applied += 1
        users_table.update_user(user)

    except RuntimeError:
        raise HTTPException(
            status_code=HTTP_503_SERVICE_UNAVAILABLE,
            detail="Email service is unavailable",
        )
