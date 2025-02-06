# Auto generated from personinfo_v0.01.yaml by pythongen.py version: 0.0.1
# Generation date: 2025-02-07T00:16:06
# Schema: personinfo
#
# id: https://w3id.org/linkml/examples/personinfo
# description: Produced with the help of Google Gemini
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

from linkml_runtime.linkml_model.types import Date, Decimal, Integer, String, Uri
from linkml_runtime.utils.metamodelcore import Decimal, URI, XSDDate

metamodel_version = "1.7.0"
version = None

# Overwrite dataclasses _init_fn to add **kwargs in __init__
dataclasses._init_fn = dataclasses_init_fn_with_kwargs

# Namespaces
LINKML = CurieNamespace('linkml', 'https://w3id.org/linkml/')
SCHEMA = CurieNamespace('schema', 'http://schema.org/')
DEFAULT_ = CurieNamespace('', 'https://w3id.org/linkml/examples/personinfo/')


# Types

# Class references
class PersonId(extended_str):
    pass


@dataclass(repr=False)
class Person(YAMLRoot):
    _inherited_slots: ClassVar[List[str]] = []

    class_class_uri: ClassVar[URIRef] = SCHEMA["Person"]
    class_class_curie: ClassVar[str] = "schema:Person"
    class_name: ClassVar[str] = "Person"
    class_model_uri: ClassVar[URIRef] = URIRef("https://w3id.org/linkml/examples/personinfo/Person")

    id: Union[str, PersonId] = None
    full_name: str = None
    birth_date: Union[str, XSDDate] = None
    age: Optional[int] = None
    gender: Optional[Union[str, "GenderEnum"]] = None
    website: Optional[Union[str, URI]] = None
    salary: Optional[Decimal] = None

    def __post_init__(self, *_: List[str], **kwargs: Dict[str, Any]):
        if self._is_empty(self.id):
            self.MissingRequiredField("id")
        if not isinstance(self.id, PersonId):
            self.id = PersonId(self.id)

        if self._is_empty(self.full_name):
            self.MissingRequiredField("full_name")
        if not isinstance(self.full_name, str):
            self.full_name = str(self.full_name)

        if self._is_empty(self.birth_date):
            self.MissingRequiredField("birth_date")
        if not isinstance(self.birth_date, XSDDate):
            self.birth_date = XSDDate(self.birth_date)

        if self.age is not None and not isinstance(self.age, int):
            self.age = int(self.age)

        if self.gender is not None and not isinstance(self.gender, GenderEnum):
            self.gender = GenderEnum(self.gender)

        if self.website is not None and not isinstance(self.website, URI):
            self.website = URI(self.website)

        if self.salary is not None and not isinstance(self.salary, Decimal):
            self.salary = Decimal(self.salary)

        super().__post_init__(**kwargs)


@dataclass(repr=False)
class Address(YAMLRoot):
    _inherited_slots: ClassVar[List[str]] = []

    class_class_uri: ClassVar[URIRef] = SCHEMA["PostalAddress"]
    class_class_curie: ClassVar[str] = "schema:PostalAddress"
    class_name: ClassVar[str] = "Address"
    class_model_uri: ClassVar[URIRef] = URIRef("https://w3id.org/linkml/examples/personinfo/Address")

    street_address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None

    def __post_init__(self, *_: List[str], **kwargs: Dict[str, Any]):
        if self.street_address is not None and not isinstance(self.street_address, str):
            self.street_address = str(self.street_address)

        if self.city is not None and not isinstance(self.city, str):
            self.city = str(self.city)

        if self.postal_code is not None and not isinstance(self.postal_code, str):
            self.postal_code = str(self.postal_code)

        super().__post_init__(**kwargs)


@dataclass(repr=False)
class Employment(YAMLRoot):
    _inherited_slots: ClassVar[List[str]] = []

    class_class_uri: ClassVar[URIRef] = SCHEMA["Employment"]
    class_class_curie: ClassVar[str] = "schema:Employment"
    class_name: ClassVar[str] = "Employment"
    class_model_uri: ClassVar[URIRef] = URIRef("https://w3id.org/linkml/examples/personinfo/Employment")

    employer: Optional[str] = None
    start_date: Optional[Union[str, XSDDate]] = None
    end_date: Optional[Union[str, XSDDate]] = None
    status: Optional[Union[str, "EmploymentStatusEnum"]] = None

    def __post_init__(self, *_: List[str], **kwargs: Dict[str, Any]):
        if self.employer is not None and not isinstance(self.employer, str):
            self.employer = str(self.employer)

        if self.start_date is not None and not isinstance(self.start_date, XSDDate):
            self.start_date = XSDDate(self.start_date)

        if self.end_date is not None and not isinstance(self.end_date, XSDDate):
            self.end_date = XSDDate(self.end_date)

        if self.status is not None and not isinstance(self.status, EmploymentStatusEnum):
            self.status = EmploymentStatusEnum(self.status)

        super().__post_init__(**kwargs)


