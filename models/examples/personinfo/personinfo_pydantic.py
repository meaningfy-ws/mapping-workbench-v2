from __future__ import annotations 

import re
import sys
from datetime import (
    date,
    datetime,
    time
)
from decimal import Decimal 
from enum import Enum 
from typing import (
    Any,
    ClassVar,
    Dict,
    List,
    Literal,
    Optional,
    Union
)

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    RootModel,
    field_validator
)


metamodel_version = "None"
version = "None"


class ConfiguredBaseModel(BaseModel):
    model_config = ConfigDict(
        validate_assignment = True,
        validate_default = True,
        extra = "forbid",
        arbitrary_types_allowed = True,
        use_enum_values = True,
        strict = False,
    )
    pass




class LinkMLMeta(RootModel):
    root: Dict[str, Any] = {}
    model_config = ConfigDict(frozen=True)

    def __getattr__(self, key:str):
        return getattr(self.root, key)

    def __getitem__(self, key:str):
        return self.root[key]

    def __setitem__(self, key:str, value):
        self.root[key] = value

    def __contains__(self, key:str) -> bool:
        return key in self.root


linkml_meta = LinkMLMeta({'default_prefix': 'https://w3id.org/linkml/examples/personinfo/',
     'description': 'Produced with the help of Google Gemini',
     'id': 'https://w3id.org/linkml/examples/personinfo',
     'imports': ['linkml:types'],
     'name': 'personinfo',
     'prefixes': {'linkml': {'prefix_prefix': 'linkml',
                             'prefix_reference': 'https://w3id.org/linkml/'},
                  'schema': {'prefix_prefix': 'schema',
                             'prefix_reference': 'http://schema.org/'}},
     'source_file': 'personinfo_v0.01.yaml'} )

class GenderEnum(str, Enum):
    # Male gender
    male = "male"
    # Female gender
    female = "female"
    # Non-binary gender
    non_binary = "non_binary"


class EmploymentStatusEnum(str, Enum):
    # Full-time employment
    full_time = "full_time"
    # Part-time employment
    part_time = "part_time"
    # Contract-based employment
    contract = "contract"
    # Unemployed
    unemployed = "unemployed"



class Person(ConfiguredBaseModel):
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'class_uri': 'schema:Person',
         'from_schema': 'https://w3id.org/linkml/examples/personinfo'})

    id: str = Field(default=..., json_schema_extra = { "linkml_meta": {'alias': 'id', 'domain_of': ['Person']} })
    full_name: str = Field(default=..., json_schema_extra = { "linkml_meta": {'alias': 'full_name', 'domain_of': ['Person']} })
    age: Optional[int] = Field(default=None, ge=0, le=200, json_schema_extra = { "linkml_meta": {'alias': 'age', 'domain_of': ['Person']} })
    gender: Optional[GenderEnum] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'gender', 'domain_of': ['Person']} })
    birth_date: date = Field(default=..., json_schema_extra = { "linkml_meta": {'alias': 'birth_date', 'domain_of': ['Person']} })
    website: Optional[str] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'website', 'domain_of': ['Person']} })
    salary: Optional[Decimal] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'salary', 'domain_of': ['Person']} })


class Address(ConfiguredBaseModel):
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'class_uri': 'schema:PostalAddress',
         'from_schema': 'https://w3id.org/linkml/examples/personinfo'})

    street_address: Optional[str] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'street_address', 'domain_of': ['Address']} })
    city: Optional[str] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'city', 'domain_of': ['Address']} })
    postal_code: Optional[str] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'postal_code', 'domain_of': ['Address']} })


class Employment(ConfiguredBaseModel):
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'class_uri': 'schema:Employment',
         'from_schema': 'https://w3id.org/linkml/examples/personinfo'})

    employer: Optional[str] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'employer', 'domain_of': ['Employment']} })
    start_date: Optional[date] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'start_date', 'domain_of': ['Employment']} })
    end_date: Optional[date] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'end_date', 'domain_of': ['Employment']} })
    status: Optional[EmploymentStatusEnum] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'status', 'domain_of': ['Employment']} })


# Model rebuild
# see https://pydantic-docs.helpmanual.io/usage/models/#rebuilding-a-model
Person.model_rebuild()
Address.model_rebuild()
Employment.model_rebuild()

