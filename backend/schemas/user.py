from pydantic import BaseModel, EmailStr
from typing import Optional

# Shared properties
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str

# Properties to return via API
class UserResponse(UserBase):
    id: str
    is_active: bool

    class Config:
        from_attributes = True
