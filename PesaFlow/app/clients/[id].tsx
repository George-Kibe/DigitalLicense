import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from "react-native";

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  // Sample user details
  const user = {
    name: "John Doe",
    contact: "254758 567 890",
    email: "smapleuser@example.com",
  };

  // Sample loan history data
  const loanHistory = [
    {
      id: "1",
      borrowedDate: "2024-01-15",
      paidDate: "2024-02-15",
      onTime: true,
      amountBorrowed: 5000,
      amountPaid: 5100,
      netProfit: 100,
      expense: 27,
    },
    {
      id: "2",
      borrowedDate: "2023-11-10",
      paidDate: "2024-01-10",
      onTime: false,
      amountBorrowed: 3000,
      amountPaid: 3400,
      netProfit: 400,
      expense: 27,
    },
    {
      id: "3",
      borrowedDate: "2023-08-05",
      paidDate: "2023-09-05",
      onTime: true,
      amountBorrowed: 7000,
      amountPaid: 7100,
      netProfit: 100,
      expense: 27,
    },
    {
      id: "4",
      borrowedDate: "2023-06-20",
      paidDate: "2023-08-25",
      onTime: false,
      amountBorrowed: 2000,
      amountPaid: 2300,
      netProfit: 300,
      expense: 27,
    },
    {
      id: "5",
      borrowedDate: "2023-04-15",
      paidDate: "2023-05-15",
      onTime: true,
      amountBorrowed: 6000,
      amountPaid: 6100,
      netProfit: 100,
      expense: 27,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* User Info Card */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Ionicons name="chevron-back" size={24} color="#1a8e2d" />
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
      <View style={styles.userCard}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userDetail}>📞 {user.contact}</Text>
        <Text style={styles.userDetail}>📧 {user.email}</Text>
      </View>

      {/* Loan History Table */}
      <Text style={styles.sectionTitle}>Loan History</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Date {"\n"}Borrowed</Text>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Date {"\n"} Paid</Text>
        <Text style={[styles.tableHeaderText, { flex: 1 }]}>On Time</Text>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Amount (Kes)</Text>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Expenses (Kes)</Text>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Paid {"\n"}(Kes)</Text>
        <Text style={[styles.tableHeaderText, { flex: 1 }]}>Profit {"\n"}(Kes)</Text>
      </View>

      <FlatList
        data={loanHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>{item.borrowedDate}</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>{item.paidDate}</Text>
            <Text style={[styles.tableCell, { flex: 1, color: item.onTime ? "green" : "red" }]}>
              {item.onTime ? "✔️" : "❌"}
            </Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>{item.amountBorrowed}</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>{item.expense}</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>{item.amountPaid}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{item.netProfit -27}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingTop: Platform.OS === "ios" ? 20 : 50,
  },
  backButton: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a8e2d",
    marginLeft: 5,
  },
  userCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  userDetail: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#333",
    paddingVertical: 8,
    borderRadius: 5,
  },
  tableHeaderText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 8,
    marginBottom: 2,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tableCell: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
});

