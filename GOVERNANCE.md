# Governance

http-files.org documents the `.http` file format and works toward a versioned, implementation-backed specification for it. This document describes who decides what, and how.

## Roles

**Steward.** The founding maintainer of this repository. Administers the `http-files` GitHub org, merges routine changes, and runs the processes below. The steward's long-term job is to make itself less necessary.

**Maintainer-owners.** Maintainers of implementations tracked in the [client registry](site/src/data/clients.yaml) who take an ownership role in this project. Maintainer-owners have:

- final authority over their own client's registry data, feature-support values, and syntax examples;
- an equal vote on specification decisions (see below);
- merge rights on this repository.

To become a maintainer-owner: maintain a tracked implementation, then open an issue saying you want in. During the bootstrap phase the steward adds you directly. There is no other qualification — if you maintain a real client, you belong at the table.

**Contributors.** Anyone, via pull request. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Decisions

**Client data.** Each client's maintainer has final say over that client's entries. Corrections from third parties need a citation to documentation or reproducible behavior, and land by lazy consensus if the client's maintainer doesn't object.

**Site and editorial changes.** Lazy consensus. Anyone can open a PR; a maintainer-owner or the steward merges.

**Specification decisions** — what enters the core profile, what counts as a standardized extension, when a version is stamped:

- *Bootstrap phase* (fewer than five maintainer-owners): proposals are GitHub issues, open for at least 14 days, decided by consensus of the maintainer-owners plus the steward.
- *Standard phase* (five or more maintainer-owners): proposals need a two-thirds super-majority of votes cast within 14 days, with at least half of active maintainer-owners voting.

**The evidence rule.** Specification decisions follow implementations, not the other way around:

- A feature qualifies for the **core profile** when it is implemented compatibly — same syntax, same observable behavior — across at least two-thirds of the tracked full clients (parser libraries don't count toward the threshold).
- An **extension** becomes standardized the same way: either a super-majority of clients already share compatible syntax, or maintainer-owners of a super-majority agree to converge on one.

The feature-support data in this repository is the record of that evidence.

## Versions and badges

When a core profile or extension set is adopted, it is stamped with a version (core v1, then onward). Compliance badges are tied to versions and governed by a separate badge-usage policy: a client may display a version's badge only while the registry records it as compliant with that version. The content licenses in [LICENSE.md](LICENSE.md) deliberately do not cover the badges.

## Neutrality

This project treats every implementation equally. No rankings, no marketing, no default recommendations that favor one client. Feature tables state facts with citations, not judgments. This applies to the steward's own projects exactly as it applies to everyone else's.

## Changing this document

Same process as specification decisions.
