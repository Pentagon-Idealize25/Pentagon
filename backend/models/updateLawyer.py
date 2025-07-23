from typing import Optional, List
from pydantic import BaseModel, EmailStr

class updateLawyer(BaseModel):
    barRegistration: Optional[int] = None
    lawyerName: Optional[str] = None
    lawyerAddress: Optional[str] = None
    yearsOfExperience: Optional[int] = None
    contact: Optional[str] = None
    email: Optional[EmailStr] = None
    currentLawFirm: Optional[str] = None
    areaOfExpertise: Optional[List[str]] = None
    languages: Optional[List[str]] = None
    servicesOffered: Optional[List[str]] = None
    consultationMode: Optional[List[str]] = None