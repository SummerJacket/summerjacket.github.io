module Types.Light exposing (Light(..), encodeLight)

import Json.Encode as Encode exposing (Value)
import Types.Color as Color exposing (Color)
import Types.Vector3 as Vector3 exposing (Vector3)


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
            Encode.object
                [ ( "type", Encode.string "DIRECTIONAL_LIGHT" )
                , ( "color", Color.encodeColor dirLight.color )
                , ( "intensity", Encode.float dirLight.intensity )
                , ( "position", Vector3.encodeVector3 dirLight.position )
                , ( "helperEnabled", Encode.bool dirLight.helperEnabled )
                ]

        HemisphereLight hemiLight ->
            Encode.object
                [ ( "type", Encode.string "HEMISPHERE_LIGHT" )
                , ( "skyColor", Color.encodeColor hemiLight.skyColor )
                , ( "groundColor", Color.encodeColor hemiLight.groundColor )
                , ( "intensity", Encode.float hemiLight.intensity )
                , ( "helperEnabled", Encode.bool hemiLight.helperEnabled )
                ]
