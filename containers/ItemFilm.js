import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../api/TMDBApi'

export default class FilmItem extends Component {
    _displayFavoriteImage() {
        if (this.props.isFilmFavorite) {
            return (
                <Image
                    style={styles.favorite_image}
                    source={require('../images/ic_favorite.png')}
                />
            )
        }
    }
    render() {
        const { film, displayDetailForFilm } = this.props
        return (
            <TouchableOpacity style={styles.mainContainer} onPress={() => displayDetailForFilm(film.id)}>
                <Image
                    style={styles.image}
                    source={{ uri: getImageFromApi(film.poster_path) }}
                />
                <View style={styles.contentContainer} >
                    <View style={styles.header}>
                        {this._displayFavoriteImage()}
                        <Text style={styles.titleText}>{film.title} </Text>
                        <Text style={styles.vote}>{film.vote_average}</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText} numberOfLines={6}>{film.overview}</Text>
                    </View>

                    <View style={styles.dateSortieContainer}>
                        <Text>Sortie le {film.release_date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
    },
    contentContainer: {
        flex: 1,
        margin: 5
    },
    header: {
        flexDirection: 'row',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        width: 170
    },
    vote: {
        fontSize: 26,
        fontWeight: 'bold'
    },
    descriptionContainer: {
        flex: 6,
    },
    descriptionText: {
        fontStyle: 'italic',
        color: '#666666'
    },
    dateSortieContainer: {
        flex: 1,
    }, favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5
    }

})

