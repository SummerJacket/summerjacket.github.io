module Types.GLTFModel exposing (GLTFModel(..), encodeGLTFModel, gltfUpdate)

import Json.Encode exposing (..)
import Types.Position exposing (..)
import Types.AnimationRecord exposing (..)

type GLTFModel
    = GLTFModel
        { url : String
        , position : Position
        , update : AnimationRecord -> GLTFModel -> GLTFModel
        }


encodeGLTFModel : GLTFModel -> Value
encodeGLTFModel (GLTFModel gltf) =
    object
        [ ( "url", string gltf.url )
        , ( "position", encodePosition gltf.position )
        ]


gltfUpdate : AnimationRecord -> GLTFModel -> GLTFModel
gltfUpdate record (GLTFModel gltf) =
    gltf.update record <| GLTFModel gltf
