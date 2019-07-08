module Types.Vector2 exposing (Vector2, decodeVector2, encodeVector2, setX, setY)

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode exposing (Value)


type alias Vector2 =
    { x : Float
    , y : Float
    }


encodeVector2 : Vector2 -> Value
encodeVector2 position =
    Encode.object
        [ ( "x", Encode.float position.x )
        , ( "y", Encode.float position.y )
        ]


decodeVector2 : Decoder Vector2
decodeVector2 =
    Decode.map2 Vector2
        (Decode.field "x" Decode.float)
        (Decode.field "y" Decode.float)


setX : Float -> Vector2 -> Vector2
setX x vec2 =
    { vec2 | x = x }


setY : Float -> Vector2 -> Vector2
setY y vec2 =
    { vec2 | y = y }
