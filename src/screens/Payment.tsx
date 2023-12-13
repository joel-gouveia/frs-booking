import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Button, HStack, Typography, VStack } from "@components/index";
import { useBooking } from "@hooks/useBooking";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { Footer } from "@components/Footer/Footer";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import Icon from "react-native-vector-icons/Feather";
import EnterKey from "@assets/images/enter-key.svg";

export function PaymentScreen() {
  const { t } = useTranslation();
  const { originCode, destinationCode, departureDate, numAdults, numKids, numBikes, numCars } =
    useBooking();
  const { navigate } = useNavigation<NavigationProps>();

  const passengersText = useMemo(() => {
    const passengers = [];

    if (numAdults > 0) {
      passengers.push(`(adults: ${numAdults})`);
    }

    if (numKids > 0) {
      passengers.push(`(children: ${numKids})`);
    }

    return passengers.join(" ");
  }, [numAdults, numKids]);

  const vehiclesText = useMemo(() => {
    const vehicles = [];

    if (numCars > 0) {
      vehicles.push(`(cars: ${numCars})`);
    }

    if (numBikes > 0) {
      vehicles.push(`(bycicles: ${numBikes})`);
    }

    return vehicles.join(" ");
  }, [numCars, numBikes]);

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Typography size="small" style={styles.headerText}>
          Voyageleg: {departureDate} {originCode} - {destinationCode}
        </Typography>
      </View>
      <VStack gap={24}>
        <Typography>Payment Method</Typography>
        <HStack gap={20}>
          <Button
            variant="outline"
            style={{ flex: 1, paddingVertical: 40, marginLeft: 10, gap: 0 }}>
            <Typography fontSize={11} style={{ position: "absolute", right: 4, top: 4 }}>
              1
            </Typography>
            <Icon name="dollar-sign" size={60} color="black" />
            <Typography fontSize={26} style={{ position: "absolute", bottom: 6 }}>
              Cash
            </Typography>
          </Button>
          <Button
            variant="outline"
            style={{ flex: 1, paddingVertical: 40, marginRight: 10, gap: 0 }}>
            <Typography fontSize={11} style={{ position: "absolute", right: 4, top: 4 }}>
              2
            </Typography>
            <Icon name="credit-card" size={60} color="black" />
            <Typography fontSize={26} style={{ position: "absolute", bottom: 6 }}>
              Card
            </Typography>
          </Button>
        </HStack>
        <View>
          <Typography>Payment summary</Typography>
          <View
            style={{
              backgroundColor: "#d9d9d9",
              padding: 8,
              borderRadius: 6,
              marginTop: 8,
            }}>
            <Typography size="small" mb={46}>
              Passengers: {passengersText}
            </Typography>
            <Typography size="small" mb={46}>
              Vehicles: {vehiclesText}
            </Typography>
          </View>
        </View>
        <Typography fontSize={30} style={{ textAlign: "center", paddingVertical: 4 }}>
          Total: 123,45 €
        </Typography>
        <Button variant="outline" style={styles.bookButton}>
          <EnterKey height={30} width={30} style={styles.enterKeyIcon} />
          <Typography fontSize={20}>Confirm Purchase</Typography>
        </Button>
      </VStack>
      <Footer
        buttons={[
          {
            label: t("footer.main-menu"),
            onPress: () => navigate(NavigationScreens.MAIN_MENU),
          },
          {
            label: "empty",
          },
          {
            label: "Reset",
            onPress: () => {},
          },
        ]}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  headerText: {
    backgroundColor: "#d9d9d9",
    alignSelf: "flex-start",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 6,
  },
  invisibleSeparator: {
    width: 50,
  },
  bookButton: {
    marginHorizontal: 40,
    position: "relative",
    paddingVertical: 10,
  },
  enterKeyIcon: {
    position: "absolute",
    right: 4,
  },
});
