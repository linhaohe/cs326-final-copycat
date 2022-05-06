import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET= process.env.ACCESS_TOKEN_SECRET;

export function login(req, res) {
    const data = req.body;
    const user = { username: data.username };
    try {
        const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET);
        res.status(200);
        res.json({ accessToken: accessToken });
    } catch(e) {
        res.stauts(404);
        res.json({ status: "Failed to login" });
    }
}

export function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && aithHead.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
