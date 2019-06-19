module Types.Camera exposing (Camera, decodeCamera, encodeCamera)

import Json.Decode as D exposing (..)
import Json.Encode as E exposing (..)
import Types.Position exposing (..)


type alias Value =
    E.Value


type alias Camera =
    { fov : Float
    , aspect : Float
    , near : Float
    , far : Float
    , position : Position
    , controlsEnabled : Bool
    , screenSpacePanning : Bool
    }


encodeCamera : Camera -> Value
encodeCamera camera =
    object
        [ ( "fov", E.float camera.fov )
        , ( "aspect", E.float camera.aspect )
        , ( "near", E.float camera.near )
        , ( "far", E.float camera.far )
        , ( "position", encodePosition camera.position )
        , ( "controlsEnabled", E.bool camera.controlsEnabled )
        , ( "screenSpacePanning", E.bool camera.screenSpacePanning )
        ]


decodeCamera : Decoder Camera
decodeCamera =
    map7 Camera
        (field "fov" D.float)
        (field "aspect" D.float)
        (field "near" D.float)
        (field "far" D.float)
        (field "position" decodePosition)
        (field "controlsEnabled" D.bool)
        (field "screenSpacePanning" D.bool)
