import { Text, View, Link } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { styles, spacing } from "../styles";
import { DEFAULT_FONT_COLOR } from "@/app/lib/redux/settingsSlice";
import React from "react";

export const ResumePDFSection = ({
  themeColor,
  heading,
  style,
  children,
}: {
  themeColor?: string;
  heading?: string;
  style?: Style;
  children: React.ReactNode;
}) => (
  <View
    style={{
      ...styles.flexCol,
      gap: spacing["2"],
      marginTop: spacing["5"],
      ...style,
    }}
  >
    {heading && (
      <View style={{ ...styles.flexRow, alignItems: "center" }}>
        {themeColor && (
          <View
            style={{
              height: "3.75pt",
              width: "30pt",
              backgroundColor: themeColor,
              marginRight: spacing["3.5"],
            }}
          />
        )}
        <Text
          style={{
            fontWeight: "bold",
            letterSpacing: "0.3pt",
          }}
        >
          {heading}
        </Text>
      </View>
    )}
    {children}
  </View>
);

export const ResumePDFText=({
    bold=false,
    themeColor,
    style={},
    children
}:{
    bold ?: boolean;
    themeColor?:string;
    style?:Style;
    children:React.ReactNode
}) => {
    return (
        <Text style={{
            color:themeColor || DEFAULT_FONT_COLOR,
            fontWeight:bold ? "bold":"normal",
            ...style
        }}>
            {children}
        </Text>
    )
}


export const ResumePDFLink = ({
  src,
  isPDF,
  children,
}:{
  src:string;
  isPDF:boolean;
  children:React.ReactNode
}) => {
  if (isPDF){
    return(
      <Link src={src} style={{textDecoration:"none"}}>
        {children}
      </Link>
    )
  }

  return (
    // This value tells the browser not to send a referrer header when the user clicks on the linked resource.
    <a href={src} style={{textDecoration:"none"}} target="_blank" rel="noreferrer">
      {children}
    </a>
  )

}
