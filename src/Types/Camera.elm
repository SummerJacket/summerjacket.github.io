module Types.Camera exposing (Camera, encodeCamera, setTransform)

import Json.Encode as Encode exposing (Value)
import Types.Transform as Transform exposing (Transform)


type alias Camera =
    { fov : Float
    , near : Float
    , far : Float
    , transform : Transform
    , controlsEnabled : Bool
    , screenSpacePanning : Bool
    }


encodeCamera : Camera -> Value
encodeCamera camera =
    Encode.object
        [ ( "fov", Encode.float camera.fov )
        , ( "near", Encode.float camera.near )
        , ( "far", Encode.float camera.far )
        , ( "transform", Transform.encodeTransform camera.transform )
        , ( "controlsEnabled", Encode.bool camera.controlsEnabled )
        , ( "screenSpacePanning", Encode.bool camera.screenSpacePanning )
        ]


setTransform : Transform -> Camera -> Camera
setTransform transform camera =
    { camera | transform = transform }
