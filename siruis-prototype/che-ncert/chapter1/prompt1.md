Create a single HTML file named `game1_mixing_station.html`. This file represents the "Mixing Station" chemistry game.

**Game Concept:** Players create solutions of specific concentrations requested by lab orders. Focuses on understanding and calculating Mass %, Volume %, Molarity, Molality, and Mole Fraction.

**Requirements:**

1.  **HTML Structure:**
    *   A main game area.
    *   An area displaying the current "Lab Order" (e.g., "Prepare 100g of a 15% NaCl solution by mass").
    *   A virtual lab bench area with selectors for common solutes (e.g., NaCl, Glucose C6H12O6, Ethanol C2H5OH) and solvents (e.g., Water, Benzene C6H6). Include molar mass information for each.
    *   Input fields for mass (using a virtual scale simulation - could be just number input) and volume (using virtual glassware - could be number input).
    *   A "Mix Solution" button.
    *   A feedback area showing the calculated concentration of the mixed solution and whether it matches the order.
    *   A button to get the "Next Order".
    *   A progress indicator/level display for the game itself.

2.  **CSS Styling:**
    *   **Strictly** adhere to the Valorant theme using the provided CSS variables:
        *   `--valorant-orange: #FF4655;`
        *   `--valorant-blue: #7DF9FF;`
        *   `--valorant-dark: #111111;`
        *   `--valorant-grey: #333333;`
        *   `--valorant-light-grey: #BDBDBD;`
        *   `--valorant-white: #FFFFFF;`
    *   Use 'Poppins' font.
    *   Ensure the layout is responsive and usable on different screen sizes.
    *   Style buttons, input fields, and display areas consistent with the main UI theme (dark backgrounds, orange/blue accents, angular elements where appropriate).

3.  **JavaScript Functionality:**
    *   Generate random lab orders covering different concentration units as the player progresses through levels (start with mass %, then volume %, molarity, molality, mole fraction).
    *   Calculate the resulting concentration based on user inputs (mass/volume/moles of solute and solvent). Handle unit conversions (g to kg, mL to L).
    *   Provide immediate feedback on whether the mixed solution matches the target concentration within a small tolerance (e.g., +/- 1%).
    *   Implement a simple leveling system (e.g., 5 levels, one for each concentration type). Track the player's current level.
    *   **Progress Saving:**
        *   Define the `localStorage` key: `const progressKey = 'chemistryGameProgress';`
        *   When the player successfully completes a level or a set number of orders, update the progress for *this specific game* (`game1`).
        *   Retrieve the *entire* progress object from `localStorage`, update the `game1` value (e.g., calculate percentage based on levels completed: level 1 = 20%, level 2 = 40%, etc.), and save the *entire modified object* back to `localStorage` using `localStorage.setItem(progressKey, JSON.stringify(updatedProgressObject));`. Ensure robust loading/saving, handling potential errors or missing initial data like in the main UI script.
    *   Include a "Back to Hub" link/button that navigates to `index.html`.

**Output:** A single, self-contained `game1_mixing_station.html` file including HTML, CSS (in `<style>`), and JS (in `<script>`).