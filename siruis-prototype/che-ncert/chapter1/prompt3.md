Create a single HTML file named `game3_vapour_pressure.html`. This file represents the "Vapour Pressure Regulator" chemistry game.

**Game Concept:** Players explore Raoult's Law by managing mixtures of volatile liquids, predicting and observing vapour pressures, understanding ideal/non-ideal behavior, and identifying azeotropes.

**Requirements:**

1.  **HTML Structure:**
    *   A main game area.
    *   Selectors to choose two volatile liquids (e.g., Benzene/Toluene [Ideal], Ethanol/Water [Non-Ideal Positive Deviation], Chloroform/Acetone [Non-Ideal Negative Deviation]). Provide pure component vapour pressures (p°) at a fixed temperature.
    *   A slider or input to adjust the mole fraction (x1, x2 will adjust automatically).
    *   A display area showing:
        *   Current mole fractions (x1, x2).
        *   Calculated partial pressures (p1, p2 based on Raoult's Law for ideal, or pre-defined deviation model for non-ideal).
        *   Total Vapour Pressure (P_total).
    *   (Optional but recommended) A simple graph area (could use a library like Chart.js or just basic divs) plotting P_total, p1, and p2 vs. mole fraction.
    *   A challenge area (e.g., "Adjust mixture to achieve P_total = X torr" or "Predict the P_total for x1 = 0.5").
    *   Feedback area for predictions and explanations of deviations (linking A-B interactions to +/- deviation).
    *   A progress indicator/level display.

2.  **CSS Styling:**
    *   **Strictly** adhere to the Valorant theme using the provided CSS variables ( `--valorant-orange`, `--valorant-blue`, `--valorant-dark`, `--valorant-grey`, etc.).
    *   Use 'Poppins' font.
    *   Ensure the layout is responsive.
    *   Style controls, displays, graph area (if used), and feedback consistent with the main UI theme.

3.  **JavaScript Functionality:**
    *   Store data for different liquid pairs (names, p°, type of deviation).
    *   Calculate partial and total pressures based on the selected pair and mole fraction. Use Raoult's Law (p1 = x1*p1°, p2 = x2*p2°) for ideal. For non-ideal, use a simplified model or lookup table to show deviations (e.g., p_total_actual = p_total_ideal * deviation_factor(x1)).
    *   Update displays and graph (if implemented) in real-time as the mole fraction changes.
    *   Generate simple challenges or prediction tasks.
    *   Provide explanations for positive/negative deviations based on the chosen pair's known intermolecular forces (A-A, B-B vs. A-B). Hint at azeotropes where applicable (min/max boiling points corresponding to max/min vapour pressures on the graph).
    *   Implement a simple leveling system (Level 1: Ideal Solutions; Level 2: Positive Deviation; Level 3: Negative Deviation; Level 4: Challenges/Azeotropes). Track player level.
    *   **Progress Saving:**
        *   Define the `localStorage` key: `const progressKey = 'chemistryGameProgress';`
        *   When the player successfully completes a level or demonstrates understanding (e.g., correct predictions), update the progress for *this specific game* (`game3`).
        *   Retrieve the *entire* progress object from `localStorage`, update the `game3` value, and save the *entire modified object* back using `localStorage.setItem(progressKey, JSON.stringify(updatedProgressObject));`. Ensure robust loading/saving.
    *   Include a "Back to Hub" link/button navigating to `index.html`.

**Output:** A single, self-contained `game3_vapour_pressure.html` file including HTML, CSS (in `<style>`), and JS (in `<script>`).

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