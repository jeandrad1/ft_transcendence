import * as fs from "fs";
import path from "path";

import { createUser, usernameChanger, emailChanger , findUserByUsername, findUserById, findUserByEmail, findIDByUsername, findAllUsers } from "../repositories/usersRepository";

export async function registerUser(email: string, username: string, password: string) {
    createUser(username, password, email);
    return { message: "User registered successfully" };
}

export async function register42User(email: string, username: string) {
    createUser(username, "", email);
    return { message: "User registered successfully" };
}

export async function changeUsername(id: number, newUsername: string) {
    usernameChanger(id, newUsername);
    return { message: "Username changed successfully" };
}

export async function changeEmail(id: number, newEmail: string) {
    emailChanger(id, newEmail);
    return { message: "Email changed successfully" };
}

export async function getUserByUsername(username: string ) {
    const user = findUserByUsername(username);
    return user;
}

export async function getUserById(id: number) {
    const user = findUserById(id);
    return user;
}

export async function getUserByEmail(email: string) {
    const user = findUserByEmail(email);
    return user;
}

export async function getIDbyUsername(username: string) {
    const id = findIDByUsername(username);
    return id;
}

export async function getUserAvatar(id: number): Promise<string> {
  const extensions = [".jpg", ".jpeg", ".png", ".webp"];
  const basePath = "./avatars";

  for (const ext of extensions) {
    const filePath = path.join(basePath, `${id}${ext}`);
    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      return await fs.promises.readFile(filePath);
    } catch {
      continue;
    }
  }

  // 🔄 Si no existe ninguno, devolver imagen por defecto
  const defaultPath = path.join(basePath, "0.jpeg");
  return await fs.promises.readFile(defaultPath);
}

export async function getAllUsers() {
    const users = findAllUsers();
    return users;
}
