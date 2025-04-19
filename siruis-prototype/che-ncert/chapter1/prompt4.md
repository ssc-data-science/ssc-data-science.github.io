Create a single HTML file named `game4_colligative_investigator.html`. This file represents the "Colligative Investigator" chemistry game.

**Game Concept:** Players act as detectives, using measurements of colligative properties (FP depression, BP elevation, VP lowering, Osmotic Pressure) to calculate the molar mass of unknown solutes and identify them, including dealing with electrolytes using the van't Hoff factor.

**Requirements:**

1.  **HTML Structure:**
    *   A main game area styled like a detective's case file or lab interface.
    *   A "Case Brief" area describing the scenario (e.g., "Unknown substance dissolved in 100g of water lowered the freezing point by X °C. Identify the substance.").
    *   An area to select the colligative property to "measure" or use the data provided in the brief (FP, BP, VP, Osmotic Pressure Π).
    *   An input area for relevant data: mass of solute, mass/volume of solvent, measured change (ΔTf, ΔTb, ΔP, Π), solvent constants (Kf, Kb, P°, R). Select common solvents (Water, Benzene) with their known constants.
    *   A "Calculate Molar Mass" button.
    *   A display showing the calculated molar mass.
    *   A "Suspect List" area showing potential compounds (name, formula, actual molar mass).
    *   A section to introduce and calculate/input the van't Hoff factor 'i' for electrolyte cases. The calculation button might need to incorporate 'i'.
    *   Feedback area confirming identification or providing hints (e.g., "Calculated molar mass is half the expected for non-electrolytes. Consider dissociation!").
    *   A button for the "Next Case".
    *   A progress indicator/level display.

2.  **CSS Styling:**
    *   **Strictly** adhere to the Valorant theme using the provided CSS variables ( `--valorant-orange`, `--valorant-blue`, `--valorant-dark`, `--valorant-grey`, etc.).
    *   Use 'Poppins' font.
    *   Ensure the layout is responsive.
    *   Style inputs, displays, buttons, and the "Case Brief/Suspect List" consistent with the main UI theme, potentially adding a "classified" or "investigation" feel.

3.  **JavaScript Functionality:**
    *   Generate different "cases" with unknown solutes (both non-electrolytes and electrolytes like NaCl, MgCl2, Acetic Acid for association) and varying colligative property data.
    *   Store data for solvents (Kf, Kb, P°, common molar mass) and potential solutes (formula, molar mass, expected 'i' value for electrolytes or association behavior).
    *   Implement the calculation formulas for Molar Mass based on each colligative property, including the van't Hoff factor 'i':
        *   ΔTf = i * Kf * m => M2 = (i * Kf * w2 * 1000) / (ΔTf * w1)
        *   ΔTb = i * Kb * m => M2 = (i * Kb * w2 * 1000) / (ΔTb * w1)
        *   Π = i * M * R * T => M2 = (i * w2 * R * T) / (Π * V)
        *   (P1° - P1) / P1° = i * x2 ≈ (i * n2) / n1 => M2 = (i * w2 * M1 * P1°) / (w1 * (P1° - P1)) [Approx for dilute]
    *   Initially, assume i=1. If the calculated Molar Mass is significantly off for a known electrolyte, prompt the user to consider 'i' or provide the expected 'i' value.
    *   Compare calculated Molar Mass to the suspect list for identification.
    *   Implement a simple leveling system (Level 1: Non-electrolytes; Level 2: Simple electrolytes i=2, 3; Level 3: Association or more complex cases). Track player level.
    *   **Progress Saving:**
        *   Define the `localStorage` key: `const progressKey = 'chemistryGameProgress';`
        *   When the player successfully solves a case or completes a level, update the progress for *this specific game* (`game4`).
        *   Retrieve the *entire* progress object from `localStorage`, update the `game4` value, and save the *entire modified object* back using `localStorage.setItem(progressKey, JSON.stringify(updatedProgressObject));`. Ensure robust loading/saving.
    *   Include a "Back to Hub" link/button navigating to `index.html`.

**Output:** A single, self-contained `game4_colligative_investigator.html` file including HTML, CSS (in `<style>`), and JS (in `<script>`).


consider 

             function saveProgressExample(gameId, newPercentage) {
                 let progressToSave;
                 try {
                     const stored = localStorage.getItem(progressKey);
                     progressToSave = stored ? JSON.parse(stored) : { ...defaultProgress }; // Use spread for a fresh copy
                     if (typeof progressToSave !== 'object' || progressToSave === null) {
                        progressToSave = { ...defaultProgress };
                     }
                 } catch (e) {
                     console.error("Error reading progress before saving:", e);
                     progressToSave = { ...defaultProgress };
                 }

                 progressToSave[gameId] = Math.max(0, Math.min(100, newPercentage)); // Update specific game
                 localStorage.setItem(progressKey, JSON.stringify(progressToSave));
                 console.log(`Progress saved for ${gameId}: ${progressToSave[gameId]}%`);
                 // In a real scenario, the individual game page would do this saving,
                 // and this main page would just load it next time.
             }


and the screenshot
also give the notes needed to read to finish the game if player makes mistakes


make sure there won't be any errors, you can take as much as lines of code and upto 65500 charectors