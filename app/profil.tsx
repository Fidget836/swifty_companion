import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";

export default function Profil() {
    const router = useRouter();
    const profilName = useSearchParams().get('profilName');

    useEffect(() => {
        if (profilName) {
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
                        console.log(data);
                    }
                } catch (error) {
                    console.error(error);
                }
            }

            fetchProfilData();
        } else {
            console.log("RENTRE ICI");
        }
    }, [profilName]);

    return (
        <View>
            <Text>TEST222</Text>
        </View>
    );
}