---
description: Spec Refinement Rules for Agent OS
globs:
alwaysApply: false
version: 1.0
encoding: UTF-8
---

# Spec Shaping Rules

## Overview

Refine and improve existing feature specifications to ensure alignment with product mission, tech stack, roadmap, and Agent OS best practices.

<pre_flight_check>
  EXECUTE: @.agent-os/instructions/meta/pre-flight.md
</pre_flight_check>

<process_flow>

<step number="1" subagent="context-fetcher" name="spec_identification">

### Step 1: Spec Identification

Use the context-fetcher subagent to identify which spec to shape by either finding the most recent spec or accepting a specific spec path from the user.

<option_a_flow>
  <trigger>user provides spec path or folder name</trigger>
  <actions>
    1. VALIDATE spec exists at path
    2. READ spec.md from identified folder
    3. PROCEED to context gathering
  </actions>
</option_a_flow>

<option_b_flow>
  <trigger>user asks to shape "latest" or "current" spec</trigger>
  <actions>
    1. LIST .agent-os/specs/ directory
    2. FIND most recent spec folder (by date prefix)
    3. READ spec.md from that folder
    4. PROCEED to context gathering
  </actions>
</option_b_flow>

<option_c_flow>
  <trigger>no spec specified</trigger>
  <actions>
    1. LIST .agent-os/specs/ directory
    2. IF multiple specs exist:
       - LIST all available specs
       - ASK user which spec to shape
    3. IF no specs exist:
       - INFORM user no specs found
       - SUGGEST creating a spec first using create-spec.md
  </actions>
</option_c_flow>

</step>

<step number="2" subagent="context-fetcher" name="context_gathering">

### Step 2: Context Gathering

Use the context-fetcher subagent to gather all necessary context for spec refinement.

<required_files>
  - @.agent-os/product/mission-lite.md
  - @.agent-os/product/mission.md
  - @.agent-os/product/tech-stack.md
  - @.agent-os/product/roadmap.md
  - @.agent-os/standards/best-practices.md
  - [SPEC_PATH]/spec.md (already read in step 1)
</required_files>

<conditional_logic>
  IF any required file not already in context:
    READ missing files
  ELSE:
    SKIP reading (already in context)
</conditional_logic>

<context_analysis>
  <mission_alignment>ensure spec aligns with product mission</mission_alignment>
  <tech_stack_compatibility>verify spec uses appropriate tech stack</tech_stack_compatibility>
  <roadmap_alignment>check spec fits roadmap priorities</roadmap_alignment>
  <best_practices>apply Agent OS best practices</best_practices>
</context_analysis>

</step>

<step number="3" name="spec_analysis">

### Step 3: Spec Analysis

Analyze the current spec against alignment criteria and identify areas for improvement.

<analysis_areas>
  <mission_alignment>
    - Does spec solve problems for target users?
    - Does spec align with product value proposition?
    - Are user stories consistent with product mission?
  </mission_alignment>
  <tech_stack_compatibility>
    - Are specified technologies in tech stack?
    - Are there better tech stack alternatives?
    - Do technical approaches match stack capabilities?
  </tech_stack_compatibility>
  <roadmap_alignment>
    - Does spec fit current roadmap phase?
    - Are dependencies properly identified?
    - Is spec prioritized appropriately?
  </roadmap_alignment>
  <spec_quality>
    - Are all required sections present?
    - Is scope clearly defined?
    - Are deliverables testable?
    - Is out-of-scope clearly stated?
  </spec_quality>
  <best_practices>
    - Follows Agent OS spec templates?
    - Uses appropriate naming conventions?
    - Includes necessary technical details?
  </best_practices>
</analysis_areas>

<instructions>
  ACTION: Analyze spec against all criteria
  IDENTIFY: Specific improvement areas
  DOCUMENT: Findings for refinement step
</instructions>

</step>

<step number="4" name="refinement_planning">

### Step 4: Refinement Planning

Create a plan for refining the spec based on analysis findings.

<refinement_categories>
  <content_improvements>
    - Enhance user stories for clarity
    - Improve scope definitions
    - Refine deliverables to be more testable
    - Add missing out-of-scope items
  </content_improvements>
  <alignment_fixes>
    - Adjust features to match mission
    - Update technical approaches to match tech stack
    - Align with roadmap priorities
  </alignment_fixes>
  <structure_improvements>
    - Ensure all required sections present
    - Improve section organization
    - Add missing documentation links
  </structure_improvements>
</refinement_categories>

<instructions>
  ACTION: Create refinement plan
  PRIORITIZE: Most critical improvements first
  PREPARE: Specific edits for each improvement
</instructions>

</step>

<step number="5" subagent="file-creator" name="spec_refinement">

### Step 5: Spec Refinement

Use the file-creator subagent to apply refinements to the spec.md file.

<refinement_process>
  1. UPDATE Overview section for mission alignment
  2. REFINE User Stories for clarity and user focus
  3. IMPROVE Spec Scope with tech stack considerations
  4. ENHANCE Out of Scope with explicit exclusions
  5. CLARIFY Expected Deliverable with testable outcomes
  6. ADD any missing sections per Agent OS template
  7. UPDATE metadata (dates, status) if needed
</refinement_process>

<quality_checks>
  - All sections present and complete
  - Mission alignment verified
  - Tech stack compatibility confirmed
  - Roadmap alignment checked
  - Best practices applied
</quality_checks>

<instructions>
  ACTION: Apply all planned refinements
  PRESERVE: Original intent and core requirements
  ENHANCE: Clarity, alignment, and completeness
</instructions>

</step>

<step number="6" subagent="file-creator" name="spec_lite_update">

### Step 6: Update spec-lite.md (if exists)

Use the file-creator subagent to update spec-lite.md to reflect refined spec content.

<update_process>
  1. READ existing spec-lite.md (if present)
  2. UPDATE elevator pitch to match refined overview
  3. REFINE key points to reflect improvements
  4. ENSURE consistency with main spec.md
</update_process>

<conditional_logic>
  IF spec-lite.md exists:
    UPDATE it
  ELSE:
    CREATE spec-lite.md using template from create-spec.md
</conditional_logic>

</step>

<step number="7" name="refinement_summary">

### Step 7: Refinement Summary

Provide a summary of refinements made and verify alignment.

<summary_template>
  ## ✅ Spec Refinement Complete

  I've refined the spec: **[SPEC_NAME]**

  ### Improvements Made

  **Mission Alignment:**
  - [IMPROVEMENT_1]
  - [IMPROVEMENT_2]

  **Tech Stack Compatibility:**
  - [IMPROVEMENT_1]
  - [IMPROVEMENT_2]

  **Spec Quality:**
  - [IMPROVEMENT_1]
  - [IMPROVEMENT_2]

  **Best Practices:**
  - [IMPROVEMENT_1]
  - [IMPROVEMENT_2]

  ### Verification

  ✓ Spec aligns with product mission
  ✓ Technical approach matches tech stack
  ✓ Scope clearly defined
  ✓ Deliverables are testable
  ✓ Best practices applied

  ### Next Steps

  The spec is now refined and ready for:
  1. Review and approval
  2. Task creation: @.agent-os/instructions/core/create-tasks.md
  3. Implementation planning
</summary_template>

</step>

</process_flow>

<post_flight_check>
  EXECUTE: @.agent-os/instructions/meta/post-flight.md
</post_flight_check>
