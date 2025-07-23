from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from typing import List, Dict, Any

def format_validation_errors(errors: List[Dict[str, Any]]) -> List[Dict[str, str]]:
    formatted_errors = []
    for error in errors:
        field = " -> ".join(str(loc) for loc in error["loc"] if loc != "body")
        formatted_errors.append({
            "field": field,
            "message": error.get("msg", "Unknown error")
        })
    return formatted_errors

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    formatted_errors = format_validation_errors(exc.errors())
    error_messages = [error["message"] for error in formatted_errors]
    return JSONResponse(
        status_code=422,
        content={
            "status": "error",
            "code": 422,
            "message": " ".join(error_messages),
            "errors": formatted_errors,
            "data": None
        }
    )

async def global_exception_handler(request: Request, exc: Exception):
    status_code = 500
    error_type = "Internal Server Error"
    
    if isinstance(exc, ValueError):
        status_code = 400
        error_type = "Bad Request"
    
    return JSONResponse(
        status_code=status_code,
        content={
            "status": "error",
            "code": status_code,
            "message": str(exc),
            "errors": [{"field": "general", "message": str(exc)}],
            "data": None
        }
    )