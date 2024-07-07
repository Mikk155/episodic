document.addEventListener( 'DOMContentLoaded', (event) =>
{
    // Translations goes in sentences.json
    let translations = {};
    fetch( 'src/sentences.json' ).then( response => response.json() ).then( data =>
    {
        translations = data;

        // Apply translations on load
        applyTranslations( '' );

    } ).catch( error => console.error( 'Couldn\'t load translations from sentences.json', error ) );

    function applyTranslations( language )
    {
        if( language == '' )
        {
            // Get local language
            const userLang = navigator.language || navigator.userLanguage;
            // Check if the language has been already choosen or the local language exists
            language = localStorage.getItem( 'language' ) ? localStorage.getItem( 'language' ) : translations[ userLang ] ? userLang : 'english';
        }

        // Save language for using on different html
        localStorage.setItem( 'language', language );

        // Replace all data
        document.querySelectorAll( "[pkvd]" ).forEach( element =>
        {
            const key = element.getAttribute( "pkvd" );

            element.innerText = translations[ key ][ language ];
        } );
    }

    // Update language by the language button
    window.changeLanguage = function( language )
    {
        applyTranslations( language );
    };
});
