module Model exposing (Model, encodeModel, initialModel, inspectSceneForDebugging)

import Json.Encode exposing (..)
import Types.AnimationRecord exposing (..)
import Types.Camera exposing (..)
import Types.Color exposing (..)
import Types.Euler exposing (..)
import Types.Fog exposing (..)
import Types.GLTFModel exposing (..)
import Types.Light exposing (..)
import Types.Transform exposing (..)
import Types.Vector3 exposing (..)
import Utility exposing (flip)


inspectSceneForDebugging =
    False


type alias Model =
    { animationRecord : AnimationRecord
    , gammaInput : Bool
    , gammaOutput : Bool
    , gammaFactor : Float
    , shadowMapEnabled : Bool
    , antialias : Bool
    , background : Color
    , camera : Camera
    , lights : List Light
    , models : List GLTFModel
    }


encodeModel : Model -> Value
encodeModel model =
    object
        [ ( "animationRecord", encodeAnimationRecord model.animationRecord )
        , ( "gammaInput", bool model.gammaInput )
        , ( "gammaOutput", bool model.gammaOutput )
        , ( "gammaFactor", float model.gammaFactor )
        , ( "shadowMapEnabled", bool model.shadowMapEnabled )
        , ( "antialias", bool model.antialias )
        , ( "background", encodeColor model.background )
        , ( "camera", encodeCamera model.camera )
        , ( "lights", list encodeLight model.lights )
        , ( "models", list encodeGLTFModel model.models )
        ]


initialModel : Model
initialModel =
    let
        backgroundColor =
            if inspectSceneForDebugging then
                fromHSL ( 0.6, 0, 0.5 )

            else
                fromHSL ( 0.6, 0, 0.98 )
    in
    { animationRecord =
        { elapsedTime = 0
        , deltaTime = 0
        , scrollTop = 0
        , mouse =
            { x = 0
            , y = 0
            }
        }
    , gammaInput = True
    , gammaOutput = True
    , gammaFactor = 2.2
    , shadowMapEnabled = True
    , antialias = True
    , background = backgroundColor
    , camera =
        { fov = 45
        , near = 1
        , far = 1000
        , transform =
            { position = Vector3 0 20 50
            , rotation = Euler -0.35 0 0 XYZ
            }
        , controlsEnabled = inspectSceneForDebugging || False
        , screenSpacePanning = True
        }
    , lights =
        [ HemisphereLight
            { skyColor = fromHSL ( 0.6, 0.9, 0.75 )
            , groundColor = fromHSL ( 0.1, 0.2, 0.1 )
            , intensity = 0.8
            , helperEnabled = inspectSceneForDebugging || False
            }
        , DirectionalLight
            { color = fromHSL ( 0.1, 1, 0.95 )
            , intensity = 1
            , position = Vector3 1 0.5 0
            , helperEnabled = inspectSceneForDebugging || False
            }
        ]
    , models =
        [ GLTFModel
            { url = "models/big_island.glb"
            , transform =
                { position = Vector3 20 0 0
                , rotation = Euler 0 0 0 XYZ
                }
            , update =
                \record (GLTFModel island) ->
                    (cos (record.elapsedTime * -0.0005) * 0.75)
                        |> flip setY island.transform.position
                        |> flip setPosition island.transform
                        |> flip setTransform (GLTFModel island)
            }
        , GLTFModel
            { url = "models/small_island.glb"
            , transform =
                { position = Vector3 24 0 0
                , rotation = Euler 0 0 0 XYZ
                }
            , update =
                \record (GLTFModel island) ->
                    sin (record.elapsedTime * -0.0009)
                        |> flip setY island.transform.position
                        |> flip setPosition island.transform
                        |> flip setTransform (GLTFModel island)
            }
        , GLTFModel
            { url = "models/rock1.glb"
            , transform =
                { position = Vector3 20 0 0
                , rotation = Euler 0 0 0 XYZ
                }
            , update =
                \record (GLTFModel rock) ->
                    sin (1 + record.elapsedTime * 0.001)
                        |> flip setY rock.transform.position
                        |> flip setPosition rock.transform
                        |> flip setTransform (GLTFModel rock)
            }
        , GLTFModel
            { url = "models/rock2.glb"
            , transform =
                { position = Vector3 20 0 0
                , rotation = Euler 0 0 0 XYZ
                }
            , update =
                \record (GLTFModel rock) ->
                    sin (2 + record.elapsedTime * 0.001)
                        |> flip setY rock.transform.position
                        |> flip setPosition rock.transform
                        |> flip setTransform (GLTFModel rock)
            }
        , GLTFModel
            { url = "models/rock3.glb"
            , transform =
                { position = Vector3 20 0 0
                , rotation = Euler 0 0 0 XYZ
                }
            , update =
                \record (GLTFModel rock) ->
                    sin (3 + record.elapsedTime * 0.001)
                        |> flip setY rock.transform.position
                        |> flip setPosition rock.transform
                        |> flip setTransform (GLTFModel rock)
            }
        ]
    }
