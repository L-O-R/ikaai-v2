# Clients Module Instruction

Implement reusable client management for IKAAI INDIA CMS using the shared CMS architecture.

Rules:

- Use `BaseModel`
- Keep business logic in `services.py`
- Keep selectors in `selectors.py`
- Use `BaseAdmin`
- Restrict deletion when related projects exist via `Project.client = PROTECT`
- No public API in version 1
