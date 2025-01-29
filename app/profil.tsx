import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";

export default function Profil() {
    const router = useRouter();
    const profilName = useSearchParams().get('profilName');
    const [login, setLogin] = useState('');
    const [level, setLevel] = useState<number>(0);
    const [nextLevel, setNextLevel] = useState<number>(0);
    const [email, setEmail] = useState('');
    const [wallet, setWallet] = useState('');
    const [correctionPoint, setCorrectionPoint] = useState<number>(0);
    const [fullName, setFullName] = useState('');
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
                    const level = data.cursus_users?.[1]?.level;
                    const currentLevel = isNaN(parseFloat(level)) ? 0 : parseFloat(level);
                    setLevel(Math.floor(currentLevel));
                    setNextLevel((currentLevel - Math.floor(currentLevel)) * 100);
                    setFullName(data.usual_full_name);
                    setCorrectionPoint(data.correction_point);

                    console.log(data);
                    
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchProfilData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Link href="/" style={styles.headerText}>❮❮ Accueil</Link>
                <Text style={styles.headerText}>Profil</Text>
                <Text style={styles.textInvisible}>❮❮ Accueil</Text>
            </View>
            <View style={styles.profilContainer}>
                <View style={styles.profilTopContainer}>
                    {profilPicture ? (
                        <Image
                        source={{ uri: profilPicture }} // Affichage de l'image avec une URL valide
                        style={styles.profileImage} // Style de l'image
                        />
                    ) : (
                        <Text style={styles.profilText}>Image non disponible</Text> // Message fallback
                    )}

                    <View style={styles.nameContainer}>
                        <Text style={styles.profilText}>{ fullName }</Text>
                        <Text style={styles.profilText}>{ login }</Text>
                        <Text style={styles.profilTextMini}>{ email }</Text>
                    </View>
                        <Text style={styles.textInvisible}>{ login }</Text>
                </View>



                <View style={styles.profilMiddleContainer}>
                    <Text style={styles.levelText}>{ level }</Text>
                    <View style={styles.barreLevel}>
                        <View style={[styles.progressBarreLevel, {width: `${nextLevel}%`}]}></View>
                    </View>
                    
                </View>



                <View style={styles.profilBottomContainer}>
                    <Text style={styles.profilText}>₳•{ wallet }</Text>
                    <Text style={styles.profilText}>Ev.P•{ correctionPoint }</Text>
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
      textInvisible: {
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
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
      profilMiddleContainer: {
        backgroundColor: "#313131",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      },
      profilBottomContainer: {
        backgroundColor: "#C67C4E",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
      },
      profilText: {
        color: "#E3E3E3",
        fontSize: 15,
      },
      profilTextMini: {
        color: "#E3E3E3",
        fontSize: 10,
        paddingTop: 5,
      },
      nameContainer: {
        alignItems: "center"
      },
      profileImage: {
        width: 75,
        height: 75,
        borderRadius: 50,
        resizeMode: 'cover'
    },
    barreLevel: {
        width: "85%",
        height: 20,
        borderWidth: 1.5,
        borderColor: "#E3E3E3",
        borderRadius: 5,
        marginLeft: 5,
    },
    progressBarreLevel: {
        height: "100%",
        borderRadius: 5,
        backgroundColor: "#C67C4E",
        alignItems: "center",
        justifyContent: "center"
    },
    levelText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#E3E3E3",
    }
})