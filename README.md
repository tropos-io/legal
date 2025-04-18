
> ⚠️ **Confidential**: This repository is **not publicly listed**, but its content is accessible via the above URL. Treat internal commentary and GitHub discussions as privileged and confidential.

---

## Contents

- `index.md` or `privacy.md` — the rendered privacy policy in Markdown format (source of truth)
- `.github/workflows/deploy.yml` — GitHub Actions config for deployment to GitHub Pages
- `README.md` — internal usage guidelines (this file)
- `_site/` — (if applicable) compiled artifacts for static delivery
- `_includes/`, `_layouts/` — (if using Jekyll or similar)

---

## Repository Purpose

This repository enables:

- **Version control** over our privacy policy (including tracked changes and approvals)
- **Cross-functional collaboration** between Legal, Security, Marketing, and Engineering teams
- **Automated deployment** of the public policy via GitHub Pages
- **Audit trail** for regulatory inquiries and internal compliance audits (e.g., GDPR Art. 30)

---

## Governance and Ownership

| Role           | Owner                    | Responsibility                                                 |
|----------------|---------------------------|-----------------------------------------------------------------|
| **Policy Owner**    | Legal & Compliance Team     | Owns legal correctness, scope, and applicability                |
| **Data Protection Officer (DPO)** | [Insert Name or Group]         | Ensures GDPR and privacy frameworks are respected               |
| **Maintainer** | Engineering Lead or CTO   | Maintains deployment scripts and page rendering configuration   |
| **Approver**   | Legal + Security          | Required to approve any material changes before publishing      |

---

## Contribution Guidelines

**Changes to the policy** must follow the structured review and approval process below:

1. Fork a branch from `main`.
2. Make edits to the markdown source (`privacy.md` or equivalent).
3. Submit a pull request and tag:
   - Legal Team (`@legal`)
   - DPO (`@dpo`)
   - Engineering Maintainer (`@eng-lead`)
4. Await approvals from both Legal and DPO prior to merging.
5. Merging into `main` will **automatically trigger deployment** to the GitHub Pages site.

> 🔍 **Material edits** (i.e., changes to data collection, lawful basis, retention, user rights, third-country transfers, or third-party vendors) **must be reviewed by counsel** prior to publication.

---

## Versioning and Change Log

- Use semantic versioning (`v1.0.0`, `v1.0.1`, etc.) in Git tags.
- Each significant revision must be accompanied by:
  - A `CHANGELOG.md` update
  - Timestamped approval comment in the PR
  - Optional public-facing "Last Updated" footer in the Markdown file

---

## Legal and Compliance Considerations

This policy is written to comply with the following frameworks and laws:

- General Data Protection Regulation (GDPR)
- California Consumer Privacy Act (CCPA/CPRA)
- ePrivacy Directive (Cookie Law)
- Virginia CDPA, Colorado CPA, and other U.S. state laws
- ISO/IEC 27701 and SOC 2 Privacy criteria (where applicable)

---

## Deployment

Deployment is handled via GitHub Actions. Changes to `main` will:

- Build the static site using Jekyll (or plain Markdown if configured)
- Deploy to the `gh-pages` branch
- Publish to the configured GitHub Pages URL

> See `.github/workflows/deploy.yml` for CI/CD specifics.

---

## Additional Notes

- This repository does not collect personal data.
- It must not be used for user tracking, analytics, or webhooks.
- Avoid hardcoding any production secrets or configuration files.

---

## Contact

- **Legal**: `privacy@tropos.io`
- **Security**: `security@tropos.io`
- **Engineering**: `devops@tropos.io`

If you identify issues with the policy's contents, exposure, or deployment mechanism, report them immediately to the Legal and Engineering teams.

---
