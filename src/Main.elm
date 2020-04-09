port module Main exposing (..)

import Browser
import Heroicons.Outline
import Heroicons.Solid
import Html exposing (..)
import Html.Attributes as Attrs exposing (class)
import Html.Events as Events
import Icons
import Json.Decode exposing (Value)
import Project exposing (Project)
import Shapes
import Svg exposing (polygon, svg)
import Svg.Attributes as SvgAttrs
import Yaml.Decode



---- PORTS ----


port easterEgg : (() -> msg) -> Sub msg



---- MODEL ----


type alias Flags =
    { projects : String
    , prefersDark : Bool
    }


decodeFlags : Json.Decode.Decoder Flags
decodeFlags =
    Json.Decode.map2 Flags
        (Json.Decode.field "projects" Json.Decode.string)
        (Json.Decode.field "prefersDark" Json.Decode.bool)


type alias Model =
    { projects : Result Yaml.Decode.Error (List Project)
    , easterEggEnabled : Bool
    , darkModeEnabled : Bool
    }


init : Value -> ( Model, Cmd Msg )
init flags =
    case Json.Decode.decodeValue decodeFlags flags of
        Ok data ->
            ( { projects = Yaml.Decode.fromString (Yaml.Decode.list Project.decoder) data.projects
              , easterEggEnabled = False
              , darkModeEnabled = data.prefersDark
              }
            , Cmd.none
            )

        Err _ ->
            ( { projects = Err <| Yaml.Decode.Decoding "Couldn't decode flags properly"
              , easterEggEnabled = False
              , darkModeEnabled = False
              }
            , Cmd.none
            )



---- UPDATE ----


type Msg
    = NoOp
    | ToggleEasterEgg
    | ToggleDarkMode


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        ToggleEasterEgg ->
            ( { model | easterEggEnabled = not model.easterEggEnabled }
            , Cmd.none
            )

        ToggleDarkMode ->
            ( { model | darkModeEnabled = not model.darkModeEnabled }
            , Cmd.none
            )



---- VIEW ----


sectionHeading : String -> Html msg
sectionHeading label =
    div []
        [ h2 [ class "dark:text-gray-300 font-bold text-5xl" ] [ text label ]
        , hr [ class "border-blue-500 dark:border-blue-600 border-4 inline-block w-32 ml-2 mb-4" ] []
        ]


viewLightOrDarkButton : Bool -> Html Msg
viewLightOrDarkButton darkModeEnabled =
    div [ class "absolute z-50 top-0 right-0 pt-6 pr-6" ]
        [ button
            [ class "bg-gray-800 dark:bg-gray-300 hover:bg-gray-900 dark-hover:bg-gray-100 text-blue-100 dark:text-gray-800 rounded-full p-1 shadow-md"
            , Events.onClick ToggleDarkMode
            ]
            [ (if darkModeEnabled then
                Heroicons.Outline.sun

               else
                Heroicons.Outline.moon
              )
                [ SvgAttrs.class "w-8 h-8" ]
            ]
        ]


viewShapes : { a | easterEggEnabled : Bool, darkModeEnabled : Bool } -> Html msg
viewShapes model =
    div
        [ class "absolute z-0 h-screen inset-x-0 text-gray-300 dark:text-gray-950"
        , Attrs.classList [ ( "hidden", model.easterEggEnabled ) ]
        ]
        [ div
            [ class "absolute z-50 w-8 sm:w-20 md:w-48 right-0 mt-12 opacity-50"
            , Attrs.style "background-image"
                (if model.darkModeEnabled then
                    "url(%PUBLIC_URL%/bg/700.png)"

                 else
                    "url(%PUBLIC_URL%/bg/500.png)"
                )
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


viewHeroContent : Html msg
viewHeroContent =
    div [ class "relative z-10 min-h-screen flex items-center justify-center" ]
        [ div [ class "flex flex-col items-center" ]
            [ h1 [ class "font-bold text-6xl text-center" ]
                [ text "Jason Liang" ]
            , p [ class "text-center text-gray-800 dark:text-gray-400" ]
                [ text "I like to create web applications" ]
            , div
                [ class "text-gray-700 dark:text-gray-500 mt-8"
                , Attrs.style "width" "20em"
                ]
                (List.map
                    (\( label, to, icon ) ->
                        a
                            [ class "transition-colors duration-200 group flex items-center mx-2 relative p-2 px-4 hover:text-gray-900 dark-hover:text-gray-300"
                            , Attrs.href to
                            ]
                            [ span [ class "z-10 w-6 h-6 mr-2" ] [ icon ]
                            , span [ class "z-10" ] [ text label ]
                            , div [ class "rounded z-0 transition-all duration-200 absolute bg-gray-400 dark:bg-gray-750 opacity-0 group-hover:opacity-50 inset-x-0 h-0 group-hover:h-full" ] []
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


viewProjects : Result a (List Project) -> Html msg
viewProjects res =
    div [ class "relative z-10 mb-24 container mx-auto px-4 lg:px-24 xl:px-4" ]
        [ case res of
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
                        , strong [] [ text "Tell the developer!" ]
                        ]
                    ]
        ]


view : Model -> Html Msg
view model =
    div [ Attrs.classList [ ( "mode-dark", model.darkModeEnabled ) ] ]
        [ div
            (class "relative overflow-x-hidden bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-gray-300"
                :: (if model.easterEggEnabled then
                        [ class "rainbow"
                        , Attrs.style "background-image"
                            "url(%PUBLIC_URL%/images/nezuko.gif)"
                        ]

                    else
                        []
                   )
            )
            [ viewLightOrDarkButton model.darkModeEnabled
            , viewShapes model
            , viewHeroContent
            , viewProjects model.projects
            , div
                [ class "absolute z-0 bottom-0 ml-2 h-32 opacity-50"
                , Attrs.style "background-image"
                    (if model.darkModeEnabled then
                        "url(%PUBLIC_URL%/bg/700.png)"

                     else
                        "url(%PUBLIC_URL%/bg/500.png)"
                    )
                , Attrs.style "width" "20em"
                ]
                []
            ]
        ]



---- SUBSCRIPTIONS ----


subscriptions : Model -> Sub Msg
subscriptions model =
    easterEgg (always ToggleEasterEgg)



---- PROGRAM ----


main : Program Value Model Msg
main =
    Browser.element
        { view = view
        , init = init
        , update = update
        , subscriptions = subscriptions
        }
