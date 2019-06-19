module Types.Scene exposing (Scene, decodeScene, encodeScene)

import Color exposing (Color)
import Json.Decode as D exposing (..)
import Json.Encode as E exposing (..)
import Types.Fog exposing (..)
import Utils exposing (decodeColor, encodeColor)


type alias Value =
    E.Value


type alias Scene =
    { background : Color
    , fog : Fog
    }


encodeScene : Scene -> Value
encodeScene scene =
    object
        [ ( "background", encodeColor scene.background )
        , ( "fog", encodeFog scene.fog )
        ]


decodeScene : Decoder Scene
decodeScene =
    map2 Scene
        (field "background" decodeColor)
        (field "fog" decodeFog)
