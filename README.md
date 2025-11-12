# 📖 The Living Campaign Diary

A dynamic, in-character journal designed to deliver campaign narrative directly to the players from the perspective of a living entity within the game world.

## 🎭 The Concept: Not a Tool, but a Character

This project is **not a DM's private note-taking app**. It is a narrative channel. The DM authors entries, but the voice is that of a defined in-game character—a Ghostly Scribe, a Sentient Tome, or a Mysterious Bard—who chronicles the party's adventures.

*   **For Players:** Provides an immersive, in-character perspective on the plot, lore, and their own deeds.
*   **For the DM:** Offers a powerful tool for storytelling, foreshadowing, and delivering exposition in a way that deepens immersion.

## 🚀 Core Philosophy & Technical Rationale

The stack was chosen to fulfill the core requirement: **a fast, reactive, and visually consistent interface that can be updated seamlessly and launched instantly during a game session.**

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Logic & UI** | React | Provides a component-based architecture perfect for managing dynamic journal entries, complex narrative states, and interactive content (e.g., revealable secrets). It's more scalable than lighter alternatives for this growing complexity. |
| **Styling** | Tailwind CSS | Enables rapid, utility-first styling to create a unique and immersive visual theme for the diary (e.g., parchment-like UI, fantasy fonts) without the overhead of custom CSS, ensuring a consistent look and feel. |
| **Build Tool** | Vite | Delivers an extremely fast development server and optimized builds. This "out-of-the-box" experience is crucial for the DM to see changes instantly and for the final product to load in any in-game browser without delay.

## 🛠️ Getting Started

*(This section would contain standard setup instructions)*

```bash
# Example
git clone https://github.com/KnightlyWorks/story-book-website
cd the-living-campaign-diary
npm install
npm run dev
