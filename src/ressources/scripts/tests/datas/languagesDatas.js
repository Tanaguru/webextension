/*
    IANA Language Subtag Registry
    https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
    Note : only the 30 main languages in the world.
*/
var languages = {
    fileDate: '2020-05-12',
    data: {
        'en': { description: 'English', added:'2005-10-16', suppressScript: 'Latn' },
        'cmn': { description: 'Mandarin Chinese', added:'2009-07-29', macrolanguage: 'zh' },
        'hi': { description: 'Hindi', added:'2005-10-16', suppressScript: 'Deva' },
        'es': { description: ['Spanish', 'Castilian'], added:'2005-10-16', suppressScript: 'Latn' },
        'fr': { description: 'French', added:'2005-10-16', suppressScript: 'Latn' },
        'ar': { description: 'Arabic', added:'2005-10-16', suppressScript: 'Arab', scope: 'macrolanguage' },
        'bn': { description: ['Bengali', 'Bangla'], added:'2005-10-16', suppressScript: 'Beng' },
        'ru': { description: 'Russian', added:'2005-10-16', suppressScript: 'Cyrl' },
        'pt': { description: 'Portuguese', added:'2005-10-16', suppressScript: 'Latn' },
        'id': { description: 'Indonesian', added:'2005-10-16', suppressScript: 'Latn', macrolanguage: 'ms' },
        'ur': { description: 'Urdu', added:'2005-10-16', suppressScript: 'Arab' },
        'de': { description: 'German', added:'2005-10-16', suppressScript: 'Latn' },
        'ja': { description: 'Japanese', added:'2005-10-16', suppressScript: 'Jpan' },
        'sw': { description: 'Swahili (macrolanguage)', added:'2005-10-16', suppressScript: 'Latn', scope: 'macrolanguage' },
        'mr': { description: 'Marathi', added:'2005-10-16', suppressScript: 'Deva' },
        'te': { description: 'Telugu', added:'2005-10-16', suppressScript: 'Telu' },
        'tr': { description: 'Turkish', added:'2005-10-16', suppressScript: 'Latn' },
        'yue': { description: ['Yue Chinese', 'Cantonese'], added:'2009-07-29', macrolanguage: 'zh' },
        'ta': { description: 'Tamil', added:'2005-10-16', suppressScript: 'Taml' },
        'pa': { description: ['Panjabi', 'Punjabi'], added:'2005-10-16', suppressScript: 'Guru' },
        'wuu': { description: 'Wu Chinese', added:'2009-07-29', macrolanguage: 'zh' },
        'ko': { description: 'Korean', added:'2005-10-16', suppressScript: 'Kore' },
        'vi': { description: 'Vietnamese', added:'2005-10-16', suppressScript: 'Latn' },
        'ha': { description: 'Hausa', added:'2005-10-16' },
        'jv': { description: 'Javanese', added:'2005-10-16' },
        'arz': { description: 'Egyptian Arabic', added:'2009-07-29', preferredValue: 'arz', prefix: 'ar', macrolanguage: 'ar' },
        'it': { description: 'Italian', added:'2005-10-16', suppressScript: 'Latn' },
        'th': { description: 'Thai', added:'2005-10-16', suppressScript: 'Thai' },
        'gu': { description: 'Gujarati', added:'2005-10-16', suppressScript: 'Gujr' },
        'kn': { description: 'Kannada', added:'2005-10-16', suppressScript: 'Knda' }
    }
};