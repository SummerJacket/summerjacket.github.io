module Types.AnimationRecord exposing (AnimationRecord, encodeAnimationRecord)

import Json.Encode exposing (..)


type alias AnimationRecord =
    { elapsedTime : Float
    , deltaTime : Float
    , scrollTop : Int
    }


encodeAnimationRecord : AnimationRecord -> Value
encodeAnimationRecord record =
    object
        [ ( "elapsedTime", float record.elapsedTime )
        , ( "deltaTime", float record.deltaTime )
        , ( "scrollTop", int record.scrollTop )
        ]
