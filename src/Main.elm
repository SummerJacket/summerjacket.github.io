module Main exposing (Model, Msg(..), init, main, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import List



---- FLAGS ----


type alias Flags =
    { camControlsEnabled : Bool }



---- MODEL ----


type alias Model =
    { camControlsEnabled : Bool }


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Model flags.camControlsEnabled, Cmd.none )



---- UPDATE ----


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )



---- VIEW ----


heading : String -> Html Msg
heading content =
    h1 [ class "display-1 font-bold" ] [ text content ]


view : Model -> Html Msg
view model =
    let
        containerHidden =
            if model.camControlsEnabled then
                " hidden"

            else
                ""
    in
    div [ class ("container mx-auto" ++ containerHidden) ]
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


main : Program Flags Model Msg
main =
    Browser.element
        { view = view
        , init = init
        , update = update
        , subscriptions = always Sub.none
        }
