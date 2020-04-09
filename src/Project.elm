module Project exposing (Project, decoder, view)

import Heroicons.Solid
import Html exposing (..)
import Html.Attributes as Attrs exposing (class, style)
import Icons
import Svg exposing (polygon, svg)
import Svg.Attributes as SvgAttrs
import Yaml.Decode as Decode exposing (Decoder)


type alias Project =
    { title : String
    , description : String
    , visit : Maybe String
    , source : Maybe String
    , tags : List String
    , image : String
    }


decoder : Decoder Project
decoder =
    Decode.map6 Project
        (Decode.field "title" Decode.string)
        (Decode.field "description" Decode.string)
        (Decode.field "visit" <| Decode.nullable Decode.string)
        (Decode.field "source" <| Decode.nullable Decode.string)
        (Decode.field "tags" <| Decode.list Decode.string)
        (Decode.field "image" Decode.string)


buttonLink : List (Attribute msg) -> List (Html msg) -> Html msg
buttonLink attrs =
    a
        (class "transition duration-200 px-6 py-2 font-bold rounded inline-flex items-center focus:outline-none focus:shadow-outline"
            :: attrs
        )


view : Project -> Html msg
view project =
    div [ class "text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-850 shadow-xl rounded-lg sm:flex" ]
        [ div [ class "relative h-48 sm:h-auto sm:w-2/5 overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none" ]
            [ img
                [ class "inline-block absolute object-cover w-full h-full"
                , Attrs.alt ""
                , Attrs.src ("%PUBLIC_URL%/" ++ project.image)
                ]
                []
            , div [ class "absolute w-full h-full bg-blue-500 opacity-25" ] []
            , svg
                [ SvgAttrs.class "hidden sm:block absolute h-full right-0 text-white dark:text-gray-850"
                , SvgAttrs.viewBox "0 0 100 1000"
                , SvgAttrs.fill "currentColor"
                , style "margin-right" "-1px" -- background image "leaks" in firefox
                ]
                [ polygon [ SvgAttrs.points "100,0 100,1000 0,1000 98,0" ] [] ]
            ]
        , div [ class "p-8 sm:pt-10 sm:pb-12 sm:w-3/5 flex flex-col" ]
            [ h3 [ class "font-bold text-2xl mb-2" ] [ text project.title ]
            , p [] [ text project.description ]
            , div [ class "mt-4 mb-5" ] <|
                List.map
                    (\tag ->
                        span [ class "inline-block p-1 px-3 mr-2 mb-3 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 font-bold text-sm" ]
                            [ text tag ]
                    )
                    project.tags
            , div [ class "mt-auto" ]
                [ case project.visit of
                    Just link ->
                        buttonLink
                            [ class "bg-blue-700 hover:bg-blue-750 dark:bg-blue-750 dark-hover:bg-blue-700 text-blue-100 shadow hover:shadow-lg dark-hover:shadow-md mr-4"
                            , Attrs.href link
                            ]
                            [ text "Visit"
                            , Heroicons.Solid.externalLink
                                [ SvgAttrs.class "text-blue-200 ml-1 w-5" ]
                            ]

                    Nothing ->
                        text ""
                , case project.source of
                    Just link ->
                        buttonLink
                            [ class "group bg-blue-100 dark:bg-gray-750 text-blue-700 dark:text-gray-400 hover:text-blue-900 dark-hover:text-gray-100 shadow-sm hover:shadow dark-hover:shadow-lg"
                            , Attrs.href link
                            ]
                            [ text "Source"
                            , span
                                [ class "text-blue-600 dark:text-gray-500 group-hover:text-blue-800 dark-group-hover:text-gray-200 ml-2 w-4"

                                -- to avoid "wave" effect when hovering
                                , class "duration-200"
                                ]
                                [ Icons.github ]
                            ]

                    Nothing ->
                        text ""
                ]
            ]
        ]
