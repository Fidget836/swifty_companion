import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";

export default function Index() {
  const [profilName, setProfilName] = useState('');
  const router = useRouter();

  const GoToProfil = () => {
    router.push('/profil');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Accueil</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          onChangeText={setProfilName}
          placeholder="Nom du profil"
          placeholderTextColor="#E3E3E3"
        />
        <TouchableOpacity style={styles.inputButton} onPress={GoToProfil}>
          <Image
            source={require("../assets/images/search.png")}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#1d1d1d"
  },
  h1: {
    color: "#E3E3E3",
    fontSize: 20,
    fontWeight: "bold",
    padding: 25
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: 'center',
    width: 250,
    justifyContent: "space-evenly"
  },
  inputText: {
    backgroundColor: "#313131",
    color: "#E3E3E3",
    height: 50,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  inputButton: {
    backgroundColor: "#C67C4E",
    height: 50,
    width: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
    
  },
  buttonImage: {
    width: 30,
    height: 30
  }

});
