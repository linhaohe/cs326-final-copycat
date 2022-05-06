import jwt from "jsonwebtoken";


export function login(req, res) {
    const ACCESS_TOKEN_SECRET= process.env.ACCESS_TOKEN_SECRET;
    const data = req.body;
    const user = {
        username: data.username,
        password: data.password
    };
    try {
        const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET);
        res.status(200).json({ accessToken: accessToken });
    } catch(e) {
        console.log(e);
        res.status(404).json({ status: "Failed to login" });
    }
}

export function authenticate(req, res, next) {
    const ACCESS_TOKEN_SECRET= process.env.ACCESS_TOKEN_SECRET;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
