export type KeyEventProps = {
  keyName: keyof typeof HardwareKeyNameCode;
  keyCode: number;
  actionName: EventAction;
  keyCharacter: string;
};

export enum EventAction {
  ACTION_DOWN = 0,
  ACTION_UP = 1,
}

/**
  @description
  A map of the hardware key names to their respective key code.
  @description
  Some keys will change multiple times its name and code when pressed rapidly.
*/
export enum HardwareKeyNameCode {
  /* ========= F1 KEY ========= */
  KEYCODE_F1 = 131,
  KEYCODE_DPAD_LEFT = 21,

  /* ========= F2 KEY ========= */
  KEYCODE_F2 = 132,
  KEYCODE_DPAD_UP = 19,

  /* === SCANNER FRONT BUTTON KEY === */
  KEYCODE_SCANNER_F = 1010,

  /* ========= F3 KEY ========= */
  KEYCODE_F3 = 133,
  KEYCODE_DPAD_DOWN = 20,

  /* ========= F4 KEY ========= */
  KEYCODE_F4 = 134,
  KEYCODE_DPAD_RIGHT = 22,

  /* ========= CLR KEY ========= */
  KEYCODE_DEL = 67,

  /* ========= SPACE KEY ========= */
  KEYCODE_SPACE = 62,

  /* ========= Fn KEY ========= */
  KEYCODE_KEYPAD_FN = 1017,

  /* ========= ENTER KEY ========= */
  KEYCODE_ENTER = 66,

  /* ========= KEYPAD MODE KEY ========= */
  KEYCODE_KEYPAD_MODE = 1016,

  /* ========= KEY 1 ========= */
  KEYCODE_1 = 8,
  KEYCODE_AT = 77,

  /* ========= KEY 2 ========= */
  KEYCODE_2 = 9,
  KEYCODE_A = 29,
  KEYCODE_B = 30,
  KEYCODE_C = 31,

  /* ========= KEY 3 ========= */
  KEYCODE_3 = 10,
  KEYCODE_D = 32,
  KEYCODE_E = 33,
  KEYCODE_F = 34,

  /* ========= KEY 4 ========= */
  KEYCODE_4 = 11,
  KEYCODE_G = 35,
  KEYCODE_H = 36,
  KEYCODE_I = 37,

  /* ========= KEY 5 ========= */
  KEYCODE_5 = 12,
  KEYCODE_J = 38,
  KEYCODE_K = 39,
  KEYCODE_L = 40,

  /* ========= KEY 6 ========= */
  KEYCODE_6 = 13,
  KEYCODE_M = 41,
  KEYCODE_N = 42,
  KEYCODE_O = 43,

  /* ========= KEY 7 ========= */
  KEYCODE_7 = 14,
  KEYCODE_P = 44,
  KEYCODE_Q = 45,
  KEYCODE_R = 46,
  KEYCODE_S = 47,

  /* ========= KEY 8 ========= */
  KEYCODE_8 = 15,
  KEYCODE_T = 48,
  KEYCODE_U = 49,
  KEYCODE_V = 50,

  /* ========= KEY 9 ========= */
  KEYCODE_9 = 16,
  KEYCODE_W = 51,
  KEYCODE_X = 52,
  KEYCODE_Y = 53,
  KEYCODE_Z = 54,

  /* ========= KEY 0- ========= */
  KEYCODE_0 = 7,
  KEYCODE_SLASH = 76,
  KEYCODE_EQUALS = 70,

  /* ========= KEY -*# ========= */
  KEYCODE_MINUS = 69,
  KEYCODE_PLUS = 81,
  KEYCODE_STAR = 17,
  KEYCODE_POUND = 18,

  /* ========= KEY . ., ========= */
  KEYCODE_PERIOD = 56,
  KEYCODE_COMMA = 55,
  KEYCODE_APOSTROPHE = 75,
  KEYCODE_SEMICOLON = 74,
  KEYCODE_GRAVE = 68,
  KEYCODE_BACKSLASH = 73,
}
