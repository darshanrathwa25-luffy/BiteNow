from fastapi import APIRouter, Depends
from app.modules.auth.schemas import UserSchema
from app.core.dependencies import get_current_user
from app.modules.auth.models import User

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/me", response_model=UserSchema)
async def get_me(user: User = Depends(get_current_user)):
    return user
