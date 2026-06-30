# Security Policy

## Reporting

Please do not open public issues containing credentials, private data, or exploitable production details.

For security reports, use a private channel with the repository owner.

## Secret Policy

This repository must not contain:

- API keys, refresh tokens, access tokens, cookies, or session values
- Database URLs, DSNs, passwords, private IP routing secrets, or SSH keys
- Production runtime env files
- Private user data or behavior logs
- Vendor-specific credential samples

Use `.env.example` for placeholder-only local configuration.

