import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LanguageCode } from "../../i18n/config";
import { DEFAULT_LANGUAGE } from "../../i18n/config";

interface LanguageState {
  code: LanguageCode;
}

const initialState: LanguageState = {
  code: DEFAULT_LANGUAGE,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.code = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
