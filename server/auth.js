import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET="40c57b5c451c526c457a9a7bbbb36cea99ba871ea7ea4626cef6d75aff0347011225333ecff8113c7c990441fa809d5240de1a133c00eea566970efafdef46fe";

export function login(req, res) {
    const username = req.body.username;
    const user = { name: username };

    const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
    // return { accessToken: accessToken };
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
