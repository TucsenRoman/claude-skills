---
name: notion
description: Open a Notion page by its path and work on it — "/notion Product", "/notion Product/Challenges", "/notion viseez/Product/Data model: add a section on X". Use when the user types /notion, or names a Notion page by a path like "Product > Pathfinder" and wants to read it, check it, or change it.
---

# Notion

The user types `/notion <path>` to jump to a Notion page, like a file path.

## Reading the argument

- **Path:** segments split by `/`, top page first, the target last. `Product/Challenges` means the page "Challenges" under "Product". One segment is fine.
- **Task (optional):** anything after the first `:` is what to do on that page (`Product/Pathfinder: add the open questions from today`). No task means read it.
- Match names loosely: ignore case, extra spaces, emoji icons, and small typos. A Notion URL or page ID in place of the path also works.
- No argument at all: show the user's favorite or recent pages (`notion-list-favorite-pages`, else `notion-list-recent-pages`) as a short list and ask which one.

## Finding the page

Notion tools are deferred: load `notion-search` and `notion-fetch` in one ToolSearch call first (plus `notion-update-page` / `notion-create-pages` when there's a task that writes).

1. **Search the last segment** with `notion-search` (`query` = last segment, `max_highlight_length: 0`). Each result has a `title` and a `path` (its parent pages, joined by ` / `).
2. **Keep results whose title matches the last segment and whose `path` contains the earlier segments in order.** The path may hold extra pages in between, and a leading segment may be the teamspace name rather than a page; both still count.
3. **Not found that way:** walk down instead. Search the first segment, `notion-fetch` it, find the child whose title matches the next segment (child pages appear as `<page>` tags; databases as `<database>`, whose rows you find with `notion-query-data-sources`), fetch that, and repeat.
4. **Several matches:** ask with AskUserQuestion, each option labeled with its full path. **None:** say which segment wasn't found, list the closest pages under the last one that was, and offer to create the missing page there (only on a yes).

## Then

- **No task:** `notion-fetch` the page and reply in a few short lines: its path, what it says in plain words (status first if the page has a status callout), its subpages, and the link. Then wait.
- **A task:** fetch the page, do the task, and reply in one or two lines with what changed and the link. Reading needs no OK; follow the user's usual rules for anything that writes (ask first if the change goes beyond what they asked).
- Keep the resolved page in mind for the rest of the session: "this page", "add it there" or a follow-up `/notion :<task>` (empty path) means the same page.
- If the page is truncated (`truncated` or `unknown_block_ids` in the result), fetch the missing blocks before summing it up.

## Don'ts

- Don't paste the whole page back. The user can open the link.
- Don't move, rename, or delete pages unless the task says so.
