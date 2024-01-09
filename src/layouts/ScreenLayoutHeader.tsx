import React from "react";
import { HStack, Typography, VStack } from "../components";

interface Props {
  title: string;
  subtitles?: string[];
  icon?: JSX.Element;
}

export function ScreenLayoutHeader({ title, subtitles, icon }: Props) {
  return (
    <VStack justifyContent="center" alignItems="center">
      <VStack>
        <Typography variant="title" testID="title">
          {title}
        </Typography>
        <HStack mt={5} />
        {subtitles?.map(subtitle => (
          <Typography key={subtitle} variant="subtitle">
            {subtitle}
          </Typography>
        ))}
      </VStack>
      <HStack justifyContent="center" alignItems="center" mt={10}>
        {icon}
      </HStack>
    </VStack>
  );
}
