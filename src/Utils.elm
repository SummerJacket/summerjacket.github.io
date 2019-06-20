module Utils exposing (decodeColor, encodeColor)

import Color exposing (Color)
import Json.Decode as D exposing (..)
import Json.Encode as E exposing (..)
import String.Interpolate exposing (interpolate)


type alias Value =
    E.Value


encodeColor : Color -> Value
encodeColor color =
    color
        |> Color.toHexString
        |> E.string


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
