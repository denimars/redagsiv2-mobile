import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import { useLoading } from '../context/LoadingContext';
import { useTheme } from '../context/ThemeContext';

export default function LoadingOverlay() {
  const { colors, fonts } = useTheme();
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <Modal
      transparent={true}
      visible={isLoading}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: colors.card }]}>
          <ActivityIndicator 
            size="large" 
            color={colors.mainButton} 
          />
          <Text style={[
            styles.text, 
            { 
              color: colors.text,
              fontFamily: fonts.body 
            }
          ]}>
            Loading...
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  },
});