# Frontend API Integration

## Current status

No frontend API client, fetch/Axios calls, API service module, request hooks, or endpoint definitions were found in the inspected `src/` tree. Registration, recovery, OTP, and reset forms provide browser-side validation and client-side demo navigation only. They do not create accounts, send email, verify OTPs, update passwords, or make requests. The login submit remains disabled.

Consequently, there are no verified endpoints, payloads, response shapes, authentication headers/cookies, or API error conventions to document. The guest checkout currently saves demo orders and delivery details to browser `localStorage`; it does not submit an order, process payment, or request delivery. Do not invent API details. Backend and database documentation are intentionally out of scope.

## Future integration notes

When frontend integration is added, record only behavior evidenced by frontend code or an explicitly provided frontend contract. Document the client location, request and response typing, credential handling without exposing secrets, loading/error handling, and any actual endpoint paths. Keep secrets in environment configuration and never commit or print their values.
