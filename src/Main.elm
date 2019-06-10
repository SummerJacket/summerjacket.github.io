module Main exposing (Model, Msg(..), init, main, update, view)

import Browser
import Html exposing (Html, div, h1, h2, img, main_, text)
import Html.Attributes exposing (class, src)



---- MODEL ----


type alias Model =
    {}


init : ( Model, Cmd Msg )
init =
    ( {}, Cmd.none )



---- UPDATE ----


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )



---- VIEW ----


view : Model -> Html Msg
view model =
    div []
        [ mainPageContent
        ]


mainPageContent : Html Msg
mainPageContent =
    main_ []
        [ h1 [] [ text "I'm Jason Liang" ]
        , h2 [] [ text "This site is under construction. " ]
        , h2 []
            [ text "Say hi!"
            , div [ class "email" ] [ text "jasonliang512@gmail.com" ]
            ]
        ]



---- PROGRAM ----


main : Program () Model Msg
main =
    Browser.element
        { view = view
        , init = \_ -> init
        , update = update
        , subscriptions = always Sub.none
        }
