module Types.Euler exposing (Euler, Order(..), encodeEuler, encodeOrder)

import Json.Encode exposing (..)


type Order
    = XYZ
    | XZY
    | YXZ
    | YZX
    | ZXY
    | ZYX


type alias Euler =
    { x : Float
    , y : Float
    , z : Float
    , order : Order
    }


encodeOrder : Order -> Value
encodeOrder order =
    string <|
        case order of
            XYZ ->
                "XYZ"

            XZY ->
                "XZY"

            YXZ ->
                "YXZ"

            YZX ->
                "YZX"

            ZXY ->
                "ZXY"

            ZYX ->
                "ZYX"


encodeEuler : Euler -> Value
encodeEuler euler =
    object
        [ ( "x", float euler.x )
        , ( "y", float euler.y )
        , ( "z", float euler.z )
        , ( "order", encodeOrder euler.order )
        ]
