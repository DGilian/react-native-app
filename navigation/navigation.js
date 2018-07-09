// Navigation/Navigation.js
import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Search from '../containers/Search'
import FilmDetail from '../containers/FilmDetail'
import Favorites from '../containers/Favorites'

const SearchStackNavigator = createStackNavigator({
    Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

const MoviesTabNavigator = createBottomTabNavigator({

    Search: {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                    source={require('../images/ic_search.png')}
                    style={styles.icon}
                />
            }
        }
    },

},
    {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false, // On masque les titres
            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
        }
    }

)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default MoviesTabNavigator