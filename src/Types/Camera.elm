module Types.Camera exposing (Camera, encodeCamera)

import Json.Encode exposing (..)
import Types.Transform exposing (..)


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
    object
        [ ( "fov", float camera.fov )
        , ( "near", float camera.near )
        , ( "far", float camera.far )
        , ( "transform", encodeTransform camera.transform )
        , ( "controlsEnabled", bool camera.controlsEnabled )
        , ( "screenSpacePanning", bool camera.screenSpacePanning )
        ]


setTransform : Transform -> Camera -> Camera
setTransform transform camera =
    { camera | transform = transform }
