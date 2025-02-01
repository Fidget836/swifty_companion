import { View, ScrollView, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";

interface Project {
    name: string;
    status: string;
    cursus_ids: number;
    validated: boolean;
    final_mark: number;
}

interface Skill {
    name: string;
    level: number;
}

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
    const [projectsCursus, setProjectsCursus] = useState<Project[]>([]);
    const [projectsPiscine, setProjectsPiscine] = useState<Project[]>([]);
    const [skillsCursus, setSkillsCursus] = useState<Skill[]>([]);
    const [skillsPiscine, setSkillsPiscine] = useState<Skill[]>([]);
    const [chooseCursus, setChooseCursus] = useState(true);

    useEffect(() => {
        const fetchProfilData = async () => {
            try {
                setProjectsCursus([]);
                setProjectsPiscine([]);
                setSkillsCursus([]);
                setSkillsPiscine([]);
                
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

                    for (let project of data.projects_users) {
                        if (project.cursus_ids == 21) {
                            setProjectsCursus(prevProjects => [...prevProjects, { name: project.project.name , status: project.status, cursus_ids: project.cursus_ids, validated: project["validated?"], final_mark: project.final_mark }]);
                        } else if (project.cursus_ids == 9) {
                            setProjectsPiscine(prevProjects => [...prevProjects, { name: project.project.name , status: project.status, cursus_ids: project.cursus_ids, validated: project["validated?"], final_mark: project.final_mark }]);
                        }
                    }

                    for (let skill of data.cursus_users[0].skills) {
                        setSkillsPiscine(prevSkill => [...prevSkill, {name: skill.name, level: skill.level}]);
                    }

                    for (let skill of data.cursus_users[1].skills) {
                        setSkillsCursus(prevSkill => [...prevSkill, {name: skill.name, level: skill.level}]);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchProfilData();
    }, []);


    const renderProjectItem = ({ item }: { item: any }) => {
        if (item) {
            return (
                <View style={styles.projectItem}>
                    <View style={styles.projectItemTop}>
                        <Text style={styles.profilText}>{item.name || "Unknown Project"}</Text>
                            <Text style={styles.profilText}>Status: {item.validated === true ? "Réussi ✔" : item.final_mark === null ? "En attente ⏳" : "Échoué ✘"}</Text>
                    </View>

                    <View style={styles.projectItemBottom}>
                        <Text style={styles.profilTextBarre}>{item.final_mark || "0"}</Text>
                        <View style={styles.barreLevel}>
                            <View style={[styles.progressBarreLevel, {width: `${item.final_mark ?? 0}%`}]}>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (null);
        }
    };

    const renderSkillItem = ({ item }: { item: any }) => {
        if (item) {
            const lvl = Math.floor(item.level);
            const nextLvl = (item.level - lvl) * 100;

            return (
                <View style={styles.skillItem}>
                    <Text style={styles.skillSpecialText}>{item.name || "Unknown Skill"}</Text>

                    <View style={styles.projectItemBottom}>
                        <Text style={styles.profilTextBarre}>{lvl || "0"}</Text>
                        <View style={styles.barreLevel}>
                            <View style={[styles.progressBarreLevel, {width: `${nextLvl ?? 0}%`}]}>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (null);
        }
    };


    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
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


            <View style={styles.infoContainer}>

                <View style={styles.projectsContainer}>

                        <View style={styles.chooseCursus}>

                            <View style={chooseCursus ? styles.activateCursus : styles.desactivateCursus}>
                                <TouchableOpacity onPress={() => setChooseCursus(true)}>
                                <Text style={styles.profilText}>42 Cursus</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={chooseCursus ? styles.desactivatePiscine : styles.activatePiscine}>
                                <TouchableOpacity onPress={() => setChooseCursus(false)}>
                                <Text style={styles.profilText}>Piscine</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    <FlatList
                        data={chooseCursus ? projectsCursus : projectsPiscine}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderProjectItem}
                        nestedScrollEnabled={true}
                    />

                </View>

                <View style={styles.skillsContainer}>
                    <Text style={styles.skillText}>Skills</Text>
                    <FlatList
                        data={chooseCursus ? skillsCursus : skillsPiscine}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderSkillItem}
                        nestedScrollEnabled={true}
                    />
                </View>
            </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1d1d1d",
    },
    scrollContent: {
          alignItems: "center",
          justifyContent: "flex-start",
          paddingBottom: 50,
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
      skillSpecialText: {
        color: "#E3E3E3",
        fontSize: 15,
        marginBottom: 10,
        textAlign: "center",
      },
      profilTextBarre: {
        color: "#E3E3E3",
        fontSize: 15,
        width: 30,
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
        maxWidth: "100%",
        borderRadius: 5,
        backgroundColor: "#C67C4E",
        alignItems: "center",
        justifyContent: "center"
    },
    levelText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#E3E3E3",
    },
    infoContainer: {
        width: "80%",
    },
    projectsContainer: {
        width: "100%",
        height:  360,
        alignItems: "center",
        marginTop: 15,
    },
    skillsContainer: {
        width: "100%",
        height:  360,
        alignItems: "center",
        marginTop: 25,
    },
    skillText: {
        color: "#E3E3E3",
        fontSize: 15,
        fontWeight: "bold",
        margin: 10,
    },
    projectItem: {
        width: "100%",
        backgroundColor: "#313131",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    projectItemTop: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-around",
        paddingBottom: 15,
    },
    projectItemBottom: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center"
    },
    chooseCursus: {
        width: 200,
        height: 40,
        borderWidth: 1.5,
        borderColor: "#E3E3E3",
        backgroundColor: "#313131",
        borderRadius: 5,
        marginBottom: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    activateCursus: {
        width: "50%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C67C4E",
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    desactivateCursus: {
        width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    activatePiscine: {
        width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#C67C4E",
        borderRadius: 3,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    desactivatePiscine: {
        width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    skillItem: {
        width: "100%",
        backgroundColor: "#313131",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
})