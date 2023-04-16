sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note left of server: Payload JSON: {content: new_note_value, date: local server date of request}
    activate server
    server-->>browser: HTTP 201 - Created success
    deactivate server
    Note right of browser: Everything is handled in spa.js through event handling and rendered dynamically