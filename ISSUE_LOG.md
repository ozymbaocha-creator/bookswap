BookSwap Issue Log

Project: BookSwap

Milestone: BuildLab Stage 1, Week 2

## Purpose

This issue log records observed behaviour, completed fixes, and improvements that still need attention during development.

## Issue 1: Resource Filename Mismatch

Status: Resolved

Issue: The resource filename did not match the filename requested by the Fetch API.

Action taken: Corrected the filename to `resources.json` and confirmed that the resources load successfully.

## Issue 2: Resource Loading State

Status: Implemented

Issue: Users needed feedback while resource data was loading.

Action taken: Added a loading message while the application fetches resource data.

## Issue 3: Resource Loading Error

Status: Implemented

Issue: The application needed to handle failed resource requests.

Action taken: Added a friendly error message and Retry button. Tested the error state using a temporary missing-file path.

## Issue 4: Empty Search Results

Status: Implemented

Issue: Searches with no matching resources needed clear feedback.

Action taken: Added an empty state and a Clear filters option.

## Issue 5: Responsive Design and Accessibility Verification

Status: To verify

Issue: The application needs further testing across screen sizes and with keyboard navigation.

Next action: Test mobile and desktop layouts, keyboard access, visible focus indicators, and screen-reader labels before marking this task complete.

## Notes

The first four issues were checked during local development. The fifth remains a verification task.

Additional issues will be recorded as they are discovered.
