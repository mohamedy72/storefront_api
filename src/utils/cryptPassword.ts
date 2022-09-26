import bcrypt from "bcrypt";

export class Bcryption {
  pepper = process.env.BCRYPT_SECRET;
  saltRounds = process.env.SALT_ROUNDS;
  public hashed: string = "";

  bcryptPassword(password: string) {
    this.hashed = bcrypt.hashSync(
      password + this.pepper,
      parseInt(this.saltRounds as string)
    );
    return this.hashed;
  }

  comparePassword(inputedPassword: string) {
    this.bcryptPassword(inputedPassword);
    return bcrypt.compareSync(inputedPassword + this.pepper, this.hashed);
  }
}
