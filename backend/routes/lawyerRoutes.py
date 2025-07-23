from fastapi import APIRouter, HTTPException
from controllers.lawyerController import getAllLawyers,getLawyer,insertLawyer,deleteLawyer,updateLawyer
from models.lawyer import lawyer
from bson import ObjectId

router = APIRouter(prefix="/lawyer", tags=["Lawyer"])


@router.post("/")
async def create_lawyer_route(lawyer: lawyer):
    return await insertLawyer(lawyer)


@router.get("/{lId}")
async def get_lawyer_by_lid_route(lId: str):
    result = await getLawyer(lId)
    if not result:
        raise HTTPException(status_code=404, detail="Lawyer not found")
    return result


@router.delete("/{lId}")
async def delete_lawyer_route(lId: str):
    return await deleteLawyer(lId)


@router.get("/")
async def get_all_lawyers_route():
    return await getAllLawyers()

@router.put("/lawyer/{lId}")
async def update_lawyer_route(lId: str, update_data: updateLawyer):
    return await updateLawyer(lId, update_data)
