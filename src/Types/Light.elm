module Types.Light exposing (Light(..), encodeLight)

import Json.Encode exposing (..)
import Types.Color exposing (..)
import Types.Vector3 exposing (..)


type Light
    = DirectionalLight
        { color : Color
        , intensity : Float
        , position : Vector3
        , helperEnabled : Bool
        }
    | HemisphereLight
        { skyColor : Color
        , groundColor : Color
        , intensity : Float
        , helperEnabled : Bool
        }


encodeLight : Light -> Value
encodeLight light =
    case light of
        DirectionalLight dirLight ->
            object
                [ ( "type", string "DIRECTIONAL_LIGHT" )
                , ( "color", encodeColor dirLight.color )
                , ( "intensity", float dirLight.intensity )
                , ( "position", encodeVector3 dirLight.position )
                , ( "helperEnabled", bool dirLight.helperEnabled )
                ]

        HemisphereLight hemiLight ->
            object
                [ ( "type", string "HEMISPHERE_LIGHT" )
                , ( "skyColor", encodeColor hemiLight.skyColor )
                , ( "groundColor", encodeColor hemiLight.groundColor )
                , ( "intensity", float hemiLight.intensity )
                , ( "helperEnabled", bool hemiLight.helperEnabled )
                ]
