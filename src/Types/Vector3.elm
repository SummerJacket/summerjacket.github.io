module Types.Vector3 exposing (Vector3, decodeVector3, encodeVector3, setX, setY, setZ)

import Json.Decode as D exposing (..)
import Json.Encode as E exposing (..)


type alias Value =
    E.Value


type alias Vector3 =
    { x : Float
    , y : Float
    , z : Float
    }


encodeVector3 : Vector3 -> Value
encodeVector3 position =
    object
        [ ( "x", E.float position.x )
        , ( "y", E.float position.y )
        , ( "z", E.float position.z )
        ]


decodeVector3 : Decoder Vector3
decodeVector3 =
    map3 Vector3
        (field "x" D.float)
        (field "y" D.float)
        (field "z" D.float)


setX : Float -> Vector3 -> Vector3
setX x vec3 =
    { vec3 | x = x }


setY : Float -> Vector3 -> Vector3
setY y vec3 =
    { vec3 | y = y }


setZ : Float -> Vector3 -> Vector3
setZ z vec3 =
    { vec3 | z = z }
