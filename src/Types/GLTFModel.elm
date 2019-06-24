module Types.GLTFModel exposing (GLTFModel(..), encodeGLTFModel, gltfUpdate, setTransform)

import Json.Encode exposing (..)
import Types.AnimationRecord exposing (..)
import Types.Transform exposing (..)


type GLTFModel
    = GLTFModel
        { url : String
        , transform : Transform
        , update : AnimationRecord -> GLTFModel -> GLTFModel
        }


encodeGLTFModel : GLTFModel -> Value
encodeGLTFModel (GLTFModel gltf) =
    object
        [ ( "url", string gltf.url )
        , ( "transform", encodeTransform gltf.transform )
        ]


gltfUpdate : AnimationRecord -> GLTFModel -> GLTFModel
gltfUpdate record (GLTFModel gltf) =
    gltf.update record <| GLTFModel gltf


setTransform : Transform -> GLTFModel -> GLTFModel
setTransform transform (GLTFModel gltf) =
    GLTFModel { gltf | transform = transform }
