obj =
{
    id: "SD- 10",
    location: "SV",
    addr: "123 st.",
    getSetGen: function () {
        for (let prop in this) {
            if (typeof this[prop] !== 'function') {
                this['get' + prop.charAt(0).toUpperCase() + prop.slice(1)] = function () {
                    return this[prop];
                };


                this['set' + prop.charAt(0).toUpperCase() + prop.slice(1)] = function (value) {
                    this[prop] = value;
                };
            }
        }
    }
}
