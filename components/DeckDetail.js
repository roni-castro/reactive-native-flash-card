import React from 'react'
import { View, Text } from 'react-native'

export default function DeckDetail({card}) {
    return (
        <View>
            <Text>
                Um título do baralho
                Número de cartas no baralho
                Opção de começar um quiz naquele baralho
                Opção de adicionar uma nova pergunta ao baralho
            </Text>
        </View>
    )
}