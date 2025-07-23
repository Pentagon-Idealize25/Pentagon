from db.database import lawyers_collection
from models.lawyer import lawyer
from models.updateLawyer import updateLawyer
from schemas.lawyerSchema import getIndividualLawyer
from fastapi import HTTPException

async def insertLawyer(lawyer:lawyer)->dict:
    lawyer_dict=dict(lawyer)
    result = await lawyers_collection.insert_one(lawyer_dict)
    if result:
        return{"id":str(result.inserted_id)}
    else:
        return{"error":"Error occured"}
    
# async def getLawyer(lId:str):
#     lawyer = await lawyers_collection.find_one({"lId": lId}) 
#     return getIndividualLawyer(lawyer)

from bson import ObjectId
from fastapi import HTTPException

async def getLawyer(lId: str):
    try:
        lawyer = await lawyers_collection.find_one({"lId": lId})
        
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    if not lawyer:
        raise HTTPException(status_code=404, detail="Lawyer not found")
    return getIndividualLawyer(lawyer)


async def deleteLawyer(lId:str):
    result = await lawyers_collection.delete_one({"lId": lId})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lawyer not found")
    return {"message": "Lawyer deleted successfully"}


async def getAllLawyers():
    lawyers_cursor = lawyers_collection.find()
    lawyers = await lawyers_cursor.to_list(length=None)
    return [getIndividualLawyer(l) for l in lawyers]

async def updateLawyer(lId: str, update_data: updateLawyer) -> dict:
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}

    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    result = await lawyers_collection.update_one(
        {"lId": lId},
        {"$set": update_dict}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lawyer not found")

    if result.modified_count == 0:
        return {"message": "No changes made (fields may be identical)"}

    return {"message": "Lawyer updated successfully"}


# write update lawyer crud