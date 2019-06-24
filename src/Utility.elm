module Utility exposing (flip)


flip : (a -> b -> c) -> b -> a -> c
flip fn a b =
    fn b a
