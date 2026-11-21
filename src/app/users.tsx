// Nama: Ahmad Nadhif Zuvar
// NIM: 202410370110243

import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { PageFooterArt } from "@/components/PageFooterArt";

interface ApiUser {
  id: number;
  name: string;
  email: string;
}

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

async function fetchUsers(): Promise<ApiUser[]> {
  const response = await fetch(USERS_API_URL);

  if (!response.ok) {
    throw new Error("Data pengguna gagal dimuat.");
  }

  return (await response.json()) as ApiUser[];
}

export default function UsersScreen() {
  const router = useRouter();
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [requestStatus, setRequestStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    fetchUsers()
      .then((data) => {
        if (isActive) {
          setUsers(data);
          setRequestStatus("success");
        }
      })
      .catch(() => {
        if (isActive) setRequestStatus("error");
      });

    return () => {
      isActive = false;
    };
  }, [reloadKey]);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.content}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹ Kembali ke profil</Text>
        </Pressable>

        <Text style={styles.eyebrow}>DATA DARI EXTERNAL API</Text>
        <Text style={styles.title}>Daftar pengguna</Text>
        <Text style={styles.subtitle}>
          Nama dan email pengguna yang diambil dari JSONPlaceholder.
        </Text>

        {requestStatus === "loading" ? (
          <View style={styles.stateCard}>
            <ActivityIndicator color="#28784F" size="large" />
            <Text style={styles.stateText}>Memuat data pengguna...</Text>
          </View>
        ) : requestStatus === "error" ? (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>Data belum dapat dimuat</Text>
            <Text style={styles.stateText}>
              Periksa koneksi internet lalu coba lagi.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setRequestStatus("loading");
                setReloadKey((value) => value + 1);
              }}
              style={styles.retryButton}
            >
              <Text style={styles.retryButtonText}>Coba lagi</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.userList}>
            <Text style={styles.resultCount}>{users.length} pengguna</Text>
            {users.map((user) => (
              <View key={user.id} style={styles.userCard}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {user.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text selectable style={styles.userEmail}>
                    {user.email}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
      <PageFooterArt />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 28,
    backgroundColor: "#F3F4EE",
  },
  content: {
    width: "100%",
    maxWidth: 760,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
    paddingVertical: 6,
  },
  backButtonText: {
    color: "#496B52",
    fontSize: 12,
    fontWeight: "700",
  },
  eyebrow: {
    color: "#A15A37",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  title: {
    marginTop: 5,
    color: "#203D32",
    fontSize: 27,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 5,
    color: "#66766B",
    fontSize: 13,
    lineHeight: 19,
  },
  userList: {
    gap: 10,
    marginTop: 20,
  },
  resultCount: {
    marginBottom: 2,
    color: "#79837A",
    fontSize: 11,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E9E1",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    backgroundColor: "#E4F0E4",
  },
  avatarText: {
    color: "#28784F",
    fontSize: 17,
    fontWeight: "800",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: "#203D32",
    fontSize: 13,
    fontWeight: "800",
  },
  userEmail: {
    marginTop: 4,
    color: "#66766B",
    fontSize: 11,
  },
  stateCard: {
    alignItems: "center",
    marginTop: 22,
    padding: 22,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
  },
  stateTitle: {
    color: "#203D32",
    fontSize: 15,
    fontWeight: "800",
  },
  stateText: {
    marginTop: 10,
    color: "#66766B",
    fontSize: 12,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 9,
    backgroundColor: "#28784F",
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
});
