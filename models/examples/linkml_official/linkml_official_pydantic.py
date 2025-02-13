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
     'default_range': 'string',
     'id': 'https://w3id.org/linkml/examples/personinfo',
     'imports': ['linkml:types'],
     'name': 'personinfo',
     'prefixes': {'ORCID': {'prefix_prefix': 'ORCID',
                            'prefix_reference': 'https://orcid.org/'},
                  'linkml': {'prefix_prefix': 'linkml',
                             'prefix_reference': 'https://w3id.org/linkml/'},
                  'personinfo': {'prefix_prefix': 'personinfo',
                                 'prefix_reference': 'https://w3id.org/linkml/examples/personinfo/'},
                  'schema': {'prefix_prefix': 'schema',
                             'prefix_reference': 'http://schema.org/'}},
     'source_file': 'linkml_official.yaml'} )


class Person(ConfiguredBaseModel):
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'class_uri': 'schema:Person',
         'from_schema': 'https://w3id.org/linkml/examples/personinfo',
         'id_prefixes': ['ORCID']})

    id: str = Field(default=..., json_schema_extra = { "linkml_meta": {'alias': 'id', 'domain_of': ['Person']} })
    full_name: str = Field(default=..., description="""name of the person""", json_schema_extra = { "linkml_meta": {'alias': 'full_name', 'domain_of': ['Person'], 'slot_uri': 'schema:name'} })
    aliases: Optional[List[str]] = Field(default=None, description="""other names for the person""", json_schema_extra = { "linkml_meta": {'alias': 'aliases', 'domain_of': ['Person']} })
    phone: Optional[str] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'phone', 'domain_of': ['Person'], 'slot_uri': 'schema:telephone'} })
    age: Optional[int] = Field(default=None, ge=0, le=200, json_schema_extra = { "linkml_meta": {'alias': 'age', 'domain_of': ['Person']} })

    @field_validator('phone')
    def pattern_phone(cls, v):
        pattern=re.compile(r"^[\d\(\)\-]+$")
        if isinstance(v,list):
            for element in v:
                if isinstance(v, str) and not pattern.match(element):
                    raise ValueError(f"Invalid phone format: {element}")
        elif isinstance(v,str):
            if not pattern.match(v):
                raise ValueError(f"Invalid phone format: {v}")
        return v


class Container(ConfiguredBaseModel):
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://w3id.org/linkml/examples/personinfo'})

    persons: Optional[List[Person]] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'persons', 'domain_of': ['Container']} })


# Model rebuild
# see https://pydantic-docs.helpmanual.io/usage/models/#rebuilding-a-model
Person.model_rebuild()
Container.model_rebuild()

