# Examples Layout

- `linkml_official` Official example from https://linkml.io/linkml/intro/tutorial05.html as of date
- `mwb2_ea` Modified not-so-recent MWB2 Enterprise Architect model export by model2owl
- `personinfo` Modified official and/or MWB2 example

# How to Test

Run any of the `test_*` files with a Python or TypeScript interpreter, depending on the file extension (`*.py` vs. `*.ts`).

# How to Run

Dataclass:

```sh
gen-python <linkml-yaml> > <output>.py
```

Pydantic:

```sh
gen-pydantic <linkml-yaml> > <output>.py
```

TypeScript:

```sh
```sh
gen-typescript <linkml-yaml> > <output>.ts
```

# Known Issues

## Python

1. Dataclass translates a `uri` to a `Union[str, URI]`, but **Pydantic does not**.
    - While dataclass translates `uri` to a URI-compatible type, they are _not_ validated (plain strings will pass). This is likely a general issue across generators, see https://github.com/linkml/linkml/issues/2215.
2. Dataclass translates `date` into `Union[str, XSDDate]`, which is effectively `str` and hence no validation (Pydantic translates and validates `date` correctly)

## TypeScript

1. TypeScript has limited type support as compared to Python, both because of its JavaScript foundation, and possible bugs.
    - Enums are _defined but not referenced_ by the slots/attributes which have them as range.
    - Dates are not translated correctly, end up as `date` instead of `Date`.
    - Unsupported types `uri` and `decimal` are translated into `string` but nevertheless this throws a warning.

        ```sh
        $ gen-typescript personinfo/personinfo_v0.01.yaml > personinfo_typescript.ts 
        WARNING:linkml.generators.typescriptgen:Unknown type.base: uri
        WARNING:linkml.generators.typescriptgen:Unknown type.base: decimal
        ```
