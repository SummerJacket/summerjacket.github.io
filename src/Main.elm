port module Main exposing (Model, Msg(..), init, main, subscriptions, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as D exposing (..)
import Json.Encode as E exposing (..)
import Types.Camera exposing (..)
import Types.Color exposing (..)
import Types.Fog exposing (..)
import Types.GLTFModel exposing (..)
import Types.Light exposing (..)
import Types.Position exposing (..)
import Types.Scene exposing (..)


type alias Value =
    E.Value



---- PORTS ----


port threeOut : ( String, Value ) -> Cmd a


port threeIn : (Value -> a) -> Sub a



---- MODEL ----


type alias Model =
    { tick : Int
    , gammaInput : Bool
    , gammaOutput : Bool
    , gammaFactor : Float
    , shadowMapEnabled : Bool
    , antialias : Bool
    , scene : Scene
    , camera : Camera
    , lights : List Light
    , models : List GLTFModel
    }


encodeModel : Model -> Value
encodeModel model =
    E.object
        [ ( "tick", E.int model.tick )
        , ( "gammaInput", E.bool model.gammaInput )
        , ( "gammaOutput", E.bool model.gammaOutput )
        , ( "gammaFactor", E.float model.gammaFactor )
        , ( "shadowMapEnabled", E.bool model.shadowMapEnabled )
        , ( "antialias", E.bool model.antialias )
        , ( "scene", encodeScene model.scene )
        , ( "camera", encodeCamera model.camera )
        , ( "lights", E.list encodeLight model.lights )
        , ( "models", E.list encodeGLTFModel model.models )
        ]


initialModel : Model
initialModel =
    let
        backgroundColor =
            fromHSL ( 0.6, 0, 1 )
    in
    { tick = 0
    , gammaInput = True
    , gammaOutput = True
    , gammaFactor = 2.2
    , shadowMapEnabled = True
    , antialias = False
    , scene =
        { background = backgroundColor
        , fog = Fog backgroundColor 1 3000
        }
    , camera =
        { fov = 45
        , near = 1
        , far = 1000
        , position = Position 2 0 50
        , controlsEnabled = False
        , screenSpacePanning = True
        }
    , lights =
        [ HemisphereLight
            { skyColor = fromHSL ( 0.6, 0.9, 0.75 )
            , groundColor = fromHSL ( 0.05, 1, 0.1 )
            , intensity = 0.8
            , helperEnabled = False
            }
        , DirectionalLight
            { color = fromHSL ( 0.1, 1, 0.95 )
            , intensity = 1
            , position = Position 1 0.5 0
            , helperEnabled = False
            }
        ]
    , models =
        [ GLTFModel
            { url = "models/big_island.glb"
            , position = Position 20 0 0
            , update =
                \tick (GLTFModel island) ->
                    GLTFModel
                        { island
                            | position =
                                { x = island.position.x
                                , y = sin (toFloat tick * -0.005) * 0.75
                                , z = island.position.z
                                }
                        }
            }
        ]
    }


init : ( Model, Cmd Msg )
init =
    ( initialModel, threeOut ( "INIT", encodeModel initialModel ) )



---- UPDATE ----


type Msg
    = FrameUpdate
    | NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FrameUpdate ->
            let
                updatedGLTFModels =
                    List.map (gltfUpdate model.tick) model.models

                updatedModel =
                    { model | tick = model.tick + 1, models = updatedGLTFModels }
            in
            ( updatedModel, threeOut ( "UPDATE", encodeModel updatedModel ) )

        NoOp ->
            ( model, Cmd.none )



---- SUBSCRIPTIONS ----


subscriptions : Model -> Sub Msg
subscriptions model =
    threeIn (always FrameUpdate)



---- VIEW ----


heading : String -> Html Msg
heading content =
    h1 [ class "display-1 font-bold" ] [ text content ]


view : Model -> Html Msg
view model =
    let
        containerHidden =
            if model.camera.controlsEnabled then
                "hidden"

            else
                ""
    in
    div [ class ("container mx-auto " ++ containerHidden) ]
        [ hero
        , div [ class "-mt-32" ] []
        , about
        , projects
        , contact
        , div [ class "mb-24" ] []
        ]


hero : Html Msg
hero =
    let
        divider =
            div [ class "ml-4 mt-10 mb-6 w-16 h-1 bg-black" ] []

        styledLi x =
            li [ class "leading-loose" ] [ text x ]
    in
    div [ class "flex flex-col justify-center h-screen ml-24" ]
        [ h1 [ class "text-6xl font-bold" ] [ text "I'm Jason Liang" ]
        , divider
        , ul [ class "ml-2" ] <|
            List.map styledLi <|
                [ "Student"
                , "Web Developer"
                , "Functional Programming Enthusiast"
                , "Guitarist"
                , "3D Artist"
                , "😎😎😎 Epic Gamer 😎😎😎"
                ]
        , div [ class "my-8" ] []
        ]


about : Html Msg
about =
    div []
        [ heading "About Me"
        , p [] [ text "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis quam placerat, condimentum orci ac, aliquet erat. Morbi turpis ante, hendrerit ut tristique et, mollis dapibus lorem. Quisque porta elit elit. In egestas est a arcu luctus fermentum. Nam dignissim, neque ut facilisis vestibulum, tellus eros lobortis elit, ut convallis neque urna sed diam. Aliquam eget semper nulla, vitae tincidunt eros. Mauris convallis fringilla nunc, a rutrum dui fermentum lacinia. Donec dapibus risus nisi, vitae tincidunt libero dignissim imperdiet. Donec at fringilla lectus. Aliquam consectetur lectus quis nisl volutpat, sit amet sollicitudin nisl vulputate. Vivamus porttitor lacus eget velit commodo consequat. Nulla in aliquet ante." ]
        ]


projects : Html Msg
projects =
    div []
        [ heading "Projects"
        ]


contact : Html Msg
contact =
    div []
        [ heading "Say Hi"
        , a
            [ class "text-xl text-blue-700 hover:underline"
            , href "mailto:jasonliang512@gmail.com"
            ]
            [ text "jasonliang512@gmail.com" ]
        ]



---- PROGRAM ----


main : Program () Model Msg
main =
    Browser.element
        { view = view
        , init = \_ -> init
        , update = update
        , subscriptions = subscriptions
        }
