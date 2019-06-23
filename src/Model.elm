module Model exposing (Model, encodeModel, initialModel, inspectSceneForDebugging)

import Json.Encode exposing (..)
import Types.AnimationRecord exposing (..)
import Types.Camera exposing (..)
import Types.Color exposing (..)
import Types.Fog exposing (..)
import Types.GLTFModel exposing (..)
import Types.Light exposing (..)
import Types.Position exposing (..)


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
        , position = Position 0 20 50
        , lookAt = Position 0 0 0
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
            , position = Position 1 0.5 0
            , helperEnabled = inspectSceneForDebugging || False
            }
        ]
    , models =
        [ GLTFModel
            { url = "models/big_island.glb"
            , position = Position 20 0 0
            , update =
                \record (GLTFModel island) ->
                    GLTFModel
                        { island
                            | position =
                                { x = island.position.x
                                , y = cos (record.elapsedTime * -0.0005) * 0.75
                                , z = island.position.z
                                }
                        }
            }
        , GLTFModel
            { url = "models/small_island.glb"
            , position = Position 24 0 0
            , update =
                \record (GLTFModel island) ->
                    GLTFModel
                        { island
                            | position =
                                { x = island.position.x
                                , y = sin <| record.elapsedTime * -0.0009
                                , z = island.position.z
                                }
                        }
            }
        , GLTFModel
            { url = "models/rock1.glb"
            , position = Position 20 0 0
            , update =
                \record (GLTFModel rock) ->
                    GLTFModel
                        { rock
                            | position =
                                { x = rock.position.x
                                , y = sin <| 1 + record.elapsedTime * 0.001
                                , z = rock.position.z
                                }
                        }
            }
        , GLTFModel
            { url = "models/rock2.glb"
            , position = Position 20 0 0
            , update =
                \record (GLTFModel rock) ->
                    GLTFModel
                        { rock
                            | position =
                                { x = rock.position.x
                                , y = sin <| 2 + record.elapsedTime * 0.001
                                , z = rock.position.z
                                }
                        }
            }
        , GLTFModel
            { url = "models/rock3.glb"
            , position = Position 20 0 0
            , update =
                \record (GLTFModel rock) ->
                    GLTFModel
                        { rock
                            | position =
                                { x = rock.position.x
                                , y = sin <| 3 + record.elapsedTime * 0.001
                                , z = rock.position.z
                                }
                        }
            }
        ]
    }
