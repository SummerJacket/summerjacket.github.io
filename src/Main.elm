port module Main exposing (Model, Msg(..), init, main, update, view)

import Browser
import Color exposing (Color)
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as D exposing (..)
import Json.Encode as E exposing (..)
import List
import Types.Camera exposing (..)
import Types.Fog exposing (..)
import Types.Position exposing (..)
import Types.Scene exposing (..)


type alias Value =
    E.Value



---- THREE ----


port threeOut : Value -> Cmd a


port threeIn : (Value -> a) -> Sub a



---- MODEL ----


type alias Model =
    { gammaInput : Bool
    , gammaOutput : Bool
    , gammaFactor : Float
    , shadowMapEnabled : Bool
    , antialias : Bool
    }


encodeModel : Model -> Value
encodeModel model =
    E.object
        [ ( "gammaInput", E.bool model.gammaInput )
        , ( "gammaOutput", E.bool model.gammaOutput )
        , ( "gammaFactor", E.float model.gammaFactor )
        , ( "shadowMapEnabled", E.bool model.shadowMapEnabled )
        , ( "antialias", E.bool model.antialias )
        ]

decodeModel : Decoder Model
decodeModel =
    map5 Model
        (field "gammaInput" D.bool)
        (field "gammaOutput" D.bool)
        (field "gammaFactor" D.float)
        (field "shadowMapEnabled" D.bool)
        (field "antialias" D.bool)

initialModel : Model
initialModel =
    let
        backgroundColor =
            Color.fromHSL ( 0.6, 0, 1 )
    in
    { gammaInput = True
    , gammaOutput = True
    , gammaFactor = 2.2
    , shadowMapEnabled = True
    , antialias = False
    -- , scene =
    --     { background = backgroundColor
    --     , fog =
    --         { color = backgroundColor
    --         , near = 1
    --         , far = 3000
    --         }
    --     }
    --
    }


init : ( Model, Cmd Msg )
init =
    ( initialModel, threeOut <| encodeModel initialModel )



---- UPDATE ----


type Msg
    = FrameUpdate Model
    | DataInError Error
    | NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FrameUpdate newModel ->
            ( newModel, threeOut <| encodeModel newModel )

        DataInError err ->
            -- what the heck do I do???
            ( model, Cmd.none )

        NoOp ->
            ( model, Cmd.none )



---- SUBSCRIPTIONS ----


subscriptions : Model -> Sub Msg
subscriptions model =
    threeIn handleThreeIn


handleThreeIn : Value -> Msg
handleThreeIn json =
    case decodeValue decodeModel json of
        Ok model ->
            FrameUpdate model

        Err msg ->
            DataInError msg



---- VIEW ----


heading : String -> Html Msg
heading content =
    h1 [ class "display-1 font-bold" ] [ text content ]


view : Model -> Html Msg
view model =
    let
        containerHidden =
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


main : Program () Model Msg
main =
    Browser.element
        { view = view
        , init = \_ -> init
        , update = update
        , subscriptions = subscriptions
        -- , subscriptions = always Sub.none
        }
