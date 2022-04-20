import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET="40c57b5c451c526c457a9a7bbbb36cea99ba871ea7ea4626cef6d75aff0347011225333ecff8113c7c990441fa809d5240de1a133c00eea566970efafdef46fe";

export function signup(req, res) {

}

export function login(req, res) {
    const data = req.body;
    const user = { email: data.email, password: data.password };
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