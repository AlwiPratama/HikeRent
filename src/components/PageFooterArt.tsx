import { Image } from "expo-image";
import { useWindowDimensions } from "react-native";

export function PageFooterArt({ imageUrl }: { imageUrl?: string }) {
  const { width } = useWindowDimensions();

  return (
    <Image
      accessibilityLabel="Ilustrasi pendakian HikeRent"
      contentFit="cover"
      contentPosition="bottom"
      source={
        imageUrl
          ? { uri: imageUrl }
          : require("../../assets/images/page-background.png")
      }
      style={{
        width,
        height: width / 2.23,
        minHeight: width / 2.23,
        flexGrow: 1,
        marginTop: 20,
        marginBottom: -40,
      }}
    />
  );
}
