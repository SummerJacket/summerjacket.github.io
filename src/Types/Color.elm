module Types.Color exposing (Color, decodeColor, encodeColor, fromHSL, fromRGB)

import Json.Decode as Decode exposing (..)
import Json.Encode as Encode exposing (..)


type alias Value =
    Encode.Value


type alias Color =
    Int


encodeColor : Color -> Value
encodeColor =
    Encode.int


decodeColor : Decoder Color
decodeColor =
    Decode.int


{-| Takes rgb values from 0 to 255
-}
fromRGB : ( Int, Int, Int ) -> Color
fromRGB ( r, g, b ) =
    r * (256 ^ 2) + g * 256 + b


{-| Takes hsl values from 0 to 1

<https://stackoverflow.com/a/9493060>

-}
fromHSL : ( Float, Float, Float ) -> Color
fromHSL ( h, s, l ) =
    if abs s < 0.001 then
        let
            lightness =
                round (l * 255)
        in
        fromRGB ( lightness, lightness, lightness )

    else
        let
            q =
                if l < 1 / 2 then
                    l * (1 + s)

                else
                    l + s - l * s

            p =
                2 * l - q

            hueToRGB t =
                if t < 0 then
                    hueToRGB (t + 1)

                else if t > 1 then
                    hueToRGB (t - 1)

                else if t < 1 / 6 then
                    p + (q - p) * 6 * t

                else if t < 1 / 2 then
                    q

                else if t < 2 / 3 then
                    p + (q - p) * (2 / 3 - t) * 6

                else
                    p

            r =
                hueToRGB (h + 1 / 3) * 255

            g =
                hueToRGB h * 255

            b =
                hueToRGB (h - 1 / 3) * 255
        in
        fromRGB ( round r, round g, round b )
