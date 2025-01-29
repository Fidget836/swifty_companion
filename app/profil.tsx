import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";

export default function Profil() {
    const router = useRouter();
    const profilName = useSearchParams().get('profilName');
    const [login, setLogin] = useState('');
    const [level, setLevel] = useState('');
    const [email, setEmail] = useState('');
    const [wallet, setWallet] = useState('');
    const [profilPicture, setProfilPicture] = useState('');

    useEffect(() => {
        const fetchProfilData = async () => {
            try {
                const response = await fetch(`https://api.intra.42.fr/v2/users/${profilName}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
                        "Content-Type": "application/json",
                    }
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    const data = await response.json();
                    setLogin(data.login)
                    setEmail(data.email)
                    setWallet(data.wallet)
                    setProfilPicture(data.image?.link)
                    setLevel(data.cursus_users?.[1]?.level ?? "N/A")
                    // console.log(data);
                    
                    console.log(login);
                    console.log(email);
                    console.log(wallet);
                    console.log(profilPicture);
                    console.log(level);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchProfilData();
    }, [profilName]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Link href="/" style={styles.headerText}>❮❮ Accueil</Link>
                <Text style={styles.headerText}>Profil</Text>
                <Text style={styles.headerInvisible}>❮❮ Accueil</Text>
            </View>
            <View style={styles.profilContainer}>
                <View style={styles.profilTopContainer}>
                    <Text style={styles.profilText}>{ login }</Text>
                    {profilPicture ? (
                        <Image
                            source={{ uri: profilPicture }} // Affichage de l'image avec une URL valide
                            style={styles.profileImage} // Style de l'image
                        />
                    ) : (
                        <Text style={styles.profilText}>Image non disponible</Text> // Message fallback
                    )}
                </View>


                <View style={styles.profilBottomContainer}>
                    <Text style={styles.profilText}>{ wallet }</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#1d1d1d",
      },
      headerContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20
      },
      headerText: {
        color: "#E3E3E3",
        fontSize: 18,
        fontWeight: "bold"
      },
      headerInvisible: {
        opacity: 0
      },
      profilContainer: {
        width: "80%",
        padding: 10
      },
      profilTopContainer: {
        backgroundColor: "#313131",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
      profilBottomContainer: {
        backgroundColor: "#C67C4E",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
      },
      profilText: {
        color: "#E3E3E3",
        fontSize: 15
      },
      profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'cover'
    }

})