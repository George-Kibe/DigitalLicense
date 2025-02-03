import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";

import {
  getDoseHistory,
  getMedications,
  DoseHistory,
  Medication,
} from "@/utils/storage";
import { loans } from "@/data/loans";

const LoanItem = ({ loan }: { loan: Loan }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>Client: {loan.name}</Text>
        <Text style={[styles.status, styles[loan.status.toLowerCase()]]}>
          {loan.status}
        </Text>
      </View>
      <Text style={styles.text}>💰 Amount: Kshs. {loan.amount}</Text>
      <Text style={styles.text}>📅 Disbursed: {moment(loan.dateDisbursed).format("DD-MMM-YYYY")}</Text>
      <Text style={styles.text}>📆 Due Date: {moment(loan.dueDate).format("DD-MMM-YYYY")}</Text>
      <Text style={styles.text}>📝 Notes: {loan.notes}</Text>
      <Text style={styles.text}>💸 Total Due: Kshs. {loan.totalDue}</Text>
      <Text style={styles.text}>✅ Paid: Kshs. {loan.totalPaid}</Text>
      <Text style={styles.text}>📊 Net Interest: Kshs. {loan.netInterest}</Text>
    </View>
  );
};

type EnrichedDoseHistory = DoseHistory & { medication?: Medication };

export default function LoansHistoryScreen() {
  const router = useRouter();
  const [history, setHistory] = useState<EnrichedDoseHistory[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "weekly" | "monthly" | "yearly"
  >("all");

  const loadHistory = useCallback(async () => {
    try {
      const [doseHistory, medications] = await Promise.all([
        getDoseHistory(),
        getMedications(),
      ]);

      // Combine history with medication details
      const enrichedHistory = doseHistory.map((dose) => ({
        ...dose,
        medication: medications.find((med) => med.id === dose.medicationId),
      }));

      setHistory(enrichedHistory);
    } catch (error) {
      console.error("Error loading history:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  const groupHistoryByDate = () => {
    const grouped = history.reduce((acc, dose) => {
      const date = new Date(dose.timestamp).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(dose);
      return acc;
    }, {} as Record<string, EnrichedDoseHistory[]>);

    return Object.entries(grouped).sort(
      (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
    );
  };

  const filteredHistory = history.filter((dose) => {
    if (selectedFilter === "all") return true;
    return true;
  });

  const groupedHistory = groupHistoryByDate();

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
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color="#1a8e2d" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Loans History</Text>
        </View>

        <View style={styles.filtersContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersScroll}
          >
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === "all" && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter("all")}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === "all" && styles.filterTextActive,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === "weekly" && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter("weekly")}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === "weekly" && styles.filterTextActive,
                ]}
              >
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === "monthly" && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter("monthly")}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === "monthly" && styles.filterTextActive,
                ]}
              >
                Monthly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === "yearly" && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter("yearly")}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === "yearly" && styles.filterTextActive,
                ]}
              >
                Yearly
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <FlatList
        data={loans}
        keyExtractor={(item) => item.name + item.dateDisbursed.toISOString()}
        renderItem={({ item }) => <LoanItem loan={item} />}
      />
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
    height: Platform.OS === "ios" ? 140 : 120,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 50 : 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginLeft: 15,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#f8f9fa",
    paddingTop: 10,
  },
  filtersScroll: {
    paddingRight: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "white",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  filterButtonActive: {
    backgroundColor: "#1a8e2d",
    borderColor: "#1a8e2d",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  filterTextActive: {
    color: "white",
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
  },
  dateGroup: {
    marginBottom: 25,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 12,
  },
  historyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  medicationColor: {
    width: 12,
    height: 40,
    borderRadius: 6,
    marginRight: 16,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  timeText: {
    fontSize: 14,
    color: "#666",
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
  },
  clearDataContainer: {
    padding: 20,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEBEE",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  clearDataText: {
    color: "#FF5252",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  status: {
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
    fontWeight: "bold",
    color: "#fff",
  },
  paid: { backgroundColor: "green" },
  pending: { backgroundColor: "orange" },
  "rolled over": { backgroundColor: "red" },
});
