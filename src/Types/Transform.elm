module Types.Transform exposing (Transform, encodeTransform, setPosition, setRotation)

import Json.Encode as Encode exposing (Value)
import Types.Euler as Euler exposing (Euler)
import Types.Vector3 as Vector3 exposing (Vector3)


type alias Transform =
    { position : Vector3
    , rotation : Euler
    }


encodeTransform : Transform -> Value
encodeTransform transform =
    Encode.object
        [ ( "position", Vector3.encodeVector3 transform.position )
        , ( "rotation", Euler.encodeEuler transform.rotation )
        ]


setPosition : Vector3 -> Transform -> Transform
setPosition vec3 transform =
    { transform | position = vec3 }


setRotation : Euler -> Transform -> Transform
setRotation rot transform =
    { transform | rotation = rot }
