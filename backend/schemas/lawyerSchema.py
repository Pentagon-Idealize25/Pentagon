def getIndividualLawyer(lawyer) -> dict:
    if not lawyer:
        return {"error": "Lawyer not found"}
    return {
        "id": str(lawyer["_id"]),
        "lId": lawyer["lId"],
        "barRegistration": lawyer["barRegistration"],
        "name": lawyer["lawyerName"],
        "address": lawyer["lawyerAddress"],
        "yearsOfExperience": lawyer["yearsOfExperience"],
        "contact": lawyer["contact"],
        "email": lawyer["email"],
        "currentLawFirm": lawyer["currentLawFirm"],
        "areaOfExpertise": lawyer["areaOfExpertise"],
        "languages": lawyer["languages"],
        "services": lawyer["servicesOffered"],
        "consultationMode": lawyer["consultationMode"],
    }
