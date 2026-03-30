/**
 * Centralized shadow styles for the application
 * Use these predefined shadow styles to maintain consistency across the app
 */

export const shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  /**
   * Large shadow - for modals and prominent elements
   */
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
} as const;
