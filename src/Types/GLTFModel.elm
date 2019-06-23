module Types.GLTFModel exposing (GLTFModel, decodeGLTFModel, encodeGLTFModel)

import Json.Decode as D exposing (..)
import Json.Encode as E exposing (..)
import Types.Position exposing (..)


type alias Value =
    E.Value


type alias GLTFModel =
    { url : String
    , position : Position
    }


encodeGLTFModel : GLTFModel -> Value
encodeGLTFModel gltf =
    object
        [ ( "url", E.string gltf.url )
        , ( "position", encodePosition gltf.position )
        ]


decodeGLTFModel : Decoder GLTFModel
decodeGLTFModel =
    map2 GLTFModel
        (field "url" D.string)
        (field "position" decodePosition)
