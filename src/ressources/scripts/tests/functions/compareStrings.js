var isString1MatchString2 = function(string1, string2) {
        string1 = string1.toLowerCase().trim();
        string1 = string1.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        string1 = string1.replace(/[^a-z0-9\-_\s]/g, " ");
        string1 = string1.replace(/\s{2,}/g, " ").trim();

        string2 = string2.toLowerCase().trim();
        string2 = string2.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        string2 = string2.replace(/[^a-z0-9\-_\s]/g, " ");
        string2 = string2.replace(/\s{2,}/g, " ").trim();

        if(string2.length === 0) return null
        else if(string1.match(string2)) return true
        else return false
}