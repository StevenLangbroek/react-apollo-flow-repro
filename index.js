// @flow
import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import type { OperationComponent, QueryProps } from 'react-apollo'
const HERO_QUERY = gql`
    query GetCharacter($episode: Episode!) {
        hero(episode: $episode) {
            name
            id
            friends {
                name
                id
                appearsIn
            }
        }
    }
`
type Hero = {
    name: string,
    id: string,
    appearsIn: string[],
    friends: Hero[]
}

type Response = {
    hero: Hero
}

type Props = Response & QueryProps

export type InputProps = {
    episode: string
}

const withCharacter: OperationComponent<
    Response,
    InputProps,
    Props
> = graphql(HERO_QUERY, {
    options: ({ episode }) => ({
        variables: { episode }
    })
})

export default withCharacter(({ data: { loading, hero, error } }) => {
    if (loading) return <div>Loading</div>
    if (error) return <h1>ERROR</h1>
})
