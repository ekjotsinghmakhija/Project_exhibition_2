import './global.css'; // CRITICAL: Import the global CSS
import { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [isDispatching, setIsDispatching] = useState(false);
  const [status, setStatus] = useState("SYSTEM READY");

  const handleSOS = () => {
    setIsDispatching(true);
    setStatus("ROUTING SIGNAL TO GO HUB...");

    // Simulate API Call to Go Backend
    setTimeout(() => {
      setIsDispatching(false);
      setStatus("WARRIORS DISPATCHED");

      // Reset after 3 seconds for demo purposes
      setTimeout(() => setStatus("SYSTEM READY"), 3000);
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-950 items-center justify-center p-6">
      <StatusBar style="light" />

      {/* Header */}
      <View className="absolute top-16 w-full items-center">
        <Text className="text-red-500 font-bold text-2xl tracking-widest">SANJEEVANI</Text>
        <Text className="text-zinc-500 text-xs font-mono uppercase mt-1">Mobile Edge Node v7.0</Text>
      </View>

      {/* Main SOS Button Area */}
      <View className="items-center justify-center flex-1 w-full">
        {/* Animated Ripple Effect (Simulated via nested views) */}
        <View className={`absolute w-72 h-72 rounded-full border-2 ${isDispatching ? 'border-red-500/50' : 'border-zinc-800'}`} />
        <View className={`absolute w-80 h-80 rounded-full border-2 ${isDispatching ? 'border-red-500/20' : 'border-zinc-900'}`} />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSOS}
          disabled={isDispatching}
          className={`w-64 h-64 rounded-full items-center justify-center shadow-2xl ${
            isDispatching
              ? 'bg-red-800 border-4 border-red-500'
              : 'bg-red-600 border-8 border-red-900 shadow-red-900/50'
          }`}
        >
          {isDispatching ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <Text className="text-white font-black text-6xl tracking-tighter">SOS</Text>
          )}
        </TouchableOpacity>

        <Text className="text-zinc-400 mt-12 text-center text-sm px-8">
          Tap instantly in a life-threatening emergency. Do not test without warning.
        </Text>
      </View>

      {/* Footer Status Bar */}
      <View className="absolute bottom-12 w-full px-6">
        <View className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex-row items-center justify-between">
          <Text className="text-zinc-300 font-mono text-xs">STATUS:</Text>
          <Text className={`font-mono text-xs font-bold ${
            status === "SYSTEM READY" ? "text-emerald-500" : "text-red-500"
          }`}>
            {status}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
