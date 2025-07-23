from datetime import date
from pydantic import BaseModel,EmailStr
from typing import Optional,List
# from models import successStory resolve this!!

class lawyer(BaseModel):
    lId:str
    barRegistration:int
    lawyerName:str
    lawyerAddress:str
    yearsOfExperience:int
    contact:str
    email:EmailStr
    currentLawFirm:str
    areaOfExpertise:List[str]
    languages:List[str]
    servicesOffered:List[str]
    consultationMode:List[str]

    