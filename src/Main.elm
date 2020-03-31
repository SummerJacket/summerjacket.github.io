port module Main exposing (..)

import Browser
import Heroicons.Outline
import Heroicons.Solid
import Html exposing (..)
import Html.Attributes as Attrs exposing (class)
import Icons
import Project exposing (Project)
import Shapes
import Svg exposing (polygon, svg)
import Svg.Attributes as SvgAttrs
import Yaml.Decode as Decode exposing (Decoder)



---- PORTS ----


port easterEgg : (() -> msg) -> Sub msg



---- MODEL ----


type alias Model =
    { projects : Result Decode.Error (List Project)
    , easterEggEnabled : Bool
    }


init : String -> ( Model, Cmd Msg )
init data =
    ( { projects = Decode.fromString (Decode.list Project.decoder) data
      , easterEggEnabled = False
      }
    , Cmd.none
    )



---- UPDATE ----


type Msg
    = NoOp
    | ToggleEasterEgg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        ToggleEasterEgg ->
            ( { model | easterEggEnabled = not model.easterEggEnabled }
            , Cmd.none
            )



---- VIEW ----


sectionHeading : String -> Html msg
sectionHeading label =
    div []
        [ h2 [ class "font-bold text-5xl" ] [ text label ]
        , hr [ class "border-blue-500 border-4 inline-block w-32 ml-2 mb-4" ] []
        ]


view : Model -> Html Msg
view model =
    div
        (class "relative overflow-x-hidden"
            :: (if model.easterEggEnabled then
                    [ class "rainbow"
                    , Attrs.style "background-image"
                        "url(%PUBLIC_URL%/images/nezuko.gif)"
                    ]

                else
                    [ class "text-gray-900" ]
               )
        )
        [ div
            [ class "absolute z-0 h-screen inset-x-0 text-gray-300"
            , Attrs.classList [ ( "hidden", model.easterEggEnabled ) ]
            ]
            [ div
                [ class "absolute z-50 w-8 sm:w-20 md:w-48 right-0 mt-12 opacity-50"
                , Attrs.style "background-image" "url(%PUBLIC_URL%/bg/500.png)"
                , Attrs.style "height" "30em"
                ]
                []
            , div [ class "absolute right-0" ]
                [ Shapes.circle [ SvgAttrs.class "inline-block w-64 h-64 -mt-16 -mr-32" ] ]
            , div [ class "absolute right-0 bottom-0 hidden sm:block" ]
                [ Shapes.square [ SvgAttrs.class "inline-block w-48 md:w-64 h-64 -mb-2" ] ]
            , div [ class "absolute left-0 transform rotate-45" ]
                [ Shapes.triangle [ SvgAttrs.class "inline-block w-64 h-64 mt-32 -ml-10" ] ]
            , div [ class "absolute left-0 bottom-0" ]
                [ Shapes.hexagon
                    [ SvgAttrs.class "inline-block -mb-32 ml-8 md:ml-32 lg:ml-64"
                    , Attrs.style "width" "18em"
                    ]
                ]
            ]
        , div [ class "relative z-10 min-h-screen flex items-center justify-center" ]
            [ div [ class "flex flex-col items-center" ]
                [ h1 [ class "font-bold text-6xl text-center" ]
                    [ text "Jason Liang" ]
                , p [ class "text-center text-gray-800" ]
                    [ text "I like to create web applications" ]
                , div
                    [ class "text-gray-700 mt-8"
                    , Attrs.style "width" "20em"
                    ]
                    (List.map
                        (\( label, to, icon ) ->
                            a
                                [ class "transition-colors duration-200 group flex items-center mx-2 relative p-2 px-4 hover:text-gray-900"
                                , Attrs.href to
                                ]
                                [ span [ class "z-10 w-6 h-6 mr-2" ] [ icon ]
                                , span [ class "z-10" ] [ text label ]
                                , div [ class "rounded z-0 transition-all duration-200 absolute bg-gray-400 opacity-0 group-hover:opacity-50 inset-x-0 h-0 group-hover:h-full" ] []
                                ]
                        )
                        [ ( "jasonliang512@gmail.com"
                          , "mailto:jasonliang512@gmail.com"
                          , Heroicons.Solid.mail []
                          )
                        , ( "GitHub"
                          , "https://github.com/jasonliang512"
                          , Icons.github
                          )
                        ]
                    )
                ]
            ]
        , div [ class "relative z-10 mb-24 container mx-auto px-4 px-4 lg:px-24 xl:px-0" ]
            [ case model.projects of
                Ok projects ->
                    div [ class "-mt-10" ]
                        [ sectionHeading "Projects"
                        , div [ class "grid xl:grid-cols-2 col-gap-8 row-gap-10" ]
                            (List.map Project.view projects)
                        ]

                Err _ ->
                    div [ class "max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md text-center" ]
                        [ h1 [ class "text-4xl font-bold" ]
                            [ text "Something went wrong!" ]
                        , p [ class "mt-2 mb-8" ]
                            [ text "There's supposed to be a list of projects here, but an error occurred!" ]
                        , a
                            [ class "bg-blue-600 px-6 p-2 rounded text-blue-100 text-lg inline-flex items-center shadow hover:bg-blue-700 hover:shadow-md transition duration-200"
                            , Attrs.href "mailto:jasonliang512@gmail.com"
                            ]
                            [ Heroicons.Outline.mail [ SvgAttrs.class "w-8 mr-2" ]
                            , strong [] [ text "Tell the developer!"]
                            ]
                        ]
            ]
        , div
            [ class "absolute z-0 bottom-0 ml-2 h-32 opacity-50"
            , Attrs.style "background-image" "url(%PUBLIC_URL%/bg/500.png)"
            , Attrs.style "width" "20em"
            ]
            []
        ]



---- SUBSCRIPTIONS ----


subscriptions : Model -> Sub Msg
subscriptions model =
    easterEgg (always ToggleEasterEgg)



---- PROGRAM ----


main : Program String Model Msg
main =
    Browser.element
        { view = view
        , init = init
        , update = update
        , subscriptions = subscriptions
        }
