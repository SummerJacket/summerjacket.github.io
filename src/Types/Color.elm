module Types.Color exposing (Color, Value, decodeColor, encodeColor, fromHSL, fromRGB, white)

import Json.Decode as D exposing (..)
import Json.Encode as E exposing (..)


type alias Value =
    E.Value


type alias Color =
    Int


encodeColor : Color -> Value
encodeColor =
    E.int


decodeColor : Decoder Color
decodeColor =
    D.int


fromRGB : ( Int, Int, Int ) -> Color
fromRGB ( r, g, b ) =
    r * (256 ^ 2) + g * (256 ^ 1) + b


{-| <https://stackoverflow.com/a/9493060>
TODO: fix this.
-}
fromHSL : ( Float, Float, Float ) -> Color
fromHSL ( h, s, l ) =
    if abs s < 0.001 then
        let
            lightness =
                round (l * 256)
        in
        fromRGB ( lightness, lightness, lightness )

    else
        let
            hueToRGB ( p, q, t ) =
                if t < 0 then
                    hueToRGB ( p, q, t + 1 )

                else if t > 1 then
                    hueToRGB ( p, q, t - 1 )

                else if t < 1 / 6 then
                    p + (q - p) * 6 * t

                else if t < 1 / 2 then
                    q

                else if t < 2 / 3 then
                    p + (q - p) * (2 / 3 - t) * 6

                else
                    p

            qq =
                if l < 1 / 2 then
                    l * (1 + s)

                else
                    l + s - l * s

            pp =
                2 * l - qq

            r =
                hueToRGB ( pp, qq, h + 1 / 3 )

            g =
                hueToRGB ( pp, qq, h )

            b =
                hueToRGB ( pp, qq, h - 1 / 3 )
        in
        fromRGB ( round r, round g, round b )


white : Color
white =
    0x00FFFFFF
