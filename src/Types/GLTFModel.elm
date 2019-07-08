module Types.GLTFModel exposing (GLTFModel(..), encodeGLTFModel, gltfUpdate, setTransform)

import Json.Encode as Encode exposing (Value)
import Types.AnimationRecord exposing (AnimationRecord)
import Types.Transform as Transform exposing (Transform)


type GLTFModel
    = GLTFModel
        { url : String
        , transform : Transform
        , update : AnimationRecord -> GLTFModel -> GLTFModel
        }


encodeGLTFModel : GLTFModel -> Value
encodeGLTFModel (GLTFModel gltf) =
    Encode.object
        [ ( "url", Encode.string gltf.url )
        , ( "transform", Transform.encodeTransform gltf.transform )
        ]


gltfUpdate : AnimationRecord -> GLTFModel -> GLTFModel
gltfUpdate record (GLTFModel gltf) =
    gltf.update record <| GLTFModel gltf


setTransform : Transform -> GLTFModel -> GLTFModel
setTransform transform (GLTFModel gltf) =
    GLTFModel { gltf | transform = transform }
