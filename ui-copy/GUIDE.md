# Clarify: the copy method

Distilled from Impeccable's clarify guide (Apache-2.0).

Goal: the user understands what happened, what matters, and what to do next. Keep factual meaning, product terms, and voice intact.

## Audit first
Read the whole interaction path and flag:
- ambiguous nouns, verbs, and actions; internal jargon or assumed knowledge;
- vague labels, outcomes, and system states;
- missing consequences, recovery, or timing;
- inconsistent terms or capitalization;
- redundant headings, intros, helper text, and confirmations;
- text that breaks at realistic widths;
- tone that ignores stress, risk, success, or urgency.

Infer audience and task from the product and surrounding UI. Ask before changing a factual claim, legal meaning, or a term that may be domain-specific.

## Message hierarchy
Per state: the fact needed now, the next action, context that changes the decision, then the tone the moment calls for. If the heading already explains the state, the intro adds something new or goes.

## Rules by function
**Actions and navigation.** Specific verb plus object when the outcome isn't obvious. Describe the result, not the gesture that triggers it.

**Destructive actions.** Prefer undo over a confirmation when recovery is safe. When a confirmation is needed, name the action in both the message and the button; never `Yes`, `No`, `OK`, or `Submit`.

**Forms.** Persistent labels; placeholders are examples, never labels. State format and eligibility rules before submission. Explain why you ask for something only when it isn't obvious. Treat required and optional the same way everywhere. Validation says what needs attention and how to fix it, without blaming the user; keep instructions next to the field.

**Errors and permissions.** No internal codes as the main message. Don't promise a cause or a fix the system can't know. Privacy, payment, deletion, access loss, and blocked work are serious moments.

**Loading.** Set an honest expectation when the wait is meaningful. Show determinate progress when you have it; never invent progress.

**Empty.** Cover permissions as its own kind of empty too. Explain the state, then offer the next useful action.

**Success.** Confirm the completed outcome. Mention the next consequence only if it changes what the user should do. Routine success stays brief.

**Helper text.** Answer the implicit question instead of restating the control. Hide uncommon detail behind progressive disclosure. Link text makes sense out of context.

## Terminology
Voice stays constant; tone adapts to the moment. Plain language, but don't flatten terms the audience genuinely knows. Same noun and verb for the same concept across the product; never vary words for literary effect.

## Verify
Read the flow in context and check:
- understandable without hidden product knowledge;
- actionable at errors, empty states, and decision points;
- factually accurate, terms consistent;
- scannable at target widths;
- holds up with long names, plurals, and dynamic values;
- tone fits the consequence and the user's emotional state.

Done when the copy is as short as it can be without losing meaning or recovery.
