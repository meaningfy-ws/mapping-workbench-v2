import personinfo.personinfo_dataclass as personinfodc
import personinfo.personinfo_pydantic as personinfopd

print("Dataclass")
persondc = personinfodc.Person(id='1234', full_name='John', birth_date='2023-04-01', website="john")
print(persondc)
print("birth_date:", type(persondc.birth_date))
print("website:", type(persondc.website))

print("Pydantic")
personpd = personinfopd.Person(id='1234', full_name='John', birth_date='2023-04-01', website="john")
print(personpd)
print("birth_date:", type(personpd.birth_date))
print("website:", type(personpd.website))
