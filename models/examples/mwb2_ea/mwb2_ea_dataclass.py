# Auto generated from mwb2_ea_v0.01.yaml by pythongen.py version: 0.0.1
# Generation date: 2025-02-06T23:51:56
# Schema: MWB2
#
# id: http://data.europa.eu/a4g/ontology
# description: Modified by hand from model2owl export of a model created using Enterprise Architect 7
# license: https://creativecommons.org/publicdomain/zero/1.0/

import dataclasses
import re
from dataclasses import dataclass
from datetime import (
    date,
    datetime,
    time
)
from typing import (
    Any,
    ClassVar,
    Dict,
    List,
    Optional,
    Union
)

from jsonasobj2 import (
    JsonObj,
    as_dict
)
from linkml_runtime.linkml_model.meta import (
    EnumDefinition,
    PermissibleValue,
    PvFormulaOptions
)
from linkml_runtime.utils.curienamespace import CurieNamespace
from linkml_runtime.utils.dataclass_extensions_376 import dataclasses_init_fn_with_kwargs
from linkml_runtime.utils.enumerations import EnumDefinitionImpl
from linkml_runtime.utils.formatutils import (
    camelcase,
    sfx,
    underscore
)
from linkml_runtime.utils.metamodelcore import (
    bnode,
    empty_dict,
    empty_list
)
from linkml_runtime.utils.slot import Slot
from linkml_runtime.utils.yamlutils import (
    YAMLRoot,
    extended_float,
    extended_int,
    extended_str
)
from rdflib import (
    Namespace,
    URIRef
)

from linkml_runtime.linkml_model.types import Integer, String, Uri
from linkml_runtime.utils.metamodelcore import URI

metamodel_version = "1.7.0"
version = None

# Overwrite dataclasses _init_fn to add **kwargs in __init__
dataclasses._init_fn = dataclasses_init_fn_with_kwargs

# Namespaces
LINKML = CurieNamespace('linkml', 'https://w3id.org/linkml/')
SCHEMA = CurieNamespace('schema', 'http://schema.org/')
DEFAULT_ = CurieNamespace('', 'http://data.europa.eu/a4g/ontology/')


# Types

# Class references



@dataclass(repr=False)
class Person(YAMLRoot):
    """
    Some person
    """
    _inherited_slots: ClassVar[List[str]] = []

    class_class_uri: ClassVar[URIRef] = SCHEMA["Person"]
    class_class_curie: ClassVar[str] = "schema:Person"
    class_name: ClassVar[str] = "Person"
    class_model_uri: ClassVar[URIRef] = URIRef("http://data.europa.eu/a4g/ontology/Person")

    name: str = None
    email: Union[str, URI] = None
    hasRole: Union[str, "Roles"] = None
    givenName: Optional[str] = None
    familyName: Optional[str] = None
    projects: Optional[Union[Union[dict, "Project"], List[Union[dict, "Project"]]]] = empty_list()

    def __post_init__(self, *_: List[str], **kwargs: Dict[str, Any]):
        if self._is_empty(self.name):
            self.MissingRequiredField("name")
        if not isinstance(self.name, str):
            self.name = str(self.name)

        if self._is_empty(self.email):
            self.MissingRequiredField("email")
        if not isinstance(self.email, URI):
            self.email = URI(self.email)

        if self._is_empty(self.hasRole):
            self.MissingRequiredField("hasRole")
        if not isinstance(self.hasRole, Roles):
            self.hasRole = Roles(self.hasRole)

        if self.givenName is not None and not isinstance(self.givenName, str):
            self.givenName = str(self.givenName)

        if self.familyName is not None and not isinstance(self.familyName, str):
            self.familyName = str(self.familyName)

        self._normalize_inlined_as_dict(slot_name="projects", slot_type=Project, key_name="title", keyed=False)

        super().__post_init__(**kwargs)


@dataclass(repr=False)
class Project(YAMLRoot):
    _inherited_slots: ClassVar[List[str]] = []

    class_class_uri: ClassVar[URIRef] = SCHEMA["Project"]
    class_class_curie: ClassVar[str] = "schema:Project"
    class_name: ClassVar[str] = "Project"
    class_model_uri: ClassVar[URIRef] = URIRef("http://data.europa.eu/a4g/ontology/Project")

    title: str = None
    identifier: Union[str, URI] = None
    code: int = None
    description: Optional[str] = None

    def __post_init__(self, *_: List[str], **kwargs: Dict[str, Any]):
        if self._is_empty(self.title):
            self.MissingRequiredField("title")
        if not isinstance(self.title, str):
            self.title = str(self.title)

        if self._is_empty(self.identifier):
            self.MissingRequiredField("identifier")
        if not isinstance(self.identifier, URI):
            self.identifier = URI(self.identifier)

        if self._is_empty(self.code):
            self.MissingRequiredField("code")
        if not isinstance(self.code, int):
            self.code = int(self.code)

        if self.description is not None and not isinstance(self.description, str):
            self.description = str(self.description)

        super().__post_init__(**kwargs)


# Enumerations
class Roles(EnumDefinitionImpl):

    ADMIN = PermissibleValue(
        text="ADMIN",
        description="admin role")
    USER = PermissibleValue(
        text="USER",
        description="user role")

    _defn = EnumDefinition(
        name="Roles",
    )

# Slots
class slots:
    pass

slots.person__name = Slot(uri=SCHEMA.name, name="person__name", curie=SCHEMA.curie('name'),
                   model_uri=DEFAULT_.person__name, domain=None, range=str)

slots.person__givenName = Slot(uri=SCHEMA.givenName, name="person__givenName", curie=SCHEMA.curie('givenName'),
                   model_uri=DEFAULT_.person__givenName, domain=None, range=Optional[str])

slots.person__familyName = Slot(uri=SCHEMA.familyName, name="person__familyName", curie=SCHEMA.curie('familyName'),
                   model_uri=DEFAULT_.person__familyName, domain=None, range=Optional[str])

slots.person__email = Slot(uri=SCHEMA.email, name="person__email", curie=SCHEMA.curie('email'),
                   model_uri=DEFAULT_.person__email, domain=None, range=Union[str, URI])

slots.person__projects = Slot(uri=SCHEMA.projects, name="person__projects", curie=SCHEMA.curie('projects'),
                   model_uri=DEFAULT_.person__projects, domain=None, range=Optional[Union[Union[dict, Project], List[Union[dict, Project]]]])

slots.person__hasRole = Slot(uri=SCHEMA.hasRole, name="person__hasRole", curie=SCHEMA.curie('hasRole'),
                   model_uri=DEFAULT_.person__hasRole, domain=None, range=Union[str, "Roles"])

slots.project__title = Slot(uri=SCHEMA.title, name="project__title", curie=SCHEMA.curie('title'),
                   model_uri=DEFAULT_.project__title, domain=None, range=str)

slots.project__identifier = Slot(uri=SCHEMA.identifier, name="project__identifier", curie=SCHEMA.curie('identifier'),
                   model_uri=DEFAULT_.project__identifier, domain=None, range=Union[str, URI])

slots.project__description = Slot(uri=SCHEMA.description, name="project__description", curie=SCHEMA.curie('description'),
                   model_uri=DEFAULT_.project__description, domain=None, range=Optional[str])

slots.project__code = Slot(uri=SCHEMA.code, name="project__code", curie=SCHEMA.curie('code'),
                   model_uri=DEFAULT_.project__code, domain=None, range=int)
