let express = require("express");
let app = express();

app.use(express.static("./static"));

app.listen(9080, function() {
    console.log("Listening on port 9080");
});
