Create a single HTML file named `game2_solubility_challenge.html`. This file represents the "Solubility Challenge" chemistry game.

**Game Concept:** Players apply solubility principles ('Like Dissolves Like', temperature effects, pressure effects for gases) to dissolve "Crystal Keys".

**Requirements:**

1.  **HTML Structure:**
    *   A main game area displaying the "Crystal Key" (solute) with its properties (e.g., Polar/Non-polar, Solid/Gas, Dissolution type: Endothermic/Exothermic/Neutral).
    *   Selectors (buttons or dropdowns) to choose a solvent (e.g., Water [Polar], Hexane [Non-polar]).
    *   Controls (sliders or buttons) to adjust Temperature and Pressure (Pressure control should primarily affect gas solubility).
    *   A "Try to Dissolve" button.
    *   A visual feedback area showing an animation or status message (e.g., "Dissolving...", "Insoluble!", "Dissolved!"). A simple progress bar showing dissolution progress could work.
    *   An area for hints based on incorrect attempts.
    *   A button to get the "Next Crystal Key".
    *   A progress indicator/level display.

2.  **CSS Styling:**
    *   **Strictly** adhere to the Valorant theme using the provided CSS variables ( `--valorant-orange`, `--valorant-blue`, `--valorant-dark`, `--valorant-grey`, etc.).
    *   Use 'Poppins' font.
    *   Ensure the layout is responsive.
    *   Style controls, displays, and feedback areas consistent with the main UI theme. Make the "Crystal Key" display visually distinct.

3.  **JavaScript Functionality:**
    *   Generate different "Crystal Keys" with varying properties for different levels.
    *   Implement the solubility logic:
        *   Polar solutes dissolve best in polar solvents, non-polar in non-polar.
        *   For solids: Increase T generally increases solubility for endothermic, decreases for exothermic.
        *   For gases: Increase P increases solubility (Henry's Law). Increase T decreases solubility.
    *   Determine the outcome based on player choices (solvent, T, P) and the crystal's properties.
    *   Provide visual/text feedback and hints.
    *   Implement a simple leveling system (e.g., Level 1: Like dissolves like only; Level 2: Add Temp for solids; Level 3: Add Temp/Pressure for gases). Track player level.
    *   **Progress Saving:**
        *   Define the `localStorage` key: `const progressKey = 'chemistryGameProgress';`
        *   When the player successfully completes a level or dissolves a set number of crystals, update the progress for *this specific game* (`game2`).
        *   Retrieve the *entire* progress object from `localStorage`, update the `game2` value (e.g., calculate percentage based on levels completed), and save the *entire modified object* back to `localStorage` using `localStorage.setItem(progressKey, JSON.stringify(updatedProgressObject));`. Ensure robust loading/saving.
    *   Include a "Back to Hub" link/button navigating to `index.html`.

**Output:** A single, self-contained `game2_solubility_challenge.html` file including HTML, CSS (in `<style>`), and JS (in `<script>`).