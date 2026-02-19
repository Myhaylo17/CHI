from pydantic import BaseModel, Field
from typing import List


class ConcurrencyConcept(BaseModel):
    concept_name: str = Field(..., min_length=3)
    description: str
    advantages: List[str]
    disadvantages: List[str]
