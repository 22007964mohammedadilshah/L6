import React, { useState } from 'react';
import {
    StatusBar,
    Button,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { datasource } from './Data.js';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const [data, setData] = useState(datasource);

    useFocusEffect(
        React.useCallback(() => {
            setData(datasource); // Refresh data when screen comes into focus
        }, [])
    );

    const renderItem = ({ item, index, section }) => {
        const sectionIndex = data.findIndex((sec) => sec.title === section.title);
        const imageUrl = `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${item.num}-2x.png`;

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    navigation.navigate('Edit', {
                        sectionIndex,
                        pokemonIndex: index,
                        pokemon: item,
                    });
                }}
            >
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="contain"
                    onError={() => console.warn(`Failed to load image for ${item.name}`)}
                />
                <Text style={styles.textStyle}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <View style={styles.button}>
                <Button
                    title="Add Pokémon"
                    onPress={() => navigation.navigate('Add')}
                />
            </View>
            <SectionList
                sections={data}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgColor } }) => (
                    <Text style={[styles.headerText, { backgroundColor: bgColor || '#cccccc' }]}>
                        {title}
                    </Text>
                )}
                ListEmptyComponent={() => (
                    <Text style={{ textAlign: 'center', margin: 20 }}>
                        No Pokémon available. Add one to get started!
                    </Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    itemContainer: {
        borderWidth: 1,
        borderRadius: 4,
        margin: 5,
        padding: 15,
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
    },
    container: {
        flex: 1,
        paddingBottom: 50,
    },
    button: {
        margin: 10,
    },
});

export default Home;
