import { DataTypes,InferAttributes,InferCreationAttributes,Model } from "sequelize";
import sequelize from "../database/sequilize";
import bcrypt from "bcrypt";

class User extends Model<InferAttributes<User>,InferCreationAttributes<User>>{
    declare userId:string;
    declare name:string;
    declare email:string;
    declare password:string;
    declare role:string;
    async validatePassword(password:string){
        return await bcrypt.compare(password,this.password)
    }
}
User.init(
    {
        userId:{
            type:DataTypes.STRING,
            primaryKey:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        role:{
            type:DataTypes.ENUM("ADMIN","USER"),
            defaultValue:"USER"
        }

    },
    {
        sequelize,
        timestamps:true,
        tableName:"users"

    }
)
export default User;