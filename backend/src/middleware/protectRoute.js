import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth({signInUrl: '/sign-in'}),
  async (req, res, next) => {
        try {
            const clerkId = req.auth().userId;
            if(!clerkId) return res.status(401).json({ msg: 'Unauthorized: No Clerk ID found ⁉️' });
            const user = await User.findOne({ clerkId });
            if(!user) return res.status(401).json({ msg: 'Unauthorized: User not found ⁉️' });
            req.user = user;
            next();
        } catch (error) {
            console.error('Error in protecRoute middleware ⁉️:', error);
            res.status(500).json({ msg: 'Internal Server Error ⁉️' });
        }
    }
];
