# Inquiries Module Instruction

Implement a write-only public inquiry submission flow and an inbox-style admin.

Rules:

- Use `BaseModel`
- Public API is POST only
- Keep validation in the serializer
- Keep business logic in `services.py`
- Keep queries in `selectors.py`
- Send emails through `common/mail.py`
