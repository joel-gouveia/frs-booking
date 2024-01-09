import React from "react";
import { useTranslation } from "react-i18next";
import { currencyUtils } from "@utils/currency";

import EnterKey from "@assets/images/enter-key.svg";
import { FlatList, HStack, SummaryContainer, Typography, VStack } from "@components/index";
import { theme } from "src/theme/theme";
import { Ticket, TicketTypeGroup } from "src/types/models/ticket";
import { Price } from "src/types/models/price";

interface Props {
  onConfirmBooking: () => void;
  data: {
    title: TicketTypeGroup["name"] | "Total";
    content: Ticket[] | Price;
  }[];
}

export function Summary(props: Props) {
  const { t } = useTranslation();

  const flatListData = props.data.map(({ title, content }) => ({
    title,
    content: Array.isArray(content) ? (
      <VStack w={130}>
        <FlatList
          data={content}
          keyExtractor={({ code }) => code}
          renderItem={({ item }) => (
            <HStack justifyContent="space-between">
              <Typography size="sm">{item.code}</Typography>
              <Typography size="sm">{item.quantity}</Typography>
            </HStack>
          )}
        />
      </VStack>
    ) : (
      <Typography size="md" bold>
        {currencyUtils.formatPrice(content.currency, content.value)}
      </Typography>
    ),
  }));

  const flatListRenderItem = ({ item }: { item: { title: string; content: JSX.Element } }) => (
    <VStack gap={4} alignItems="center" key={item.title}>
      <Typography bold size="md">
        {item.title}
      </Typography>
      {item.content}
    </VStack>
  );

  return (
    <SummaryContainer
      flatListData={flatListData}
      flatListRenderItem={flatListRenderItem}
      buttonProps={{
        onPress: props.onConfirmBooking,
        title: t("payment.confirm-purchase"),
        iconElement: <EnterKey width={20} height={20} fill={theme.colors.white} />,
      }}
    />
  );
}
