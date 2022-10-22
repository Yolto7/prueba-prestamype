class Utils {
    static utcNow() {
        return new Date((new Date).toUTCString());
    }

    static stringFormat(format, values) {
        for (let i = 0; i < values.length; i++) {
            format = format.replace("{" + i + "}", values[i]);
        }
        return format;
    }
}
module.exports = Utils;