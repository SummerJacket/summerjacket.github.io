module Main exposing (..)

import Browser
import Heroicons.Outline
import Heroicons.Solid
import Html exposing (..)
import Html.Attributes as Attrs exposing (class)
import Icons
import Project exposing (Project)
import Svg exposing (polygon, svg)
import Svg.Attributes as SvgAttrs
import Yaml.Decode as Decode exposing (Decoder)



---- MODEL ----


type alias Model =
    { projects : Result Decode.Error (List Project) }


init : String -> ( Model, Cmd Msg )
init data =
    ( { projects = Decode.fromString (Decode.list Project.decoder) data }
    , Cmd.none
    )



---- UPDATE ----


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )



---- VIEW ----


contactLink : ( String, String, Html msg ) -> Html msg
contactLink ( label, to, icon ) =
    a
        [ class "transition-colors duration-200 group flex items-center mx-2 relative p-2 px-4 hover:text-gray-900"
        , Attrs.href to
        ]
        [ span [ class "z-10 w-6 h-6 mr-2" ] [ icon ]
        , span [ class "z-10" ] [ text label ]
        , div [ class "rounded z-0 transition-all duration-200 absolute bg-gray-300 inset-x-0 h-0 group-hover:h-full" ] []
        ]


sectionHeading : String -> Html msg
sectionHeading label =
    div []
        [ h2 [ class "font-bold text-5xl" ] [ text label ]
        , hr [ class "border-blue-500 border-4 inline-block w-32 ml-2 mb-4" ] []
        ]


view : Model -> Html Msg
view model =
    div [ class "text-gray-900" ]
        [ div [ class "min-h-screen flex items-center justify-center" ]
            [ div []
                [ h1 [ class "font-bold text-6xl text-center" ]
                    [ text "Jason Liang" ]
                , p [ class "text-center text-gray-800" ]
                    [ text "I like making web applications" ]
                , div [ class "text-gray-700 mt-8" ]
                    (List.map contactLink
                        [ ( "jasonliang512@gmail.com"
                          , "mailto:jasonliang512@gmail.com"
                          , Heroicons.Solid.mail []
                          )
                        , ( "jasonliang512"
                          , "https://github.com/jasonliang512"
                          , Icons.github
                          )
                        ]
                    )
                ]
            ]
        , div [ class "mb-24" ]
            [ case model.projects of
                Ok projects ->
                    div [ class "-mt-10 container mx-auto px-4 lg:px-24 xl:px-0" ]
                        [ sectionHeading "Projects"
                        , div [ class "grid xl:grid-cols-2 col-gap-8 row-gap-10" ]
                            (List.map Project.view projects)
                        ]

                Err _ ->
                    div [ class "md:w-3/5 mx-auto p-8 bg-white rounded-lg shadow-md text-center" ]
                        [ h1 [ class "text-4xl font-bold" ]
                            [ text "Something went wrong!" ]
                        , p [ class "mt-2 mb-8" ]
                            [ text "There's supposed to be a list of projects here, but an error occurred!" ]
                        , a
                            [ class "bg-blue-600 px-6 p-2 rounded text-blue-100 text-lg inline-flex items-center shadow hover:bg-blue-700 hover:shadow-md transition duration-200"
                            , Attrs.href "mailto:jasonliang512@gmail.com"
                            ]
                            [ Heroicons.Outline.mail [ SvgAttrs.class "w-8 mr-2" ]
                            , text "Tell the developer!"
                            ]
                        ]
            ]
        ]



---- PROGRAM ----


main : Program String Model Msg
main =
    Browser.element
        { view = view
        , init = init
        , update = update
        , subscriptions = always Sub.none
        }
