module Types.Fog exposing (Fog, decodeFog, encodeFog)

import Json.Decode as D exposing (..)
import Json.Encode as E exposing (..)
import Types.Color exposing (Color, decodeColor, encodeColor)


type alias Value =
    E.Value


type alias Fog =
    { color : Color
    , near : Float
    , far : Float
    }


encodeFog : Fog -> Value
encodeFog fog =
    object
        [ ( "color", encodeColor fog.color )
        , ( "near", E.float fog.near )
        , ( "far", E.float fog.far )
        ]


decodeFog : Decoder Fog
decodeFog =
    map3 Fog
        (field "color" decodeColor)
        (field "near" D.float)
        (field "far" D.float)
