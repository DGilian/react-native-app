import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../api/TMDBApi'
import { connect } from 'react-redux'



export class FilmDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }
    }
    componentDidMount() {
        const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
        if (favoriteFilmIndex !== -1) { // Film déjà dans nos favoris, on a déjà son détail
            // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
            this.setState({
                film: this.props.favoritesFilm[favoriteFilmIndex]
            })
            return
        }
        // Le film n'est pas dans nos favoris, on n'a pas son détail
        // On appelle l'API pour récupérer son détail
        this.setState({ isLoading: true })
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }

    _displayLoading() {

        if (this.state.isLoading) {
            // Si isLoading vaut true, on affiche le chargement à l'écran
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }
    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        //envoi (dispatch) l'action au store redux :
        this.props.dispatch(action)
    }
    _displayFavoriteImage() {
        let sourceImage = require('../images/ic_favorite_border.png')
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            // Film dans nos favoris
            sourceImage = require('../images/ic_favorite.png')
        }
        return (
            <Image
                style={styles.favorite_image}
                source={sourceImage}
            />)
    }
    _displayFilm() {
        const { film } = this.state
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{ uri: getImageFromApi(this.state.film.backdrop_path) }}
                    />
                    <Text style={styles.title}>{this.state.film.title}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description}>{this.state.film.overview}</Text>
                    <Text style={styles.feature}>Sorti le : {this.state.film.release_date}</Text>
                    <Text style={styles.feature}>Note : {this.state.film.vote_average}</Text>
                    <Text style={styles.feature}>Nombre de votes  : {this.state.film.vote_count}</Text>
                    <Text style={styles.feature}>Budget : {this.state.film.budget} $</Text>
                    <Text style={styles.feature}>Genre : {this.state.film.genres.map((value) => {
                        return value.name
                    }).join(" / ")}</Text>
                    <Text style={styles.feature}>Compagnie(s) : {this.state.film.production_companies.map((value) => {
                        return value.name
                    }).join(" / ")}</Text>
                </ScrollView >
            )
        }
    }

    render() {

        return (
            <View style={styles.mainContainer}>
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 2,
        marginLeft: 2,
        marginRight: 2
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 200,

    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 32,
        marginTop: 5
    },
    description: {
        marginTop: 20,
        marginBottom: 20
    },
    feature: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        fontWeight: "bold"

    },
    favorite_container: {
        alignItems: 'center',
    }

})

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(FilmDetail)