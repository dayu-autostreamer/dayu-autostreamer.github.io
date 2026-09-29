# Website Security

This policy covers the Dayu documentation website, its dependencies, and its build and deployment workflows.
For vulnerabilities in the Dayu runtime or system components, use the
[system security policy](https://github.com/dayu-autostreamer/dayu/blob/main/SECURITY.md).

## Reporting a Vulnerability

Report suspected vulnerabilities privately, with `[SECURITY]` in the email subject:

- Primary contact: [Wenhui Zhou](mailto:whzhou@smail.nju.edu.cn).
- Alternative contact: [Haoyang Su](mailto:shyshy@smail.nju.edu.cn).
- You can also submit a [private website advisory](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/security/advisories/new).

Include a description, reproduction steps, potential impact, and the affected page, dependency, workflow, or commit.
Keep vulnerability details out of public issues and PRs. For ordinary documentation problems, use [SUPPORT.md](SUPPORT.md).

We will acknowledge your report within **3 business days** and provide a timeline for resolution.
## Response Responsibility

A non-conflicted [website Maintainer](MAINTAINERS.md) coordinates triage, technical review, validation, deployment,
and communication with the reporter. Access to the report and unreleased fix is limited to the people handling it.

If a report involves one contact, send it only to the other. If both are involved, contact another non-conflicted
website Maintainer to arrange independent handling. Do not use an advisory whose viewers include a conflicted person.

## Fixes and Disclosure

1. Verify the report and identify the affected website components.
2. Develop and review a fix in an access-restricted repository or advisory's temporary private fork.
   Run relevant checks privately and record independent review before integration; avoid exposing unreleased fixes
   through public build logs or artifacts.
3. Deploy and verify the correction to the live website. The target is within **7 days** of confirmation;
   communicate any change to that timeline to the reporter.
4. Coordinate public disclosure after the correction is available, using
   [website security advisories](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/security/advisories)
   when appropriate. Seek a CVE identifier when applicable.

Website fixes apply to the deployed site and its maintained source and build dependencies. The version selector
labels technical documentation snapshots; it does not define separate website software support branches.
System release support is described in the system security policy linked above.

## Acknowledgments

We credit researchers who follow coordinated disclosure. Tell us whether you prefer your name, handle, or anonymity.
