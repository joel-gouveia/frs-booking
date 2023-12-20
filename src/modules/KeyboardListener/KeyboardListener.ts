import { DeviceEventEmitter, EmitterSubscription } from "react-native";
import { KeyEventProps } from "./types";

/**
 * Class representing a Keyboard Event listener.
 * @example
 * import { KeyboardListener } from "@modules/KeyboardListener/KeyboardListener";
 *
 * useEffect(() => {
 *   KeyboardListener.onKeyUpListener((event: KeyEventProps) => console.log(event));
 *
 *   return () => {
 *      KeyboardListener.removeKeyUpListener();
 *   };
 * }, []);
 */
class KeyEvent {
  /**
   * Subscription for the key down event.
   * @type {EmitterSubscription|null}
   */
  listenerKeyDown: EmitterSubscription | null = null;

  /**
   * Subscription for the key up event.
   * @type {EmitterSubscription|null}
   */
  listenerKeyUp: EmitterSubscription | null = null;

  /**
   * Adds a listener for the key down event.
   * @param {function} callback - The callback function to be called when the key down event occurs.
   * @returns {void}
   */
  onKeyDownListener(callback: (event: KeyEventProps) => void): void {
    this.removeKeyDownListener();
    this.listenerKeyDown = DeviceEventEmitter.addListener("onKeyDown", callback);
  }

  /**
   * Removes the key down event listener.
   * @returns {void}
   */
  removeKeyDownListener(): void {
    if (this.listenerKeyDown) {
      this.listenerKeyDown.remove();
      this.listenerKeyDown = null;
    }
  }

  /**
   * Adds a listener for the key up event.
   * @param {function} callback - The callback function to be called when the key up event occurs.
   * @returns {void}
   */
  onKeyUpListener(callback: (event: KeyEventProps) => void): void {
    this.removeKeyUpListener();
    this.listenerKeyUp = DeviceEventEmitter.addListener("onKeyUp", callback);
  }

  /**
   * Removes the key up event listener.
   * @returns {void}
   */
  removeKeyUpListener(): void {
    if (this.listenerKeyUp) {
      this.listenerKeyUp.remove();
      this.listenerKeyUp = null;
    }
  }
}

/**
 * Singleton instance of the KeyEvent class, used for managing keyboard event listeners.
 * @type {KeyEvent}
 */
export const KeyboardListener: KeyEvent = new KeyEvent();
