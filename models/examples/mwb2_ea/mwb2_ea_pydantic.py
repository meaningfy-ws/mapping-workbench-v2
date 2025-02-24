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


linkml_meta = LinkMLMeta({'default_prefix': 'http://data.europa.eu/a4g/ontology/',
     'default_range': 'string',
     'description': 'Modified by hand from model2owl export of a model created '
                    'using Enterprise Architect 7',
     'id': 'http://data.europa.eu/a4g/ontology',
     'imports': ['linkml:types'],
     'name': 'MWB2',
     'prefixes': {'linkml': {'prefix_prefix': 'linkml',
                             'prefix_reference': 'https://w3id.org/linkml/'}},
     'source_file': 'mwb2_ea_v0.01.yaml'} )

class Roles(str, Enum):
    # admin role
    ADMIN = "ADMIN"
    # user role
    USER = "USER"



class Person(ConfiguredBaseModel):
    """
    Some person
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'class_uri': 'schema:Person',
         'from_schema': 'http://data.europa.eu/a4g/ontology'})

    name: str = Field(default=..., json_schema_extra = { "linkml_meta": {'alias': 'name', 'domain_of': ['Person'], 'slot_uri': 'schema:name'} })
    givenName: Optional[str] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'givenName', 'domain_of': ['Person'], 'slot_uri': 'schema:givenName'} })
    familyName: Optional[str] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'familyName',
         'domain_of': ['Person'],
         'slot_uri': 'schema:familyName'} })
    email: str = Field(default=..., json_schema_extra = { "linkml_meta": {'alias': 'email', 'domain_of': ['Person'], 'slot_uri': 'schema:email'} })
    projects: Optional[List[Project]] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'projects', 'domain_of': ['Person'], 'slot_uri': 'schema:projects'} })
    hasRole: Roles = Field(default=..., json_schema_extra = { "linkml_meta": {'alias': 'hasRole', 'domain_of': ['Person'], 'slot_uri': 'schema:hasRole'} })


class Project(ConfiguredBaseModel):
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'class_uri': 'schema:Project',
         'from_schema': 'http://data.europa.eu/a4g/ontology'})

    title: str = Field(default=..., json_schema_extra = { "linkml_meta": {'alias': 'title', 'domain_of': ['Project'], 'slot_uri': 'schema:title'} })
    identifier: str = Field(default=..., json_schema_extra = { "linkml_meta": {'alias': 'identifier',
         'domain_of': ['Project'],
         'slot_uri': 'schema:identifier'} })
    description: Optional[str] = Field(default=None, json_schema_extra = { "linkml_meta": {'alias': 'description',
         'domain_of': ['Project'],
         'slot_uri': 'schema:description'} })
    code: int = Field(default=..., json_schema_extra = { "linkml_meta": {'alias': 'code', 'domain_of': ['Project'], 'slot_uri': 'schema:code'} })


# Model rebuild
# see https://pydantic-docs.helpmanual.io/usage/models/#rebuilding-a-model
Person.model_rebuild()
Project.model_rebuild()

