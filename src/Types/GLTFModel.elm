module Types.GLTFModel exposing (GLTFModel(..), encodeGLTFModel, gltfUpdate)

import Json.Encode exposing (..)
import Types.Position exposing (..)


type GLTFModel
    = GLTFModel
        { url : String
        , position : Position
        , update : Int -> GLTFModel -> GLTFModel
        }


encodeGLTFModel : GLTFModel -> Value
encodeGLTFModel (GLTFModel gltf) =
    object
        [ ( "url", string gltf.url )
        , ( "position", encodePosition gltf.position )
        ]


gltfUpdate : Int -> GLTFModel -> GLTFModel
gltfUpdate tick (GLTFModel gltf) =
    gltf.update tick <| GLTFModel gltf
