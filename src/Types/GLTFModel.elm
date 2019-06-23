module Types.GLTFModel exposing (GLTFModel(..), encodeGLTFModel)

import Json.Encode exposing (..)
import Types.Position exposing (..)


type GLTFModel
    = GLTFModel
        { url : String
        , position : Position
        , update : GLTFModel -> GLTFModel
        }


encodeGLTFModel : GLTFModel -> Value
encodeGLTFModel (GLTFModel gltf) =
    object
        [ ( "url", string gltf.url )
        , ( "position", encodePosition gltf.position )
        ]
