exports.titlecase = (str) => {
   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
exports.titlecaseCondition = (condition) => {
    return condition.split("_").map(chunk => this.titlecase(chunk)).join(" ")
}