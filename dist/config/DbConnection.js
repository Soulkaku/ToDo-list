import mongoose from "mongoose";
export async function DbConnection() {
    try {
        const URI = process.env.DB_CONNECTION_STRING;
        await mongoose.connect(URI);
        const mongooseConnected = mongoose.connection;
        mongooseConnected.once("open", () => {
            console.log("The connection with data base is a sucess");
        });
        mongooseConnected.on("error", (error) => {
            console.error("An Error appeared in Data Base connection, " + error);
        });
        return mongooseConnected;
    }
    catch (error) {
        console.error('Error connecting with Data Base ', error);
        throw error;
    }
}
// export default DbConnection;
