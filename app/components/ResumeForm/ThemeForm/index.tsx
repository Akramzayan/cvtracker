import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import {
  DEFAULT_THEME_COLOR,
  GeneralSetting,
  changeSettings,
  selectSettings,
} from "@/app/lib/redux/settingsSlice";
import { BaseForm } from "../Form";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { InlineInput } from "./InlineInput";
import { THEME_COLORS } from "./constants";
import { InputGroupWrapper } from "../Form/InputGroup";

export const ThemeForm = () => {
  const settings = useAppSelector(selectSettings);
  const { fontFamily, fontSize, documentSize } = settings;
  const themeColor = settings.themeColor;
  const dispatch = useAppDispatch();
  const handleSettingChange = (field: GeneralSetting, value: string) => {
    dispatch(changeSettings({ field, value }));
  };

  return (
    <BaseForm>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 ">
          <Cog6ToothIcon
            className="h-6 w-6  text-gray-600"
            aria-hidden="true"
          />
          <h1 className="text-lg font-semibold tracking-wide text-gray-900">
            Resume Setting
          </h1>
        </div>
        <div>
          <InlineInput
            label="ThemeColor"
            value={settings.themeColor}
            placeHolder={DEFAULT_THEME_COLOR}
            onChange={handleSettingChange}
            inputStype={{ color: themeColor }}
            name={"themeColor"}
          />
          <div className="mt-2 flex flex-wrap gap-2">
          {THEME_COLORS.map((color, idx) => (
              <div
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm text-white"
                style={{ backgroundColor: color }}
                key={idx}
                onClick={() => handleSettingChange("themeColor", color)}
                onKeyDown={(e) => {
                  if (["Enter", " "].includes(e.key)) {
                    handleSettingChange("themeColor", color);
                  }
                }}
                tabIndex={0}
              >
                {settings.themeColor === color ? "$" : ""}
              </div>
            ))}

          </div>
        </div>

        <div>
            <InputGroupWrapper label="Font Family"/>
        </div>
      </div>
    </BaseForm>
  );
};
