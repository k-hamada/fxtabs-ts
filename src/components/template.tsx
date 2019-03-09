export default (element: any) => (`
<html>
    <head>
        <title>Fx tabs</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <style>
            img {
                width: 16px;
                height: 16px;
                margin-right: 6px;
            }
        </style>
    </head>
    <body>
    ${element}
    </body>
</html>
`)
