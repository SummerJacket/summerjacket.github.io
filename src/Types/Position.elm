module Types.Position exposing (Position, decodePosition, encodePosition)

import Json.Decode as D exposing (..)
import Json.Encode as E exposing (..)


type alias Value =
    E.Value


type alias Position =
    { x : Float
    , y : Float
    , z : Float
    }


encodePosition : Position -> Value
encodePosition position =
    object
        [ ( "x", E.float position.x )
        , ( "y", E.float position.y )
        , ( "z", E.float position.z )
        ]


decodePosition : Decoder Position
decodePosition =
    map3 Position
        (field "x" D.float)
        (field "y" D.float)
        (field "z" D.float)
