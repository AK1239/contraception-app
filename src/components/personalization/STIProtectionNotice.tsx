import React from "react";
import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export const STIProtectionNotice: React.FC = () => {
  return (
    <Card style={styles.stiNoticeCard}>
      <Card.Content>
        <Text variant="titleSmall" style={styles.stiNoticeTitle}>
          ⚠️ STI Protection Notice
        </Text>
        <Text variant="bodySmall" style={styles.stiNoticeText}>
          None of the below methods provide protection against STIs, so if you think you're at an increased risk of STI, barrier methods should be used either alone acting both as a contraceptive and a protector for STI or you can use barrier methods along with your chosen contraceptive.
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  stiNoticeCard: {
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#fff3e0",
  },
  stiNoticeTitle: {
    marginBottom: 8,
    fontWeight: "bold",
    color: "#e65100",
  },
  stiNoticeText: {
    color: "#e65100",
    lineHeight: 18,
  },
});

