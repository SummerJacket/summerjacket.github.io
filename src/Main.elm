port module Main exposing (main)

import Browser
import Browser.Dom exposing (..)
import Browser.Events exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Encode exposing (..)
import Model exposing (..)
import Task exposing (..)
import Types.AnimationRecord exposing (..)
import Types.GLTFModel exposing (..)



---- PORTS ----


port threeOut : ( String, Value ) -> Cmd a



---- MODEL ----


init : ( Model, Cmd Msg )
init =
    ( initialModel, threeOut ( "INIT", encodeModel initialModel ) )



---- UPDATE ----


type Msg
    = FrameUpdate AnimationRecord
    | NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FrameUpdate animationRecord ->
            let
                updatedGLTFModels =
                    List.map (gltfUpdate model.animationRecord) model.models

                updatedModel =
                    { model
                        | animationRecord = animationRecord
                        , models = updatedGLTFModels
                    }
            in
            ( updatedModel, threeOut ( "UPDATE", encodeModel updatedModel ) )

        NoOp ->
            ( model, Cmd.none )



---- SUBSCRIPTIONS ----


subscriptions : Model -> Sub Msg
subscriptions model =
    onAnimationFrameDelta
        (\deltaTime ->
            FrameUpdate
                { elapsedTime = model.animationRecord.elapsedTime + deltaTime
                , deltaTime = deltaTime
                , scrollTop = 0
                }
        )



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
