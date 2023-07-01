import { Text as PdfText, StyleSheet } from "@react-pdf/renderer";
import type { PDFComponentProps } from "./types";

export const textStyles = StyleSheet.create({
  translation: {
    fontStyle: "italic",
    color: "gray",
  },
});

type TextPropsType = PDFComponentProps & {
  center?: true;
};

export const Text: React.FC<TextPropsType> = ({
  children,
  style: customStyle,
  center,
}) => {
  return (
    <PdfText
      style={{
        ...(center && { margin: "auto" }),
        ...customStyle,
      }}
    >
      {children}
    </PdfText>
  );
};

type TranslationPropsType = TextPropsType & {
  center?: true;
};

export const Translation: React.FC<TranslationPropsType> = ({
  children,
  style: customStyle,
  ...props
}) => {
  return (
    <Text style={{ ...textStyles.translation, ...customStyle }} {...props}>
      {children}
    </Text>
  );
};
