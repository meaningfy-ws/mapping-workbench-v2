import linkml_official.linkml_official_dataclass as linkmldc
import linkml_official.linkml_official_dataclass as linkmlpd

print("Dataclass:")
persondc = linkmlpd.Person(id='ORCID:9876', full_name='Lex Luthor')
print(persondc)

print("Pydantic:")
personpd = linkmlpd.Person(id='ORCID:9876', full_name='Lex Luthor')
print(personpd)
