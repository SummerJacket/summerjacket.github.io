module Shapes exposing (circle, square, triangle, hexagon)

import Html exposing (Html)
import Svg exposing (..)
import Svg.Attributes exposing (..)


square : List (Attribute msg) -> Html msg
square attrs =
    svg (viewBox "0 0 100 100" :: fill "currentColor" :: attrs)
        [ polygon [ points "0,0 100,0 100,100 0,100" ] [] ]


triangle : List (Attribute msg) -> Html msg
triangle attrs =
    svg (viewBox "0 0 100 100" :: fill "currentColor" :: attrs)
        [ polygon [ points "50,15 100,100 0,100" ] [] ]


circle : List (Attribute msg) -> Html msg
circle attrs =
    svg (viewBox "0 0 100 100" :: fill "currentColor" :: attrs)
        [ Svg.circle [ cx "50", cy "50", r "50" ] [] ]


hexagon : List (Attribute msg) -> Html msg
hexagon attrs =
    svg (viewBox "0 0 300 300" :: fill "currentColor" :: attrs)
        [ polygon [ points "300,150 225,280 75,280 0,150 75,20 225,20" ] [] ]
