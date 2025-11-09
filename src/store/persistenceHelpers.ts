import { persistor } from "./index";

/**
 * Utility functions for managing persisted Redux state
 */

/**
 * Purge all persisted state from AsyncStorage
 * Useful for logging out users or resetting the app
 */
export const purgePersistedState = async (): Promise<void> => {
  try {
    await persistor.purge();
  } catch (error) {
    console.error("Error purging persisted state:", error);
    throw error;
  }
};

/**
 * Flush all pending persist operations
 * Useful before app shutdown or critical state changes
 */
export const flushPersistedState = async (): Promise<void> => {
  try {
    await persistor.flush();
  } catch (error) {
    console.error("Error flushing persisted state:", error);
    throw error;
  }
};

/**
 * Pause persistence operations
 * Useful when you want to temporarily disable persistence
 */
export const pausePersistence = (): void => {
  persistor.pause();
};

/**
 * Resume persistence operations
 */
export const resumePersistence = (): void => {
  persistor.persist();
};

