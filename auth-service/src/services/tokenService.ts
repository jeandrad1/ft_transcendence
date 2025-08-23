import jwt from "jsonwebtoken"

export function generateAccessToken(user: { id: number; username: string; }) {
    return jwt.sign(
        { id: user.id, username: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
    );
}

export function generateRefreshToken(user: { id: number; username: string }) {
    return jwt.sign(
        { id: user.id, username: user.username },
    process.env.REFRESH_SECRET as string,
    { expiresIn: "7d" }
    );
}

export function verifyRefreshToken(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET as string) as {
            id: string;
            username: string;
        };

        return {
            id: parseInt(decoded.id, 10),
            username: decoded.username,
        };
    } catch (err) {
        throw new Error("Invalid or expired refresh token")
    }
}