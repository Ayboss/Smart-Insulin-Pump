import { View, Text } from "react-native";
import React from "react";
import { Path, Rect, Svg } from "react-native-svg";

export default function Email() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={44} height={44} fill="none">
      <Rect width={44} height={44} fill="#fff" rx={22} />
      <Path
        stroke="#673FD5"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m12 16 6.913 3.917c2.549 1.444 3.625 1.444 6.174 0L32 16"
      />
      <Path
        stroke="#673FD5"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12.016 23.476c.065 3.065.098 4.598 1.229 5.733 1.131 1.136 2.705 1.175 5.854 1.254 1.94.05 3.862.05 5.802 0 3.149-.079 4.723-.118 5.854-1.254 1.131-1.135 1.164-2.668 1.23-5.733.02-.986.02-1.966 0-2.952-.066-3.065-.099-4.598-1.23-5.733-1.131-1.136-2.705-1.175-5.854-1.254-1.94-.05-3.862-.05-5.802 0-3.149.079-4.723.118-5.854 1.254-1.131 1.135-1.164 2.668-1.23 5.733a68.967 68.967 0 0 0 0 2.952Z"
      />
    </Svg>
  );
}
