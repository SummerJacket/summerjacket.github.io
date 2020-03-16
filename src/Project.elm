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


view : Project -> Html msg
view project =
    div [ class "text-gray-800 bg-white shadow-xl rounded-lg md:flex" ]
        [ div [ class "relative h-32 md:h-auto md:w-2/5 overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none" ]
            [ img
                [ class "inline-block absolute object-cover w-full h-full"
                , Attrs.alt ""
                , Attrs.src ("%PUBLIC_URL%/" ++ project.image)
                ]
                []
            , div [ class "absolute w-full h-full bg-blue-500 opacity-25" ] []
            , svg
                [ SvgAttrs.class "hidden md:block absolute h-full right-0"
                , SvgAttrs.viewBox "0 0 100 1000"
                , SvgAttrs.fill "#ffffff"
                , style "margin-right" "-1px" -- background image "leaks" in firefox
                ]
                [ polygon [ SvgAttrs.points "100,0 100,1000 0,1000 98,0" ] [] ]
            ]
        , div [ class "p-8 md:pt-10 md:pb-12 md:w-3/5 flex flex-col" ]
            [ h3 [ class "font-bold text-2xl mb-2" ] [ text project.title ]
            , p [] [ text project.description ]
            , div [ class "mt-4 mb-5" ] <|
                List.map
                    (\tag ->
                        span [ class "inline-block p-1 px-3 mr-2 mb-3 rounded-full bg-gray-200 text-gray-700 font-bold text-sm" ]
                            [ text tag ]
                    )
                    project.tags
            , div [ class "mt-auto" ]
                [ case project.visit of
                    Just link ->
                        a
                            [ class "transition duration-200 px-6 py-2 bg-blue-700 hover:bg-blue-800 text-blue-100 font-bold rounded shadow mr-4 inline-flex items-center hover:shadow-lg focus:outline-none focus:shadow-outline"
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
                        a
                            [ class "transition duration-200 group px-6 py-2 bg-blue-100 text-blue-700 hover:text-blue-900 font-bold rounded inline-flex items-center shadow-sm hover:shadow focus:outline-none focus:shadow-outline"
                            , Attrs.href link
                            ]
                            [ text "Source"
                            , span
                                [ class "text-blue-600 group-hover:text-blue-800 ml-2 w-4"
                                , class "duration-200" -- to avoid "wave" effect
                                ]
                                [ Icons.github ]
                            ]

                    Nothing ->
                        text ""
                ]
            ]
        ]
