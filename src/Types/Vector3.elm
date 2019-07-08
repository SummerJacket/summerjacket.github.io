module Types.Vector3 exposing (Vector3, decodeVector3, encodeVector3, setX, setY, setZ)

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode exposing (Value)


type alias Value =
    Encode.Value


type alias Vector3 =
    { x : Float
    , y : Float
    , z : Float
    }


encodeVector3 : Vector3 -> Value
encodeVector3 position =
    Encode.object
        [ ( "x", Encode.float position.x )
        , ( "y", Encode.float position.y )
        , ( "z", Encode.float position.z )
        ]


decodeVector3 : Decoder Vector3
decodeVector3 =
    Decode.map3 Vector3
        (Decode.field "x" Decode.float)
        (Decode.field "y" Decode.float)
        (Decode.field "z" Decode.float)


setX : Float -> Vector3 -> Vector3
setX x vec3 =
    { vec3 | x = x }


setY : Float -> Vector3 -> Vector3
setY y vec3 =
    { vec3 | y = y }


setZ : Float -> Vector3 -> Vector3
setZ z vec3 =
    { vec3 | z = z }
