module Utils exposing (encodeColor, decodeColor)

import Color exposing (Color)
import Json.Decode as D exposing (..)
import Json.Encode as E exposing (..)
import String.Interpolate exposing (interpolate)


type alias Value =
    E.Value


encodeColor : Color -> Value
encodeColor =
    E.string << Color.toHexString


decodeColor : Decoder Color
decodeColor =
    D.string
        |> andThen decodeHexColor


decodeHexColor : String -> Decoder Color
decodeHexColor hex =
    case Color.fromHexString hex of
        Ok col ->
            succeed col

        Err msg ->
            fail msg
