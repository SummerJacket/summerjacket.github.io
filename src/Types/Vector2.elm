module Types.Vector2 exposing (Vector2, decodeVector2, encodeVector2, setX, setY)

import Json.Decode as Decode exposing (..)
import Json.Encode as Encode exposing (..)


type alias Value =
    Encode.Value


type alias Vector2 =
    { x : Float
    , y : Float
    }


encodeVector2 : Vector2 -> Value
encodeVector2 position =
    object
        [ ( "x", Encode.float position.x )
        , ( "y", Encode.float position.y )
        ]


decodeVector2 : Decoder Vector2
decodeVector2 =
    map2 Vector2
        (field "x" Decode.float)
        (field "y" Decode.float)


setX : Float -> Vector2 -> Vector2
setX x vec2 =
    { vec2 | x = x }


setY : Float -> Vector2 -> Vector2
setY y vec2 =
    { vec2 | y = y }
