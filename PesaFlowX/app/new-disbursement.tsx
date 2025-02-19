import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {Picker} from '@react-native-picker/picker';
import CalendarPicker from "react-native-calendar-picker";
import AntDesign from '@expo/vector-icons/AntDesign';
import moment from "moment";
import { useLoanContext } from "@/context/ApplicationContext";

interface LoanForm {
  name: string;
  amount: number;
  dateDisbursed: Date ;
  notes: string;
  dueDate: Date ;
  expenses: number;
  interestRate: number;
  status: "Pending" | "Approved" | "Rejected"; // Restrict to specific statuses
  totalDue: number;
}

const { width } = Dimensions.get("window");

export default function AddNewDisbursementScreen() {
  const router = useRouter();
  const { loans, people, addLoan, addPerson } = useLoanContext();
  const [totalAmountDue, setTotalAmountDue] = useState<Number>();
  const [showDisCalendar, setShowDisCalendar] = useState(false);
  const [showDueCalendar, setShowDueCalendar] = useState(false);

  const [form, setForm] = useState<LoanForm>({
    name: "",
    amount: 0,
    dateDisbursed: new Date(),
    notes: "",
    dueDate: new Date(),
    expenses: 0,
    interestRate: 0,
    status: "Pending",
    totalDue: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name.trim()) {
      newErrors.name = "Client name is required";
    }
    if (!form.amount) {
      newErrors.amount = "Amount is required";
    }
    if (!form.dateDisbursed) {
      newErrors.dateDisbursed = "Date disbursed is required";
    }
    if (!form.dueDate) {
      newErrors.dueDate = "Due date is required";
    } 
    if (form.interestRate > 100){
      newErrors.interestRate = "Interest rate should be less than 10";
    }
    if (form.interestRate < 0){
      newErrors.interestRate = "Interest rate should be more than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const newTotal = form.amount + (form.amount * form.interestRate / 100);
    setTotalAmountDue(newTotal);
  }, [form.interestRate, form.amount])
  



  const handleSave = async () => {
    try {
      if (!validateForm()) {
        Alert.alert("Error", "Please fill in all required fields correctly");
        return;
      }

      if (isSubmitting) return;
      setIsSubmitting(true);

      // Generate a random color
      const colors = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const clientData = {
        ...form,
      };
      addLoan({
        name: form.name,
        amount: form.amount,
        dateDisbursed: form.dateDisbursed,
        notes: form.notes,
        dueDate: form.dueDate,
        expenses: form.expenses,
        status: "Unpaid",
        totalDue: form.totalDue,
        totalPaid: 0,
        netInterest: 0,
        });
      Alert.alert(
        "Success",
        "Loan Disbursed and Recorded successfully",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert(
        "Error",
        "Failed to save loan disbursement. Please try again.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1a8e2d", "#146922"]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="#1a8e2d" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Disbursement</Text>
        </View>

        <ScrollView
          style={styles.formContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.formContentContainer}
        >
          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.label}>Select Client</Text>
            <Picker
              selectedValue={form.name}
              onValueChange={(itemValue, itemIndex) =>
                setForm({ ...form, name: itemValue })
              }>
                {
                  people.map((person) => (
                    <Picker.Item label={person.name + " " + person.phone} value={person.name} key={person.name} />
                  ))
                }
            </Picker>

            <Text style={styles.label}>Amount to be Disbursed</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.mainInput, errors.amount && styles.inputError]}
                keyboardType="numeric"
                placeholderTextColor="#999"
                value={form.amount.toString()}
                onChangeText={(text) => {
                  setForm({ ...form, amount: Number(text) });
                  if (errors.amount) {
                    setErrors({ ...errors, amount: "" });
                  }
                }}
              />
              {errors.amount && (
                <Text style={styles.errorText}>{errors.amount}</Text>
              )}
            </View>

            <Text style={styles.label}>Interest Rate</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.mainInput, errors.email && styles.inputError]}
                keyboardType="numeric"
                placeholderTextColor="#999"
                value={form.interestRate.toString()}
                onChangeText={(text) => {
                  setForm({ ...form, interestRate: Number(text) });
                  if (errors.interestRate) {
                    setErrors({ ...errors, interestRate: "" });
                  }
                }}
              />
              {errors.interestRate && (
                <Text style={styles.errorText}>{errors.interestRate}</Text>
              )}
            </View>
            
            <Text style={styles.label}>Total Amount Due: {totalAmountDue?.toFixed()}</Text>

            <Text style={styles.label}>Expenses</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.mainInput, errors.expenses && styles.inputError]}
                keyboardType="numeric"
                placeholderTextColor="#999"
                value={form.expenses.toString()}
                onChangeText={(text) => {
                  setForm({ ...form, expenses: Number(text) });
                  if (errors.expenses) {
                    setErrors({ ...errors, expenses: "" });
                  }
                }}
              />
              {errors.expenses && (
                <Text style={styles.errorText}>{errors.expenses}</Text>
              )}
            </View>
          <View style={styles.dateView}>
            <Text style={styles.label}>
              Date Disbursed: {moment(form.dateDisbursed).format("DD MMM YYYY") || ""} 
            </Text>
            <TouchableOpacity onPress={() => setShowDisCalendar(!showDisCalendar)}>
              <AntDesign name="calendar" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {
            showDisCalendar &&  
            <CalendarPicker 
              onDateChange={(date: Date) => {
                setForm({ ...form, dateDisbursed: new Date(date) }) 
                setShowDisCalendar(false)} }
            /> 
           }
          <View style={styles.dateView}>
            <Text style={styles.label}>
              Due Date: {moment(form.dueDate).format("DD MMM YYYY") || ""} 
            </Text>
            <TouchableOpacity onPress={() => setShowDueCalendar(!showDueCalendar)}>
              <AntDesign name="calendar" size={24} color="black" />
            </TouchableOpacity>
          </View>           
           
           {
            showDueCalendar &&  
            <CalendarPicker 
              onDateChange={(date: Date) => {
                setForm({ ...form, dueDate: new Date(date) }) 
                setShowDueCalendar(false)} }
            /> 
           }
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Notes</Text>
            <View style={styles.inputContainer}>
              <TextInput
                multiline
                style={[styles.mainInput, errors.notes && styles.inputError]}
                placeholderTextColor="#999"
                value={form.notes}
                onChangeText={(text) => {
                  setForm({ ...form, notes: text });
                  if (errors.notes) {
                    setErrors({ ...errors, notes: "" });
                  }
                }}
              />
              {errors.notes && (
                <Text style={styles.errorText}>{errors.notes}</Text>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
            disabled={isSubmitting}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.saveButton,
              isSubmitting && styles.saveButtonDisabled,
            ]}
            onPress={handleSave}
            disabled={isSubmitting}
          >
            <LinearGradient
              colors={["#1a8e2d", "#146922"]}
              style={styles.saveButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.saveButtonText}>
                {isSubmitting ? "Adding..." : "Add Disbursement"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>          
        </View>
      </SafeAreaView>
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
    fontSize: 18,
    color: "#333",
    padding: 8,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
  },
  optionCard: {
    width: (width - 60) / 2,
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
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  footer: {
    flexDirection: "row",
    width,
    paddingTop: 10,
    justifyContent: "space-around",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  saveButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  saveButtonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  cancelButton: {
    paddingHorizontal: 20,
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
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  dateView: {
    flexDirection: "row",
    gap: 4,
  }
});
