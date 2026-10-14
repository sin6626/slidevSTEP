# Repair first-collapse focus and nested Details commands

Status: executed locally; changes remain uncommitted
Playbook: bug-fix

## Brief

### What will change?
The first collapse puts the caret at its visible title. Backspace removes the empty paragraph created after a folded block. Unwrapping an inner block keeps its outer container and descendants.

### What could go wrong?
Selection ownership also affects toolbar and paste actions. This change passed focused browser checks for those actions, but it is not a full browser-engine or repository CI certification.

## Teach
Details stores body content even while it is folded. Editing commands must choose a visible caret position and the exact container they change.

A stale mouse-selection marker blocked the first caret export. The previous Backspace safeguard retained empty paragraphs, and the unwrap query searched ancestors again after the intended node had already been identified.

The repair clears the old marker when a control takes selection ownership, removes only truly empty paragraphs, and unwraps the identified container directly.

## Scope
Current worktree /Users/sin/.codex/worktrees/8c90/plate at a924f121440c5d87baaa4236d5747d45d59661fb, plus preserved prior work. User annotations require first-collapse caret placement, deleting the Enter-created empty paragraph, and unwrapping only the inner Details. Forward Delete is verified by automation because the user's key is broken. No commits, pushes or AGENTS edits.

## Failed-fix diagnosis
The previous completion claim did not cover these operations. Its keyboard setup used End and settled model selection; it never asserted the first body-click-to-collapse caret. It asserted the preserved document after Backspace rather than requiring the newly created empty paragraph to disappear. Its unwrap proof had no nested Details title.
The new intake preserved before.patch and per-file before copies. Native quick-click trace in details-demo-collapse-fast-frames.json captured native-user followed by app-owned, then the model caret being overwritten with a hidden-body point. Imported-selection controls retained the suppressed export across twenty animation frames. This is a product ownership race, not a server readiness or input-delivery failure.
Runtime-owner and mutation-owner were observed through the mounted editor handle, native mouse and key events, model/native/view selection, commit/kernel traces and intercepted DOM selection writes. No product instrumentation or synthetic focus supplement was used. Natural clicks and after-import controls are distinct evidence, not interchangeable passes.

## Ownership decisions
Keep separate current selection ownership and event origin; both have existing consumers. Clear only the obsolete native-user origin at the canonical app-owned handoff rather than weakening all native export protection or adding a Details focus timer. Both production app-owned callers are interactive mouse handlers.
Keep unwrap at the plugin transform owner. Explicit paths and node selections identify exact containers; collapsed text selection picks the nearest container. Retain range behavior, then unwrap exact paths without another type query. Reverse document order preserves multiple targets.
Keep empty-paragraph removal in the closed-Details backward-delete command. Require paragraph type and nodes.isEmpty so atoms and other content are retained. Nonempty paragraphs remain intact.

## Review
Same-family read-only owner and diff reviews found no critical/warning blocker. No-comments pass found no introduced comment noise. No other model-family CLI was available. Changeset notes updated for both package owners; no registry source changed.

## Proof
- structure-red.log: three newly reported structure tests failed before changes; structure-final.log: all 32 Details tests pass, including three-level and explicit node-selection unwrap.
- handoff-red.log: control handoff export test fails before correction; selection-final.log: all 91 runtime/controller/reconciler contracts pass.
- five-repeats.log: all 50 Chromium cases pass, five repetitions without retries. Collapse cases perform three open/click/fold/type/undo cycles each, with no End key or focus repair before folding.
- nested-five.log: all 10 additional natural inner-collapse cases pass, five repetitions per route, each with three disclosure cycles.
- regression.log: 20 existing caret, marquee, text-scroll, native clipboard and floating-link-toolbar cases pass.
- visual.log: four outer/inner first-collapse checks pass on both routes. Real native caret rectangles have positive height and nontransparent caret color, model/native points agree and the editor remains focused. Screenshots use caret:initial and were opened; the Playground inner caret is visibly at the title end. Unwrap and empty-paragraph screenshots were also inspected.
- Source partition typechecks for Details and Plite React pass; scoped lint and git diff --check pass.

## Demo
1. Refresh http://localhost:3297/blocks/details-demo. Open outer or inner Details, click body text, then fold it once. The caret returns to that title end; typing remains visible there.
2. With the outer Details open and the inner one closed, press Enter at the inner title end, then Backspace. The new empty paragraph disappears and the caret returns to the inner title.
3. Put the caret at the inner title start and press Backspace. Only that Details is unwrapped; the outer Details remains.
4. Repeat at http://localhost:3297/blocks/playground. A forward Delete at a closed title end moves to the following visible block.

## Close
All three annotated defects were reproduced and repaired at their owners, with the previous proof gaps recorded above. Forward Delete was checked through browser automation. Source service remains on 3297. Changes remain uncommitted; AGENTS.md, pnpm-lock.yaml and unrelated existing changes are unchanged. Claims are scoped to current source and Chromium on these two routes. Full CI, other browser engines and every possible embedded-content composition remain outside this proof.
