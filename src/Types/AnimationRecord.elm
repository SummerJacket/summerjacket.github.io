module Types.AnimationRecord exposing (AnimationRecord, encodeAnimationRecord)

import Json.Encode as Encode exposing (Value)
import Types.Vector2 as Vector2 exposing (Vector2)


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
    Encode.object
        [ ( "elapsedTime", Encode.float record.elapsedTime )
        , ( "deltaTime", Encode.float record.deltaTime )
        , ( "scrollTop", Encode.float record.scrollTop )
        , ( "mouse", Vector2.encodeVector2 record.mouse )
        , ( "width", Encode.int record.width )
        , ( "height", Encode.int record.height )
        ]
