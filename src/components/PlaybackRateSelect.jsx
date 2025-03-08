import { Select, ConfigProvider, theme } from "antd"; // Add 'theme' to imports
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlaybackRate } from "@/features/slices/playerSlice";

const PlaybackRateSelect = React.memo(() => {
  const dispatch = useDispatch();
  const playbackRate = useSelector((state) => state.player.playbackRate);
  const { token } = theme.useToken();

  const options = useMemo(
    () => [
      { value: 0.5, label: "x0.5" },
      { value: 1, label: "x1" },
      { value: 1.25, label: "x1.25" },
      { value: 1.5, label: "x1.5" },
      { value: 1.75, label: "x1.75" },
      { value: 2, label: "x2" },
    ],
    []
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: "#FFFFFF",
          colorBgContainer: "#121212",
          colorBgElevated: "#181818",
          colorTextQuaternary: "#B3B3B3",
          colorPrimary: "#1ED760",
          colorBorder: "#404040",
        },
        components: {
          Select: {
            selectorBg: "#181818",
            optionActiveBg: "#282828",
            optionSelectedBg: "#282828",
            optionSelectedColor: "#1ED760",
            colorPrimaryHover: "#1A1A1A",
          },
        },
      }}
    >
      <Select
        value={playbackRate}
        style={{ width: 80 }}
        onChange={(rate) => dispatch(setPlaybackRate(rate))}
        options={options}
      />
    </ConfigProvider>
  );
});

export default PlaybackRateSelect;
