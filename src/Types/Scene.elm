module Types.Scene exposing (Scene, decodeScene, encodeScene)

import Json.Decode as D exposing (..)
import Json.Encode as E exposing (..)
import Types.Color exposing (Color, decodeColor, encodeColor)
import Types.Fog exposing (..)


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
