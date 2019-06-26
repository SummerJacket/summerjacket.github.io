module Types.AnimationRecord exposing (AnimationRecord, encodeAnimationRecord)

import Json.Encode exposing (..)
import Types.Vector2 exposing (..)


type alias AnimationRecord =
    { elapsedTime : Float
    , deltaTime : Float
    , scrollTop : Float
    , mouse : Vector2
    , width : Int
    , height : Int
    }


encodeAnimationRecord : AnimationRecord -> Value
encodeAnimationRecord record =
    object
        [ ( "elapsedTime", float record.elapsedTime )
        , ( "deltaTime", float record.deltaTime )
        , ( "scrollTop", float record.scrollTop )
        , ( "mouse", encodeVector2 record.mouse )
        , ( "width", int record.width )
        , ( "height", int record.height )
        ]
