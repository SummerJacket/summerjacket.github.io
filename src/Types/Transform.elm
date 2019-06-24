module Types.Transform exposing (Transform, encodeTransform, setPosition)

import Json.Encode exposing (..)
import Types.Euler exposing (..)
import Types.Vector3 exposing (..)


type alias Transform =
    { position : Vector3
    , rotation : Euler
    }


encodeTransform : Transform -> Value
encodeTransform transform =
    object
        [ ( "position", encodeVector3 transform.position )
        , ( "rotation", encodeEuler transform.rotation )
        ]


setPosition : Vector3 -> Transform -> Transform
setPosition vec3 transform =
    { transform | position = vec3 }