# Enumerations
class GenderEnum(EnumDefinitionImpl):

    male = PermissibleValue(
        text="male",
        description="Male gender")
    female = PermissibleValue(
        text="female",
        description="Female gender")
    non_binary = PermissibleValue(
        text="non_binary",
        description="Non-binary gender")

    _defn = EnumDefinition(
        name="GenderEnum",
    )

class EmploymentStatusEnum(EnumDefinitionImpl):

    full_time = PermissibleValue(
        text="full_time",
        description="Full-time employment")
    part_time = PermissibleValue(
        text="part_time",
        description="Part-time employment")
    contract = PermissibleValue(
        text="contract",
        description="Contract-based employment")
    unemployed = PermissibleValue(
        text="unemployed",
        description="Unemployed")

    _defn = EnumDefinition(
        name="EmploymentStatusEnum",
    )

# Slots
class slots:
    pass

slots.address = Slot(uri=DEFAULT_.address, name="address", curie=DEFAULT_.curie('address'),
                   model_uri=DEFAULT_.address, domain=Person, range=Optional[Union[dict, "Address"]])

slots.employment_history = Slot(uri=DEFAULT_.employment_history, name="employment_history", curie=DEFAULT_.curie('employment_history'),
                   model_uri=DEFAULT_.employment_history, domain=Person, range=Optional[Union[Union[dict, "Employment"], List[Union[dict, "Employment"]]]])

slots.person__id = Slot(uri=DEFAULT_.id, name="person__id", curie=DEFAULT_.curie('id'),
                   model_uri=DEFAULT_.person__id, domain=None, range=URIRef)

slots.person__full_name = Slot(uri=DEFAULT_.full_name, name="person__full_name", curie=DEFAULT_.curie('full_name'),
                   model_uri=DEFAULT_.person__full_name, domain=None, range=str)

slots.person__age = Slot(uri=DEFAULT_.age, name="person__age", curie=DEFAULT_.curie('age'),
                   model_uri=DEFAULT_.person__age, domain=None, range=Optional[int])

slots.person__gender = Slot(uri=DEFAULT_.gender, name="person__gender", curie=DEFAULT_.curie('gender'),
                   model_uri=DEFAULT_.person__gender, domain=None, range=Optional[Union[str, "GenderEnum"]])

slots.person__birth_date = Slot(uri=DEFAULT_.birth_date, name="person__birth_date", curie=DEFAULT_.curie('birth_date'),
                   model_uri=DEFAULT_.person__birth_date, domain=None, range=Union[str, XSDDate])

slots.person__website = Slot(uri=DEFAULT_.website, name="person__website", curie=DEFAULT_.curie('website'),
                   model_uri=DEFAULT_.person__website, domain=None, range=Optional[Union[str, URI]])

slots.person__salary = Slot(uri=DEFAULT_.salary, name="person__salary", curie=DEFAULT_.curie('salary'),
                   model_uri=DEFAULT_.person__salary, domain=None, range=Optional[Decimal])

slots.address__street_address = Slot(uri=DEFAULT_.street_address, name="address__street_address", curie=DEFAULT_.curie('street_address'),
                   model_uri=DEFAULT_.address__street_address, domain=None, range=Optional[str])

slots.address__city = Slot(uri=DEFAULT_.city, name="address__city", curie=DEFAULT_.curie('city'),
                   model_uri=DEFAULT_.address__city, domain=None, range=Optional[str])

slots.address__postal_code = Slot(uri=DEFAULT_.postal_code, name="address__postal_code", curie=DEFAULT_.curie('postal_code'),
                   model_uri=DEFAULT_.address__postal_code, domain=None, range=Optional[str])

slots.employment__employer = Slot(uri=DEFAULT_.employer, name="employment__employer", curie=DEFAULT_.curie('employer'),
                   model_uri=DEFAULT_.employment__employer, domain=None, range=Optional[str])

slots.employment__start_date = Slot(uri=DEFAULT_.start_date, name="employment__start_date", curie=DEFAULT_.curie('start_date'),
                   model_uri=DEFAULT_.employment__start_date, domain=None, range=Optional[Union[str, XSDDate]])

slots.employment__end_date = Slot(uri=DEFAULT_.end_date, name="employment__end_date", curie=DEFAULT_.curie('end_date'),
                   model_uri=DEFAULT_.employment__end_date, domain=None, range=Optional[Union[str, XSDDate]])

slots.employment__status = Slot(uri=DEFAULT_.status, name="employment__status", curie=DEFAULT_.curie('status'),
                   model_uri=DEFAULT_.employment__status, domain=None, range=Optional[Union[str, "EmploymentStatusEnum"]])
