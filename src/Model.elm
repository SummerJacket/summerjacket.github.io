module Model exposing (Model, encodeModel, initialModel, inspectSceneForDebugging)

import Json.Encode as Encode exposing (Value)
import Types.AnimationRecord as AnimationRecord exposing (AnimationRecord)
import Types.Camera as Camera exposing (Camera)
import Types.Color as Color exposing (Color)
import Types.Euler as Euler exposing (Euler)
import Types.GLTFModel as GLTFModel exposing (GLTFModel(..))
import Types.Light as Light exposing (Light(..))
import Types.Transform as Transform
import Types.Vector3 as Vector3 exposing (Vector3)
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
    Encode.object
        [ ( "animationRecord", AnimationRecord.encodeAnimationRecord model.animationRecord )
        , ( "gammaInput", Encode.bool model.gammaInput )
        , ( "gammaOutput", Encode.bool model.gammaOutput )
        , ( "gammaFactor", Encode.float model.gammaFactor )
        , ( "shadowMapEnabled", Encode.bool model.shadowMapEnabled )
        , ( "antialias", Encode.bool model.antialias )
        , ( "background", Color.encodeColor model.background )
        , ( "camera", Camera.encodeCamera model.camera )
        , ( "lights", Encode.list Light.encodeLight model.lights )
        , ( "models", Encode.list GLTFModel.encodeGLTFModel model.models )
        ]


initialModel : Model
initialModel =
    let
        backgroundColor =
            if inspectSceneForDebugging then
                Color.fromHSL ( 0.6, 0, 0.5 )

            else
                Color.fromHSL ( 0.6, 0, 0.98 )
    in
    { animationRecord =
        { elapsedTime = 0
        , deltaTime = 0
        , scrollTop = 0
        , mouse =
            { x = 0
            , y = 0
            }
        , width = 1
        , height = 1
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
            , rotation = Euler -0.35 0 0 Euler.XYZ
            }
        , controlsEnabled = inspectSceneForDebugging || False
        , screenSpacePanning = True
        }
    , lights =
        [ HemisphereLight
            { skyColor = Color.fromHSL ( 0.6, 0.9, 0.75 )
            , groundColor = Color.fromHSL ( 0.1, 0.2, 0.1 )
            , intensity = 0.8
            , helperEnabled = inspectSceneForDebugging || False
            }
        , DirectionalLight
            { color = Color.fromHSL ( 0.1, 1, 0.95 )
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
                , rotation = Euler 0 0 0 Euler.XYZ
                }
            , update =
                \record (GLTFModel island) ->
                    (cos (record.elapsedTime * -0.0005) * 0.75)
                        |> flip Vector3.setY island.transform.position
                        |> flip Transform.setPosition island.transform
                        |> flip GLTFModel.setTransform (GLTFModel island)
            }
        , GLTFModel
            { url = "models/small_island.glb"
            , transform =
                { position = Vector3 24 0 0
                , rotation = Euler 0 0 0 Euler.XYZ
                }
            , update =
                \record (GLTFModel island) ->
                    sin (record.elapsedTime * -0.0009)
                        |> flip Vector3.setY island.transform.position
                        |> flip Transform.setPosition island.transform
                        |> flip GLTFModel.setTransform (GLTFModel island)
            }
        , GLTFModel
            { url = "models/rock1.glb"
            , transform =
                { position = Vector3 20 0 0
                , rotation = Euler 0 0 0 Euler.XYZ
                }
            , update =
                \record (GLTFModel rock) ->
                    sin (1 + record.elapsedTime * 0.001)
                        |> flip Vector3.setY rock.transform.position
                        |> flip Transform.setPosition rock.transform
                        |> flip GLTFModel.setTransform (GLTFModel rock)
            }
        , GLTFModel
            { url = "models/rock2.glb"
            , transform =
                { position = Vector3 20 0 0
                , rotation = Euler 0 0 0 Euler.XYZ
                }
            , update =
                \record (GLTFModel rock) ->
                    sin (2 + record.elapsedTime * 0.001)
                        |> flip Vector3.setY rock.transform.position
                        |> flip Transform.setPosition rock.transform
                        |> flip GLTFModel.setTransform (GLTFModel rock)
            }
        , GLTFModel
            { url = "models/rock3.glb"
            , transform =
                { position = Vector3 20 0 0
                , rotation = Euler 0 0 0 Euler.XYZ
                }
            , update =
                \record (GLTFModel rock) ->
                    sin (3 + record.elapsedTime * 0.001)
                        |> flip Vector3.setY rock.transform.position
                        |> flip Transform.setPosition rock.transform
                        |> flip GLTFModel.setTransform (GLTFModel rock)
            }
        , GLTFModel
            { url = "models/guitar.glb"
            , transform =
                { position = Vector3 0 -30 0
                , rotation = Euler 1 0 1 Euler.XYZ
                }
            , update = always identity
            }
        ]
    }
