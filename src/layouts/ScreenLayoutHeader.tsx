import React from "react";
import { HStack, Typography, VStack } from "../components";

interface Props {
  title: string;
  subtitles?: string[];
  icon?: JSX.Element;
}

export function ScreenLayoutHeader(props: Props) {
  return (
    <VStack justifyContent="center" alignItems="center">
      <VStack>
        <Typography variant="title">{props.title}</Typography>
        <HStack mt={5} />
        {props.subtitles?.map(subtitle => (
          <Typography key={subtitle} variant="subtitle">
            {subtitle}
          </Typography>
        ))}
      </VStack>
      <HStack justifyContent="center" alignItems="center" mt={20}>
        {props.icon}
      </HStack>
    </VStack>
  );
}
