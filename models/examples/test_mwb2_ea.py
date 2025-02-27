import mwb2_ea.mwb2_ea_dataclass as mwb2dc
import mwb2_ea.mwb2_ea_pydantic as mwb2pd

print("Dataclass")
persondc = mwb2dc.Person(name='John', email="john", hasRole="ADMIN")
print(persondc)
print("email:", type(persondc.email))

print("Pydantic")
personpd = mwb2pd.Person(name='John', email="john", hasRole="ADMIN")
print(personpd)
print("email:", type(personpd.email))
