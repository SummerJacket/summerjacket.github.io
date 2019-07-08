port module Main exposing (main)

import Browser
import Html exposing (Html)
import Html.Attributes as Attr
import Json.Decode as Decode exposing (Decoder)
import Json.Encode exposing (Value)
import Model exposing (Model)
import Types.AnimationRecord exposing (AnimationRecord)
import Types.Camera as Camera exposing (Camera)
import Types.Euler as Euler exposing (Euler)
import Types.GLTFModel as GLTFModel
import Types.Transform as Transform
import Types.Vector2 as Vector2 exposing (Vector2)
import Types.Vector3 as Vector3 exposing (Vector3)
import Utility exposing (flip)



---- PORTS ----


port threeOut : ( String, Value ) -> Cmd a


port threeIn : (Value -> a) -> Sub a


type alias ThreeIn =
    { deltaTime : Float
    , scrollTop : Float
    , mouse : Vector2
    , width : Int
    , height : Int
    }


decodeThreeIn : Decoder ThreeIn
decodeThreeIn =
    Decode.map5 ThreeIn
        (Decode.field "deltaTime" Decode.float)
        (Decode.field "scrollTop" Decode.float)
        (Decode.field "mouse" Vector2.decodeVector2)
        (Decode.field "width" Decode.int)
        (Decode.field "height" Decode.int)



---- MODEL ----


init : ( Model, Cmd Msg )
init =
    ( Model.initialModel
    , threeOut ( "INIT", Model.encodeModel Model.initialModel )
    )



---- UPDATE ----


type Msg
    = FrameUpdate AnimationRecord
    | NoOp


updateCameraPosition : AnimationRecord -> Vector3 -> Vector3
updateCameraPosition animationRecord cameraPos =
    let
        desiredY =
            20 - animationRecord.scrollTop * 0.07
    in
    cameraPos
        |> Vector3.setY (cameraPos.y + (desiredY - cameraPos.y) * 0.45)


updateCameraRotation : AnimationRecord -> Euler -> Euler
updateCameraRotation animationRecord cameraRot =
    -- mouse x and mouse y are swapped?
    -- or is it that my iq is too low to understand 3d?
    let
        sensitivity =
            0.0001

        desiredX =
            let
                mid =
                    toFloat animationRecord.height / 2
            in
            (mid - animationRecord.mouse.y) * sensitivity - 0.35

        desiredY =
            let
                mid =
                    toFloat animationRecord.width / 2
            in
            (mid - animationRecord.mouse.x) * sensitivity
    in
    cameraRot
        |> Euler.setX (cameraRot.x + (desiredX - cameraRot.x) * 0.05)
        |> Euler.setY (cameraRot.y + (desiredY - cameraRot.y) * 0.05)


updateCamera : AnimationRecord -> Camera -> Camera
updateCamera animationRecord camera =
    let
        camT =
            camera.transform

        updatedCameraPosition =
            updateCameraPosition animationRecord camT.position

        updatedCameraRotation =
            updateCameraRotation animationRecord camT.rotation
    in
    camera.transform
        |> Transform.setPosition updatedCameraPosition
        |> Transform.setRotation updatedCameraRotation
        |> flip Camera.setTransform camera


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FrameUpdate animationRecord ->
            let
                updatedCamera =
                    updateCamera animationRecord model.camera

                updatedGLTFModels =
                    List.map (GLTFModel.gltfUpdate animationRecord) model.models

                updatedModel =
                    { model
                        | animationRecord = animationRecord
                        , camera = updatedCamera
                        , models = updatedGLTFModels
                    }
            in
            ( updatedModel
            , threeOut ( "UPDATE", Model.encodeModel updatedModel )
            )

        NoOp ->
            ( model, Cmd.none )



---- SUBSCRIPTIONS ----


subscriptions : Model -> Sub Msg
subscriptions model =
    threeIn <| handleThreeIn model


handleThreeIn : Model -> Value -> Msg
handleThreeIn model value =
    FrameUpdate <|
        case Decode.decodeValue decodeThreeIn value of
            Ok res ->
                { elapsedTime = model.animationRecord.elapsedTime + res.deltaTime
                , deltaTime = res.deltaTime
                , scrollTop = res.scrollTop
                , mouse =
                    { x = res.mouse.x
                    , y = res.mouse.y
                    }
                , width = res.width
                , height = res.height
                }

            Err err ->
                Debug.todo <| Debug.toString err



---- VIEW ----


heading : String -> Html Msg
heading content =
    Html.h1 [ Attr.class "display-1 font-bold" ] [ Html.text content ]


view : Model -> Html Msg
view model =
    let
        containerHidden =
            if model.camera.controlsEnabled then
                "hidden"

            else
                ""
    in
    Html.div [ Attr.class ("container mx-auto " ++ containerHidden) ]
        [ hero
        , Html.div [ Attr.class "-mt-32" ] []
        , about
        , projects
        , contact
        , Html.div [ Attr.class "mb-24" ] []
        ]


hero : Html Msg
hero =
    let
        divider =
            Html.div [ Attr.class "ml-4 mt-10 mb-6 w-16 h-1 bg-black" ] []

        styledLi x =
            Html.li [ Attr.class "leading-loose" ] [ Html.text x ]
    in
    Html.div [ Attr.class "flex flex-col justify-center h-screen ml-24" ]
        [ Html.h1 [ Attr.class "text-6xl font-bold" ] [ Html.text "I'm Jason Liang" ]
        , divider
        , Html.ul [ Attr.class "ml-2" ] <|
            List.map styledLi <|
                [ "Student"
                , "Web Developer"
                , "Functional Programming Enthusiast"
                , "Guitarist"
                , "3D Artist"
                , "😎😎😎 Epic Gamer 😎😎😎"
                ]
        , Html.div [ Attr.class "my-8" ] []
        ]


about : Html Msg
about =
    Html.div []
        [ heading "About Me"
        , Html.p [] [ Html.text "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis quam placerat, condimentum orci ac, aliquet erat. Morbi turpis ante, hendrerit ut tristique et, mollis dapibus lorem. Quisque porta elit elit. In egestas est a arcu luctus fermentum. Nam dignissim, neque ut facilisis vestibulum, tellus eros lobortis elit, ut convallis neque urna sed diam. Aliquam eget semper nulla, vitae tincidunt eros. Mauris convallis fringilla nunc, a rutrum dui fermentum lacinia. Donec dapibus risus nisi, vitae tincidunt libero dignissim imperdiet. Donec at fringilla lectus. Aliquam consectetur lectus quis nisl volutpat, sit amet sollicitudin nisl vulputate. Vivamus porttitor lacus eget velit commodo consequat. Nulla in aliquet ante." ]
        ]


projects : Html Msg
projects =
    Html.div []
        [ heading "Projects"
        ]


contact : Html Msg
contact =
    Html.div []
        [ heading "Say Hi"
        , Html.a
            [ Attr.class "text-xl text-blue-700 hover:underline"
            , Attr.href "mailto:jasonliang512@gmail.com"
            ]
            [ Html.text "jasonliang512@gmail.com" ]
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
