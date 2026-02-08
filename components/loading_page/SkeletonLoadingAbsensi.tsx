import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

const SkeletonItem = ({ style }: { style: any }) => {
  const { colors } = useTheme();
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    shimmer.start();
    return () => shimmer.stop();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        style,
        {
          backgroundColor: colors.border || "#e1e1e1",
          opacity,
        },
      ]}
    />
  );
};

export default function SkeletonLoadingAbsensi() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Skeleton */}
          <View style={styles.header}>
            <View>
              <SkeletonItem style={styles.greetingSkeleton} />
              <SkeletonItem style={styles.userNameSkeleton} />
            </View>
            <SkeletonItem style={styles.notificationSkeleton} />
          </View>

          {/* Clock Section Skeleton */}
          <View style={styles.clockSection}>
            <View style={[styles.clockCard, { backgroundColor: colors.card }]}>
              <SkeletonItem style={styles.dateSkeleton} />
              <View style={styles.clockWrapper}>
                <SkeletonItem style={styles.clockCircleSkeleton} />
              </View>
            </View>
          </View>

          {/* Action Button Skeleton */}
          <View style={styles.actionSection}>
            <SkeletonItem style={styles.buttonSkeleton} />
          </View>

          {/* Announcement Section Skeleton */}
          <View style={styles.announcementSection}>
            <SkeletonItem style={styles.sectionTitleSkeleton} />
            <View style={styles.announcementRow}>
              <SkeletonItem style={styles.announcementCardSkeleton} />
              <SkeletonItem style={styles.announcementCardSkeleton} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  greetingSkeleton: {
    width: 100,
    height: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
  userNameSkeleton: {
    width: 150,
    height: 32,
    borderRadius: 8,
  },
  notificationSkeleton: {
    width: 48,
    height: 48,
    borderRadius: 14,
  },
  clockSection: {
    marginBottom: 24,
  },
  clockCard: {
    borderRadius: 36,
    padding: 24,
    alignItems: "center",
  },
  dateSkeleton: {
    width: 180,
    height: 14,
    borderRadius: 4,
    marginBottom: 20,
  },
  clockWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  clockCircleSkeleton: {
    width: 230,
    height: 230,
    borderRadius: 115,
  },
  actionSection: {
    marginBottom: 24,
  },
  buttonSkeleton: {
    height: 74,
    borderRadius: 22,
    width: "100%",
  },
  announcementSection: {
    marginBottom: 30,
  },
  sectionTitleSkeleton: {
    width: 120,
    height: 24,
    borderRadius: 4,
    marginBottom: 16,
    marginLeft: 4,
  },
  announcementRow: {
    flexDirection: "row",
  },
  announcementCardSkeleton: {
    width: 280,
    height: 150,
    borderRadius: 20,
    marginRight: 16,
  },
});
