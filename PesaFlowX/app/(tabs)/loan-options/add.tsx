import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const loanOptions = [
  {
    id: "1",
    label: "Client",
    icon: "id-card-sharp" as const,
    href: "/new-client",
  },
  {
    id: "2",
    label: "Disbursement",
    icon: "card" as const,
    href: "/new-disbursement",
  },
  {
    id: "3",
    label: "Repayment",
    icon: "sync-outline" as const,
    href: "/new-repayment",
  },
  {
    id: "4",
    label: "Expense",
    icon: "logo-alipay" as const,
    href: "/new-expense",
  },
  { 
    id: "5", 
    label: "Rollover", 
    icon: "calendar-number" as const, 
    href: "/new-rollover",
 },
];

export default function AddMedicationScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1a8e2d", "#146922"]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Select Record to Add</Text>
        </View>
        <View style={styles.recordOptionView}>
        {loanOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionCard,
            ]}
            onPress={() =>router.push(option.href)}
          >
            <View
              style={[
                styles.optionIcon,
              ]}
            >
              <Ionicons
                name={option.icon}
                size={24}

              />
            </View>
            <Text
              style={[
                styles.optionLabel,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === "ios" ? 140 : 160,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 50 : 50,
  },
  header: {
    flexDirection: "row",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    marginLeft: 15,
    alignSelf: 'center'
  },
  formContainer: {
    flex: 1,
  },
  formContentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 15,
    marginTop: 10,
  },
  mainInput: {
    fontSize: 20,
    color: "#333",
    padding: 15,
  },
  recordOptionView: {
    flexDirection: "row",
    flexWrap: "wrap",
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCard: {
    width: width / 2.4,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    margin: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedOptionCard: {
    backgroundColor: "#1a8e2d",
    borderColor: "#1a8e2d",
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  selectedOptionIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  selectedOptionLabel: {
    color: "white",
  },
  durationNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a8e2d",
    marginBottom: 5,
  },
  selectedDurationNumber: {
    color: "white",
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dateIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  dateButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  switchSubLabel: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  inputRow: {
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },
  flex1: {
    flex: 1,
  },
  input: {
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  textAreaContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  textArea: {
    height: 100,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  footer: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  saveButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
  },
  saveButtonGradient: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  cancelButton: {
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  inputError: {
    borderColor: "#FF5252",
  },
  errorText: {
    color: "#FF5252",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 12,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  refillInputs: {
    marginTop: 15,
  },
  timesContainer: {
    marginTop: 20,
  },
  timesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  timeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  timeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  timeButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});
