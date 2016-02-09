module Main where
import Signal
import Html exposing (..)
import Html.Events exposing (..)
import StartApp.Simple as App

type alias Model = Int
type Action = Increment | Decrement

update : Action -> Model -> Model
update action model =
  case action of
    Increment -> model + 1
    Decrement -> model - 1

view : Signal.Address Action -> Model -> Html
view address model =
  div []
        [ h1 [] [ text "Elm" ]
        , button [ onClick address Decrement ] [ text "-" ]
        , button [ onClick address Increment ] [ text "+" ]
        , div []  [ text (toString model) ]
        ]

main : Signal Html
main =
  App.start { model = 0, update = update, view = view }
