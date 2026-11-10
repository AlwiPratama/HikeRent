import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";

import { useHikeRent } from "@/context/HikeRentContext";

const activeGreen = "#28784F";
const inactiveGray = "#7C857E";

export default function TabLayout() {
  const { favoriteIds } = useHikeRent();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeGreen,
        tabBarInactiveTintColor: inactiveGray,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        tabBarStyle: {
          height: 76,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: "#E8EFE3",
          borderTopWidth: 1,
          borderTopColor: "#D7E2D3",
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          elevation: 12,
          shadowColor: "#203D32",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color, focused }) => (
            <SymbolView
              name={{
                ios: focused ? "house.fill" : "house",
                android: "home",
                web: "home",
              }}
              tintColor={color}
              size={23}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Jelajahi",
          tabBarIcon: ({ color, focused }) => (
            <SymbolView
              name={{
                ios: focused ? "safari.fill" : "safari",
                android: "explore",
                web: "explore",
              }}
              tintColor={color}
              size={23}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorit",
          tabBarBadge: favoriteIds.length > 0 ? favoriteIds.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: activeGreen,
            color: "#FFFFFF",
            fontSize: 9,
          },
          tabBarIcon: ({ color, focused }) => (
            <SymbolView
              name={{
                ios: focused ? "heart.fill" : "heart",
                android: focused ? "favorite" : "favorite_border",
                web: focused ? "favorite" : "favorite_border",
              }}
              tintColor={color}
              size={23}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Pesanan",
          tabBarIcon: ({ color, focused }) => (
            <SymbolView
              name={{
                ios: focused ? "list.bullet.rectangle.fill" : "list.bullet.rectangle",
                android: "receipt_long",
                web: "receipt_long",
              }}
              tintColor={color}
              size={23}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, focused }) => (
            <SymbolView
              name={{
                ios: focused ? "person.crop.circle.fill" : "person.crop.circle",
                android: "account_circle",
                web: "account_circle",
              }}
              tintColor={color}
              size={23}
            />
          ),
        }}
      />
    </Tabs>
  );
}
