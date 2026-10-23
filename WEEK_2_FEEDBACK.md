# BookSwap Week 2 Feedback Record

Project: BookSwap

Milestone: BuildLab Stage 1, Week 2

## Feedback Source

Self-testing and review of the current BookSwap implementation.

No formal mentor or reviewer feedback has been recorded yet.

## Observations and Responses

### 1. Resource Loading

Observation: Resource data needed to load separately from the React component.

Response: Added `public/resources.json` and used the Fetch API to load the resources asynchronously.

### 2. Resource Loading Errors

Observation: A failed resource request should provide clear feedback to the user.

Response: Added an error message and Retry button, then tested the error state with a temporary missing-file path.

### 3. Search and Filtering

Observation: Users need clear feedback when their search or category selection returns no matching resources.

Response: Confirmed that search and category filtering work and that an empty state with a Clear filters option appears when there are no matches.

## Further Improvements

* Verify responsive behaviour on mobile and desktop screens.
* Test keyboard navigation and accessibility.
* Gather and record feedback from a mentor, reviewer, or test user when available.
* Consider future improvements to data persistence and exchange history.

## Status

The observations above are based on development and self-testing. They are not presented as formal external feedback.
